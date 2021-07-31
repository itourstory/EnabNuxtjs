<template>
    <div class="card py-2 r-2 border-0 tb-2 position-relative category" @click="filterCategories(id)">
        <div class="card-body pb-2 text-center">
            <div class="row"><span class="h5 text-light mb-1">
                {{ name }}
                </span>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: [
            'id', 'name'
        ],
        data(){
            return {
                
            }
        },
        methods: {
            filterCategories: function(id) {
                this.$emit('filter-categories', id)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .category:hover{
        cursor:pointer;
    }
</style>