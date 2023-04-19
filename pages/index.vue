<template>
    <p>redirect to /contact</p>
</template>

<script>
export default {
    created() {
        this.$router.push('/contact');
    }
}
</script>
