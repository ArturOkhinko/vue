<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{'current-page': page === pageNumber}"
        @click="changePage(pageNumber)"
    >
    {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: "page-wrapper",
  props: {
    totalPages: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("changePage", pageNumber)
    }
  },
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  width: 20px;
  height: 20px;
}
.current-page {
  border: 2px solid teal;
}
</style>