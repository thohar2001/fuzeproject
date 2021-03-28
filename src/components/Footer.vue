<template>
    <footer>
       <router-link to="/About"> {{ FooterText }} </router-link>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                FooterText: 'Om oss'
            }
        }
    }

</script>

<style scoped>

footer{
    padding: 0.5em;
    font-size: x-large;
    position: relative;
    width: 90%;
}

</style>
