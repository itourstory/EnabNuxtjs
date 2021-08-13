
export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('categories', state.categories)
    },

    async addCategory({state, commit, dispatch}, category){
        if (state.categories.find(x => x.name == category.name))
            this.$toast.error("هذه الفئة موجودة بالفعل !")
        else {
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/categories/insert', category, { withCredentials: true })
                .then((response) => {
                    const newId = response.data.id
                    category.productsCount = 0
                    const sendCategory = {id: newId, ...category}
                    commit('add', sendCategory)
                    dispatch('syncLocalStorage')
                })
                .catch((error) => {
                    console.log(error)
                })
            this.$toast.success("تمت الإضافة بنجاح !")
        }
    },

    
    async editCategory({commit, dispatch}, category){
        await commit('edit', category)
        dispatch('syncLocalStorage')
        //########### SEND TO API ###########//.
        await this.$axios
            .post('/api/supermarket/categories/update', category, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
        this.$toast.success('تم التعديل')
    },

    async removeCategory({commit, dispatch}, id){
        await commit('remove', id)
        await this.dispatch('supermarket/products/removeProducts', id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        await this.$axios
            .post('/api/supermarket/categories/delete', { id: id }, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
    },

    async getCategory({commit, dispatch}, id){
        var categories = await this.$auth.$storage.getLocalStorage('categories')
        return categories.find(x => x.id == id)
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

    async search({state, commit, dispatch}, name){
        let categories = await this.$auth.$storage.getLocalStorage('categories')
        commit('set_all', categories.filter(x => x.name.includes(name)));
    },

}