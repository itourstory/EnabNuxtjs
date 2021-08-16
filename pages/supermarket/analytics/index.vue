<template>
    <div>
        <div class="container-fluid">
            <div class="row main-height">
                <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts />
                </div>
                <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts />
                </div>
                <div class="col-lg-4">
                    <SupermarketAnalyticsBestSellingProducts />
                </div>
            </div>
            <div class="row">
                <div class="div">
                    {{categoriesData}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                categoriesData: '',
            }
        },
        async asyncData({ $axios }) {
            const categories = await this.$store.dispatch("getCategories");
            console.log(categories);
            this.categoriesData = categories;
        },
        layout: 'supermarket',
        head: {
            title: 'Analytics',
        },
    }
</script>

<style lang="scss" scoped>
// 
</style>