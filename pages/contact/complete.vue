<template>
    <div class="flex justify-center content-center">
        <Form :title="title" :contact="contact" :edit="false" :buttonHide="true" />
    </div>
</template>

<script>
import Form from "@/components/form.vue"
import crypto from "crypto-js"

export default {
    component: {
        Form
    },
    async asyncData({ redirect, $axios, store }) {
        const contact = store.state.contact;

        if ((contact.content.length > 2000 || 
            !contact.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || 
            contact.name.length > 30)) {
                redirect("/contact");
                return;
        }

        const password = "password";

        const data = { "contact" : contact }
        const headers = { "Authorization" : `Bearer ${crypto.AES.encrypt(String(Math.floor( Date.now() / 100 )), password)}` }

        await $axios.$post("/api/contact", data, { headers });
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
    async created() {
        const getContact = this.$store.getters["contact/getContact"];

        this.contact = getContact;

        this.$store.dispatch("contact/removeAction", this.contact);
    }
}
</script>