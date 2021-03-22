<template>
    <h1>Dagens trafikmeddelanden</h1>
    <div class="nav">
    <button class="butt" type="button" @click="filterEventClassSerious(1)">Allvarlig</button>
    <button class="butt" type="button" @click="filterEventClassSerious(2)">Medel</button>
    <button class="butt" type="button" @click="filterEventClassSerious(3)">Mindre</button>
    <button class="butt" type="button" @click="filterEventClassSerious(4)">Kommunal</button>
    </div>
    <p v-for="(message, index) in messages" :key="index">[{{message.exactlocation}}] [{{ Math.round(message.distance)}} km] [{{message.createddate}}] {{message.priority}} {{message.description}}</p>
</template>

<script>
import { getTrafficMessages } from '../lib/data.js'

export default {
    name: "Traffic stuff",

    data() {
        return {
            messages: [],
            messagesOriginal: [],
            userLatitude: "",
            userLongitude: "",
        }
    },

    async mounted() {
        this.messages = await getTrafficMessages();
        this.messagesOriginal = this.messages.slice();
    }, methods: {
        
        filterEventClassSerious(priorityNumber) {
            this.messages = this.messagesOriginal.slice()
            this.messages = this.messages.filter(message => message.priority == priorityNumber)
        }
        
    }
}
</script>

<style scoped>
    p {
        color: black;
        font-weight: bold;
        font-size: xx-large;
        padding: 1em;
        background-color:rgb(143, 143, 143);
        font-family: monospace;
    }

    .butt {
        margin-left: 100px;
        margin-right: 100px;
    }

</style>
