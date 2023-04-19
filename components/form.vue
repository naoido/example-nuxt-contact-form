<template>
    <form class="flex justify-center w-96" v-on:submit.prevent="submit">
        <div class="flex flex-row w-full h-screen content-center items-center flex-wrap">
            <h1 class="text-2xl w-full text-center mb-5">{{title}}</h1>
            <span class="block text-sm font-medium text-slate-700">
                お名前(姓名)
            </span>
            <input type="text" v-model="contact.name" :disabled="!edit" @input="validateEmpty" id="name"
            :class="[this.contents.name.isEmpty && this.contents.name.flag ? 'border-red-500 border-slate-200' : '']"
            class="my-3 mt-1 block w-full px-3 py-2 bg-wmt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-gray-600 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>

            <span class="block text-sm font-medium text-slate-700">
                ご連絡先(e-mail)
            </span>
            <input type="text" v-model="contact.mail" :disabled="!edit" @input="validateEmail" id="mail"
            :class="[!this.contents.mail.isEmail && this.contents.mail.flag ? 'border-red-500 border-slate-200' : '']"
            class="my-3 mt-1 block w-full px-3 py-2 bg-wmt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            !disabled:bg-gray-600 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>

            <span class="block text-sm font-medium text-slate-700">
                内容(2000文字以内)
            </span>
            <textarea type="text" v-model="contact.content" :disabled="!edit" maxlength="2000" @input="validateEmpty" id="content"
            :class="[this.contents.content.isEmpty && this.contents.content.flag ? 'border-red-500 border-slate-200' : '']"
            class="my-3 mt-1 block w-full px-3 py-2 bg-wmt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            resize-none
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-gray-600 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500" style="height: 154px"/>

            <input type="submit" @click.prevent="back" v-if="!edit && !buttonHide" value="編集" 
            class="bg-white hover:bg-green-400
            text-green-300 rounded-full w-1/4 h-8 font-normal mx-auto cursor-pointer
            border border-solid border-green-300
            hover:border-white hover:text-white
            ease-in-out duration-150"/>
            <input type="submit" v-if="!buttonHide" value="確認" :disabled="submitDisabled"
            class="bg-white hover:bg-green-400
            disabled:bg-gray-600 !bg-gray-600 disabled:cursor-default
            text-green-300 rounded-full w-1/4 h-8 font-normal mx-auto cursor-pointer
            border border-solid border-green-300
            hover:border-white hover:text-white
            ease-in-out duration-150"/>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        title: String,
        contact: {
            name: String,
            mail: String,
            content: String
        },
        submit: Function,
        edit: Boolean,
        buttonHide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            contents: {
                name: {
                    flag: false,
                    isEmpty: true
                },
                mail: {
                    flag: false,
                    isEmail: false
                },
                content: {
                    flag: false,
                    isEmpty: true
                }
            },
            submitDisabled: true
        };
    },
    created() {
        this.submitDisabled = this.title === "お問い合わせフォーム";
        this.contents.name.isEmpty = !(this.contact.name.length > 0);
        this.contents.mail.isEmail = this.contact.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        this.contents.content.isEmpty = !(this.contact.content.length > 0);
        this.validateCompletedForm();
    },
    methods: {
        back() {
            this.$router.push('/contact/');
        },
        validateCompletedForm() {
            console.log((!this.contents.name.isEmpty && this.contents.mail.isEmail && !this.contents.content.isEmpty))
            this.submitDisabled = !(!this.contents.name.isEmpty && this.contents.mail.isEmail && !this.contents.content.isEmpty);
        },
        validateEmail(event) {
            const mail = event.target.value;
            this.contents.mail.flag = true;
            this.contents.mail.isEmail = mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            this.validateCompletedForm();
        },
        validateEmpty(event) {
            const isEmpty = event.target.value.length === 0;
            const id = event.target.id;
            switch(id) {
                case "name":
                    this.contents.name.isEmpty = isEmpty;
                    this.contents.name.flag = true;
                    break;
                case "content":
                    this.contents.content.isEmpty = isEmpty;
                    this.contents.content.flag = true;
                    break;
            };
            this.validateCompletedForm();
        }
    }
}
</script>

<style scoped>
[disabled="disabled"] {
    opacity: 0.5;
}
</style>