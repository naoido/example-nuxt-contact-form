export const state = () => ({
    name: "",
    mail: "",
    content: ""
});

export const mutations = {
    add(state, contact) { 
        state.name = contact.name,
        state.mail = contact.mail,
        state.type = contact.type,
        state.content = contact.content
    },
    remove(state) {
        state.name = '';
        state.mail = '';
        state.content = '';
    }
}

export const getters = {
    getContact(state) {
        return {
            name: state.name,
            mail: state.mail,
            content: state.content
        };
    }
}

export const actions = {
    addAction({commit, dispatch, state}, contact) {
        commit("remove");
        commit("add", contact);
    },
    removeAction({commit, dispatch, state}, payload) {
        commit('remove');
    }
}