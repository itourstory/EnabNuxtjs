<template>
    <div class="card py-2 r-2 border-0 t-3 position-relative product" @click="addProduct(product.id)">
        <span class="position-absolute badge badge-light border-white text-dark count" v-if="inCount > 0">
            {{ inCount }}
        </span>
        <!-- <span class="position-absolute badge badge-light border-white text-dark left">
            المتبقي : {{ count }}
        </span>  -->
        <div class="card-body pb-2 text-center">
            <div class="row"><span class="h5 text-light mb-1">
                {{ product.name }}
                </span>
            </div>
            <div class="row">
                <span class="text-light text-left">
                    {{ $n(product.price, 'currency') }} د.ع                                       
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex'

    export default {
        props: [
            'product'
        ],
        data() {
            return{
                inCount: 0
            }
        },
        mounted(){
            this.inCountCheck()
        },
        computed: {
            productsAdded () {
                return this.$store.state.supermarket.orders.products;
            },
        },
        methods: {
            ...mapActions({addProduct: 'supermarket/orders/addProduct'}),
            inCountCheck(){
                let productAdded = this.productsAdded.find(x => x.id == this.product.id)
                if (productAdded !== undefined){
                    this.inCount = productAdded.inCount
                } else this.inCount = 0
            }
        },
        watch: {
            productsAdded: {
                deep: true,
                handler(newVal) {
                    this.inCountCheck()
                }
            }
        },
        
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