<template>
    <div class="flex justify-center content-center">
        <Form :title="title" :contact="contact" :submit="submit" :edit="false" />
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
            title: "最終確認",
            contact: {
                name: "",
                mail: "",
                content: ""
            }
        };
    },
    created() {
        const getContact = this.$store.getters["contact/getContact"];

        if (getContact.content.length > 100) {
            const erroe = new Error("Bad Request");
            error.statusCode = 400;
            throw error;
        }

        if(getContact.name === "" || getContact.mail === "" || getContact.content === "") {
            this.$nuxt.context.redirect('/contact/');
        }

        this.contact.name = getContact.name;
        this.contact.mail = getContact.mail;
        this.contact.content = getContact.content;
    },
    methods: {
        submit() {
            this.$router.push('/contact/complete');
        }
    }
}
</script>