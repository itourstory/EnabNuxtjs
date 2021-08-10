<template>
    <div>
        <input ref="console" class="form-control fs-5" type="text">
    </div>
</template>

<script>
    export default {
        mounted(){
            this.$refs.console.focus();
        }
    }
</script>

<style lang="scss" scoped>
    input{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border: 0;
        border-radius: 0;
        z-index: 99;
        background: #000;
        color: white;
    }
</style>