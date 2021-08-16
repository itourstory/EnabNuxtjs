export default {
    async getCategories({state, dispatch}){
        let categories = await this.$auth.$storage.getLocalStorage('categories')
        if (categories == null)
            await dispatch('fetchCategories')
        categories = await this.$auth.$storage.getLocalStorage('categories')
        return categories
    },
}