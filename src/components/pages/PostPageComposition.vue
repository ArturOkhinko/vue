<template>
  <div>
    <h1>Страница была написаннна с использованием CompositionApi</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
      <my-button>
        Создать пользователя
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    <my-dialog v-model:show="dialogVisiable">
      <post-form/>
    </my-dialog>

    <post-list :posts="sortedAndSearchQuery" v-if="!isPostsLoading"/>
    <div v-else>Идет загрузка ...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import PageWrapper from "@/components/UI/PageWrapper.vue";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";
import {usePosts} from "@/hooks/usePosts.js";

export default {
  components: {
    PageWrapper,
    MySelect,
    PostList, PostForm
  },
  data() {
    return {
      dialogVisiable: false,
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По описанию"},
      ]
    }
  },
  setup(props) {
    var {posts, totalPages, isPostsLoading} = usePosts(10,)
    var {sortedPosts, selectedSort} = useSortedPosts(posts)
    var {searchQuery, sortedAndSearchQuery} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts, totalPages, isPostsLoading,
      sortedPosts, selectedSort,
      searchQuery, sortedAndSearchQuery
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

  },
}

</script>

<style>
.observer {
  height: 30px;
  background-color: teal;
}
</style>