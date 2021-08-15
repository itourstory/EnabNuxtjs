<template>
    <div class="py-1 mb-2 r-2 position-relative product">
        <span class="position-absolute badge badge-light border-white text-dark count">
            count34
        </span>
        <span class="position-absolute badge badge-light border-white text-dark left">
            المتبقي : 787
        </span> 
        <div class="card-body pb-2 text-center">
            <div class="row">
                <span class="h5 text-light mb-1">
                    name
                </span>
            </div>
            <div class="row">
                <span class="text-light text-left">
                    4000 د.ع                                       
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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