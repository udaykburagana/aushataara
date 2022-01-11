<template>
    <h1>HOME PAGE</h1>
</template>

<script>
export default {
    mounted(){
        if(!this.$store.state.isLoggedIn) this.$router.push("/")
    }
}
</script>