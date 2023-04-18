<template>
    <div class="flex justify-center content-center">
      <Form :title="title" :contact="contact" :submit="submit" :edit="true" />
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
            title: "お問い合わせフォーム",
            contact: {
                name: "",
                mail: "",
                content: ""
            }
        };
    },
    created() {
        const getContact = this.$store.getters["contact/getContact"];
        this.contact.name = getContact.name;
        this.contact.mail = getContact.mail;
        this.contact.content = getContact.content;
    },
    methods: {
        submit() {
            this.$store.dispatch('contact/addAction', this.contact);
            this.$router.push('/contact/confirm/');
        }
    }
}
</script>
