<template>
    <div class="row align-items-center">
        <div class="col-auto">
            <div @click="updateCount(count+1)" class="action-item">
                <i class="fas fa-2x fa-plus"></i>
            </div>
        </div>
        <div class="col-6">
            <p class="card-text fs-6">{{ name }} </p>
        </div>
        <div class="col">
            <span class="mb-0">العدد</span>
            <p class="card-text fs-6"><b>{{ count }}</b></p>
        </div>
        <div class="col-md d-none d-md-block">
            <span class="mb-0">الإجمالي</span> 
            <p class="card-text fs-6"><b>{{ $n(price, 'currency') }}</b></p>
        </div>
        <div class="col-auto">
            <div @click="updateCount(count-1)" class="action-item text-danger">
                <i v-if="count > 1" class="fas fa-2x fa-minus"></i>
                <i v-else class="fas fa-2x fa-trash"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'count', 'name', 'price', 'id'
        ],
        data(){
            return {

            }
        },
        methods: {
            updateCount: function (count){
                this.$emit('update-count', count)
            }
        },
    }
</script>

<style lang="scss" scoped>
    
</style>