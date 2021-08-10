<template>
    <div class="card py-2 r-2 border-0 tb-2 position-relative category" @click="filterByCategory(category.id)">
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
            ...mapActions({filterByCategory: 'supermarket/orders/filterByCategory'}),
        }
    }
</script>

<style lang="scss" scoped>
    .category:hover{
        cursor:pointer;
    }
</style>