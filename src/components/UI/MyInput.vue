<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value)
        }
    }
}
</script>

<style>
.input {
  height: 40px;
  width: 100%;
  border: 1px solid teal;
  margin-top: 10px;
}
</style>