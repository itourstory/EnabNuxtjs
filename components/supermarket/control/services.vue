<template>
    <div class="mt-3">
        <div class="r-2 border-0 shadow-none">
            <div class="row d-flex justify-content-between">
                <div class="col-auto">
                    <h1 class="text-right text-light">
                        خدماتي
                    </h1>
                </div>
            </div>
            <div class="row mt-3">
                <div v-for="service in services" :key="service.id" class="col-4">
                    <SupermarketServicesService :service="service" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

    export default {
        computed: {
            services() {
                let services = this.$store.state.supermarket.services.services.filter(x => (x.owned == true || x.price == 0))
                return services
            },
        },
    }
</script>

<style lang="scss" scoped>
// 
</style>