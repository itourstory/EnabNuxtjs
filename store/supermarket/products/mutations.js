export default {
    add(state, product){
        state.products.push(product)
        console.log(product)
    },

    edit(state, product){
        let x = state.products.find(x => x.id == product.id)
        for(let y in x) x[y] = product[y]
    },

    emptyProduct(state){
        state.product = {}
    },

    setProduct(state, id){
        state.product = state.products.find(x => x.id == id)
    },

    set_all(state, products){
        state.products = products
    },

    remove(state, id) {
        if (id !== 0)
            state.products = state.products.filter(x => x.id !== id);
    },

    removeBulk(state, category_id){
        if (category_id !== 0)
            state.products = state.products.filter(x => x.category_id !== category_id)
    }
}