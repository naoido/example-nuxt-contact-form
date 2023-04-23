export const state = () => ({
    name: "",
    mail: "",
    content: ""
});

export const mutations = {
    add(state, contact) { 
        if(contact.content.length > 2000 || 
            !contact.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || 
            contact.name.length > 30) throw {statusCode: 400, message: 'Bad Request'};
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
    removeAction({commit, dispatch, state}, contact) {
        commit('remove');
    }
}