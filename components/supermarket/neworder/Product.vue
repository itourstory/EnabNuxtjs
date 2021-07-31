<template>
    <div class="card py-2 r-2 border-0 t-3 position-relative product" @click="productAdd(id)">
        <span class="position-absolute badge badge-light border-white text-dark count" v-if="inCount > 0">
            {{ inCount }}
        </span>
        <!-- <span class="position-absolute badge badge-light border-white text-dark left">
            المتبقي : {{ count }}
        </span>  -->
        <div class="card-body pb-2 text-center">
            <div class="row"><span class="h5 text-light mb-1">
                {{ name }}
                </span>
            </div>
            <div class="row">
                <span class="text-light text-left">
                    {{ $n(price, 'currency') }} د.ع                                       
                </span>
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
                inCount: 0
            }
        },
        methods: {
            productAdd: function(id) {
                this.$emit('product-add', id)
                this.inCount++
            },
            resetCount: function(){
                this.inCount = 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .count{
        top: -5px; left: -5px;
    }
    .left{
        top: -5px; right: -5px;
    }
    .product:hover{
        cursor:pointer;
    }
</style>