import axios from "axios";
import {onMounted, ref} from "vue";
export function usePosts(limit) {
    var posts = ref([])
    var totalPages = ref(0)
    var isPostsLoading = ref(true)

    var fatching = async () => {
        try {
            var responce = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _page: 1,
                    _limit: limit,
                }
            })
            console.log(responce)
            totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit)
            posts.value = responce.data
            isPostsLoading.value = false
        } catch (e) {
            console.log(e)
        }
    }

    onMounted(fatching)

    return {
        posts, isPostsLoading, totalPages
    }
}