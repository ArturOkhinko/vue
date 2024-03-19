<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
      <my-button @click="showDialog">
        Создать пользователя
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    <my-dialog v-model:show="dialogVisiable">
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
    <div v-else>Идет загрузка ...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import PageWrapper from "@/components/UI/PageWrapper.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
    PageWrapper,
    MySelect,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisiable: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 0,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По описанию"},
      ]
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisiable = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisiable = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        setTimeout(async () => {
          var responce = await axios.get("https://jsonplaceholder.typicode.com/posts", {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          })
          this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
          this.posts = responce.data
          this.isPostsLoading = false
        }, 1000)
      } catch (e) {
        alert(e)
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        var responce = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...responce.data]
      } catch (e) {
        alert(e)
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {

  }
}

</script>

<style>
.observer {
  height: 30px;
  background-color: teal;
}
.app__btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>