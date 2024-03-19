import {computed, ref} from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
    var searchQuery = ref("")
    var sortedAndSearchQuery = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return {
        searchQuery,
        sortedAndSearchQuery
    }
}