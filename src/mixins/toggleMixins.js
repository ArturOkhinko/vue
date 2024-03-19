export default {
    props: {
        name: "my-dialog",
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit("update:show", false)
        }
    },
    mounted() {
        console.log("mixin")
    }
}