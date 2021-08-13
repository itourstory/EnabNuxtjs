<template>
    <div class="py-1 position-relative category" @click="filterByCategory(category.id), selectCategory(category.id)">
        <div class="card-body pb-2 text-center">
            <div class="row"><span class="h5 text-light mb-1">
                {{ category.name }}
                </span>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex'

    export default {
        props: [
            'category'
        ],
        data(){
            return {
                
            }
        },
        methods: {
            ...mapActions({
                filterByCategory: 'supermarket/orders/filterByCategory',
                selectCategory: 'supermarket/orders/selectCategory'
            }),
            
        }
    }
</script>

<style lang="scss" scoped>
    .category:hover{
        cursor:pointer;
    }
    .card{
        margin-bottom: 5px !important;
    }
    
</style>