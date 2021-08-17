export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('categories', state.categories)
    },

    async getCategories({state, dispatch}){
        let categories = await this.$auth.$storage.getLocalStorage('categories')
        if (categories == null)
            await dispatch('fetchCategories')
        categories = await this.$auth.$storage.getLocalStorage('categories')
        return categories
    },

    async fetchCategories({commit, dispatch}) {
        var categories = await this.$auth.$storage.getLocalStorage('categories')
        if (categories === null) // If not set on the storage
            await this.$axios   
                .get('/api/supermarket/categories', { withCredentials: true })
                .then(async (response) => {
                    // Send to Mutations
                    response.data.unshift({id: 0, name: "جميع الفئات"})
                    commit('set_all', response.data);

                    // Set each category products count
                    const products = await this.dispatch('supermarket/products/getProducts')
                    await response.data.forEach(x => {
                        commit('set_products_count', {id: x.id, count: (products.filter(y => y.category_id == x.id)).length})
                    })

                    //Save To Storage
                    this.$auth.$storage.setLocalStorage('categories', response.data)
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', categories); // Send to Mutations
        
    },
}