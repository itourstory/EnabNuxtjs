export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('services', state.services)
    },
    
    async fetchServices({commit, state}){
        // let services = this.$auth.$storage.getLocalStorage('services')

        //############### Fetch from API ###########
        let services = [
            {
                id: 1,
                title: "Earthlink Users",
                subtitle: "معاينة تاريخ انتهاء الاشتراك",
                state: true,
                price: 15000,
                owned: true,
                faq_url: "#",
            }
        ]

        commit('set_all', services)
    },

    async toggleService({commit, dispatch}, id){
        await commit('toggle', id)
        this.$toast.success("تم تعديل الخدمة !")
        dispatch('syncLocalStorage')
    }


}