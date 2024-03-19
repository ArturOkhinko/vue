<template>
    <button class="btn">
          <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style>
.btn {
  height: 30px;
  border: 1px solid teal;
  color: teal;
  background-color: rgba(0,0,0,0);
  margin: 10px
}
</style>