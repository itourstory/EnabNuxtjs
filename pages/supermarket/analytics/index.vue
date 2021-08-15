<template>
    <div>
        <div class="container-fluid">
            <div class="row main-height bg-section">
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
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'supermarket',
        head: {
            title: 'Analytics',
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