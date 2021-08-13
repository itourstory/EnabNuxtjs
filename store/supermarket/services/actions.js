export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('services', state.services)
    },
    
    async fetchServices({commit, state}){
        // let services = this.$auth.$storage.getLocalStorage('services')

        //############### Fetch from API ###########
        // let services = 

        // commit('set_all', services)
    },

    async toggleService({commit, dispatch}, id){
        await commit('toggle', id)
        this.$toast.success("تم تعديل الخدمة !")
        dispatch('syncLocalStorage')
    },

    async serviceState({state, commit}, id){
        let service = state.services.find(x => x.id == id)
        return (service.state && service.owned)
    }


}