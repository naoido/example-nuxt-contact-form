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

        if(getContact.name === "" || getContact.mail === "" || getContact.content === "") {
            this.$nuxt.context.redirect('/contact/');
        }

        this.contact = getContact;
    },
    methods: {
        submit() {
            this.$router.push('/contact/complete');
        }
    }
}
</script>