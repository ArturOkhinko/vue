<template>
    <form @submit.prevent>
        <my-input v-focus class="input" v-model="post.title" type="text" placeholder="Название"/>
        <my-input class="input" v-model="post.body" type="text" placeholder="Описание"/>
        <my-button @click="createPost">
            Создать
        </my-button>
    </form>
</template>

<script>

export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        }
    },
    methods: {
      createPost() {
        this.post.id = Date.now()
        this.$emit("create", this.post)
        this.post = {
          title: "",
          body: "",
        }
      }
    },
    watch: {
      post: {
        handler(newVal) {
          console.log(newVal)
        },
        deep: true
    }

  }
}
</script>

<style>

</style>