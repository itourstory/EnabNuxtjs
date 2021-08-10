<template>
    <div>
        <span v-if="service">The services is enabled</span>
        <span v-else></span>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        computed: {
            services(){
                return this.$store.state.supermarket.services.services
            },
            service(){
                return this.$store.state.supermarket.services.services.find(x => (x.id == this.id && x.state == true))
            }
        },
        async created() {
            await this.fetchServices()
            // if (this.service)
            //     await this.$axios
            //         .get('https://bapi.earthlink.iq/api/user/GetUserDataAr', {
            //             withCredentials: false,
            //         })
            //         .then((response) => {
            //             console.log(response)
            //         })
            //         .catch((error) => {
            //             console.log(error)
            //         })
        },
        methods: {
            ...mapActions({
                fetchServices: 'supermarket/services/fetchServices',
            }), 
        }
    }
</script>

<style lang="scss" scoped>
// 
</style>