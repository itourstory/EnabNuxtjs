<template>
    <div>
        <div class="container-fluid">
            <div class="row main-height">
                <!-- <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts />
                </div>
                <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts />
                </div> -->
                <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts :categories="categories" />
                </div>
            </div>
            <div class="row">
                <div class="div text-light">
                    {{categories}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'
    export default {
        layout: 'supermarket',
        head: {
            title: 'Analytics',
        },
        computed:{
            categories(){
                return this.$store.state.supermarket.categories.categories
            }
        },
        created(){
            this.fetchProducts()
            this.fetchCategories()
        },
        methods: {
            ...mapActions({
            fetchProducts: 'supermarket/products/fetchProducts',
            fetchCategories: 'supermarket/categories/fetchCategories',
            }),
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
    .product{
        border: 1px solid #fff4;
    }
    .product:hover{
        cursor:pointer;
        background: $t-1;
    }
    .card{
        margin-bottom: 5px !important;
    }
</style>