export default {
    toggle(state, id){
        let service = state.services.find(x => x.id == id)
        service.state = !service.state
    },

    set_all(state, services){
        state.services = services
    },
}