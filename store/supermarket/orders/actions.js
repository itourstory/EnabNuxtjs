export default {
    
    async addProduct({commit, dispatch}, id){
        const product = await this.dispatch('supermarket/products/getProduct', id)
        if (await dispatch('getProduct', product.id))
            commit('count', product.id)
        else
            commit('add', product)
    },
    
    async addProductByBarcode({commit, dispatch}, barcode){
        const product = await this.dispatch('supermarket/products/getProductByBarcode', barcode)
        //Products existed
        if (product){
            if (await dispatch('getProduct', product.id))
                commit('count', product.id)
            else
                commit('add', product)
        } else 
            alert("Product not found") // WHEN SCANNER NOT FOUND THE PRODUCT
    },

    async removeProduct({commit, dispatch}, id){
        if ((await dispatch('getProduct', id)).count >= 1)
            commit('countDown', id)
        else
            commit('remove', id)
    },

    async getProduct({state, dispatch}, id){
        return state.products.find(x => x.id == id)
    },

    async setCount({state, commit, dispatch}, id){
        const product = await dispatch('getProduct', id)
        return products.find(x => x.id == id)
    },

    async search({state}, name){
        if (!state.onlyProducts){
            let categories = await this.dispatch('supermarket/categories/getCategories')
            this.commit('supermarket/categories/set_all', categories.filter(x => x.name.includes(name)));
        }

        let products = await this.dispatch('supermarket/products/getProducts')
        this.commit('supermarket/products/set_all', products.filter(x => x.name.includes(name)));
    },

    // async fetchOrders({commit, dispatch}) {
    //     var orders = await this.$auth.$storage.getLocalStorage('orders')
    //     if (orders === null) // If not set on the storage
    //         await this.$axios
    //             .get('/api/supermarket/categories', { withCredentials: true })
    //             .then(async (response) => {
    //                 // Send to Mutations
    //                 response.data.unshift({id: 0, name: "جميع الفئات"})
    //                 commit('set_all', response.data);

    //                 // Set each category products count
    //                 const products = await this.dispatch('supermarket/products/getProducts')
    //                 await response.data.forEach(x => {
    //                     commit('set_products_count', {id: x.id, count: (products.filter(y => y.category_id == x.id)).length})
    //                 })

    //                 //Save To Storage
    //                 this.$auth.$storage.setLocalStorage('categories', response.data)
    //             }).catch(error => {
    //                 throw new Error(`${error}`);
    //             })
    //     else
    //         commit('set_all', categories); // Send to Mutations
    // },

    async filterByCategory({}, category_id){
        let products = await this.dispatch('supermarket/products/getProducts')
        let categories = await this.dispatch('supermarket/categories/getCategories')

        if (!category_id == 0){
            products = products.filter(x => x.category_id == category_id)
            categories = categories.filter(x => (x.id == category_id || x.id == 0))
        }
        this.commit('supermarket/products/set_all', products);
        this.commit('supermarket/categories/set_all', categories);
    },

    emptyProducts({commit}){
        this._vm.$dialog.confirm('هل انت متأكد؟').then(() => {
            commit('emptyProducts')
        })
    },

    async fetchLastOrder({commit}){
        if (!this.$auth.$storage.getLocalStorage('lastOrder'))
            this.$axios.get(
                '/api/supermarket/order/last', { withCredentials: true }
            ).then((response) => {
                commit('lastOrder', response.data)
                this.$auth.$storage.setLocalStorage('lastOrder', response.data)
            })
        
            commit('lastOrder', await this.$auth.$storage.getLocalStorage('lastOrder'))
        return await this.$auth.$storage.getLocalStorage('lastOrder')
    },

    async endOrder({state, commit, dispatch}){
        let products = []
        state.products.forEach(x => {
            products.push({id: x.id, count: x.inCount})
        })

        this.$axios
        .post(
            '/api/supermarket/order', { products: products }, { withCredentials: true }
        ).then((response) => {
            // Reset added products
        }).catch(function (error) {
            console.log(error)
        })

        let lastOrder = {...await dispatch('fetchLastOrder')}
        lastOrder.id++
        lastOrder.order_number++
        lastOrder.order_price = 0
        console.log(state.products)
        state.products.forEach(x => {
            lastOrder.order_price += x.inCount * x.price
        })

        commit('lastOrder', lastOrder)
        this.$auth.$storage.setLocalStorage('lastOrder', lastOrder)

        commit('emptyProducts')

        this.$toast.success('تم انهاء الطلب')
        if (this.isOffline)
            this.$toast.info('سيتم ارسال الطلب عند عودة الانترنت')
    }

}