<template>
  <div>
    <h1>Страница была написаннна с использованием Vuex</h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."/>

    <div class="app__btns">
      <my-button @click="showDialog">
        Создать пользователя
      </my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
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
import MyButton from "@/components/UI/MyButton.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
    MyButton,
    PageWrapper,
    MySelect,
    PostList, PostForm
  },
  data() {
    return {
      dialogVisiable: false,
    }
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPosts",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts"
    }),
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
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts"
    })
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
</style>