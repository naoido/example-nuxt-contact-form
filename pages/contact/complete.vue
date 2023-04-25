<template>
    <div class="flex justify-center content-center">
        <Form :title="title" :contact="contact" :edit="false" :buttonHide="true" />
    </div>
</template>

<script>
import Form from "@/components/form.vue"

export default {
    component: {
        Form
    },
    data() {
        return {
        title: "以下の内容で受付致しました。",
        contact: {
            name: "",
            mail: "",
            content: ""
        },
        edit: false
        }
    },
    created() {
        const getContact = this.$store.getters["contact/getContact"];

        if(getContact.name === "" || getContact.mail === "" || getContact.content === "") {
            this.$nuxt.context.redirect('/contact/');
        }

        this.contact = getContact;

        this.$store.dispatch("contact/removeAction", this.contact);
    }
}
</script>