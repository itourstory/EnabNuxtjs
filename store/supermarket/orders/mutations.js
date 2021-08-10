export default {
    add(state, product) {
        state.products.push({...product, inCount:1})
    },

    remove(state, id) {
        state.products = state.products.filter(x => x.id !== id);
    },

    count(state, id){
        state.products.find(x => x.id == id).inCount++
    },

    countDown(state, id){
        state.products.find(x => x.id == id).inCount--
    },

    onlyProducts(state){
        state.onlyProducts = !state.onlyProducts
    },

    emptyProducts(state){
        state.products = []
    },

    lastOrder(state, order){
        state.lastOrder = order
    },
}