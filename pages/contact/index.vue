<template>
    <div class="flex justify-center content-center">
      <Form :title="title" :contact="contact" :submit="submit" :edit="true" ref="form" />
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
        this.contact = getContact;
    },
    methods: {
        submit() {
            this.$store.dispatch('contact/addAction', this.contact);
            this.$router.push('/contact/confirm/');
        }
    }
}
</script>
