<template>
    <footer>
        <p> {{ FooterText}} </p>
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
    border: 2px solid black;
    padding: 0.5em;
    font-size: x-large;
    background-color: grey;
    position: relative;
    width: 100%;
}

</style>
