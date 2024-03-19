<template>
  <div class="select">
    <select @change="changeOptions">
      <option disabled value="">Выберите из списка</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{option.name}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.select select {
  height: 40px;
  margin: 10px;
}
</style>