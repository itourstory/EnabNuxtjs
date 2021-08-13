export default {
    async syncLocalStorage({state}, dispatch){
        this.$auth.$storage.setLocalStorage('products', state.products)
    },

    async addProduct({state, commit, dispatch}, product){
        if (await this.dispatch('supermarket/categories/getCategory', product.category_id) === undefined){
            this.$toast.error('هذه الفئة غير موجودة')
            return false
        }

        else if (state.products.find(x => (x.name == product.name && x.category_id == product.category_id))){
            this.$toast.info('هذا المنتج موجود بالفعل!')
            return false
        }

        else {
            
            //########### SEND TO API ###########//.
            await this.$axios
                .post('/api/supermarket/products/insert', product, { withCredentials: true })
                .then((response) => {
                    const newId = response.data.id
                    const sendProduct = {id: newId, ...product}
                    commit('add', sendProduct)
                    dispatch('syncLocalStorage')
                    commit('emptyProduct')
                })
                .catch((error) => {
                    console.log(error)
                })

            this.$toast.success('تم اضافة المنتج بنجاح!')
        }
    },

    async editProduct({commit, dispatch}, product){
        await commit('edit', product)
        dispatch('syncLocalStorage')
        //########### SEND TO API ###########//.
        await this.$axios
            .post('/api/supermarket/products/update', product, { withCredentials: true })
            .catch((error) => {
                console.log(error)
            })
        this.$toast.success('تم التعديل')
    },

    async removeProduct({commit, dispatch}, id){
        await commit('remove', id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        // await this.$axios
        //     .post('/api/supermarket/categories/delete', { name: name }, { withCredentials: true })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    },

    async removeProducts({commit, dispatch}, category_id){
        await commit('removeBulk', category_id)
        dispatch('syncLocalStorage')

        //########### SEND TO API ###########//
        // await this.$axios
        //     .post('/api/supermarket/categories/delete', { name: name }, { withCredentials: true })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    },

    async getProduct({commit, dispatch}, id){
        var products = await this.$auth.$storage.getLocalStorage('products')
        return products.find(x => x.id == id)
    },

    async getProductByBarcode({commit, dispatch}, barcode){
        var products = await this.$auth.$storage.getLocalStorage('products')
        return products.find(x => x.barcode == barcode)
    },

    async getProducts({state, dispatch}){
        let products = await this.$auth.$storage.getLocalStorage('products')
        if (products == null)
            await dispatch('fetchProducts')
        products = await this.$auth.$storage.getLocalStorage('products')
        return products
    },

    async fetchProducts({commit, dispatch}) {
        var products = await this.$auth.$storage.getLocalStorage('products')
        if (products === null) // If not set on the storage
            await this.$axios
                .get('/api/supermarket/products', { withCredentials: true })
                .then((response) => {
                    this.$auth.$storage.setLocalStorage('products', response.data) //Save To Storage
                    commit('set_all', response.data); // Send to Mutations
                }).catch(error => {
                    throw new Error(`${error}`);
                })
        else
            commit('set_all', products); // Send to Mutations
    },

    async search({state, commit, dispatch}, name){
        let products = await this.$auth.$storage.getLocalStorage('products')
        commit('set_all', products.filter(x => x.name.includes(name)));
    },

}