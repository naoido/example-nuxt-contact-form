export const state = () => ({
    name: "",
    mail: "",
    content: ""
});

export const mutations = {
    add(state, contact) { 
        if(contact.content.length > 2000) throw {statusCode: 400, message: 'Bad Request'};
        state.name = contact.name;
        state.mail = contact.mail;
        state.content = contact.content;
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