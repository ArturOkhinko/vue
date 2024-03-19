<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixins from "@/mixins/toggleMixins.js";

export default {
    name: "my-dialog",
    mixins: [toggleMixins],
    mounted() {
      console.log("dialog mounted")
    }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-width: 300px;
    min-height: 50px;
}
</style>