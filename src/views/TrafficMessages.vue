<template>
    <h1>Dagens trafikmeddelanden</h1>
    <div class="nav">
    <button id="allvarlig" class="butt" type="button" @click="filterEventClassSerious(1)">Allvarlig</button>
    <button id="medel" class="butt" type="button" @click="filterEventClassSerious(2)">Medel</button>
    <button id="mindre" class="butt" type="button" @click="filterEventClassSerious(3)">Mindre</button>
    <button id="kommunal" class="butt" type="button" @click="filterEventClassSerious(4)">Kommunal</button>
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
        
        width: 130px;
        margin-left: 15px;
        margin-right: 15px;
        border: none;
        color: rgb(253, 253, 253);
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px
    }

    #allvarlig {
        background-color: rgb(255, 86, 86);
    }
    
    #medel {
        background-color: rgb(220, 223, 60);
    }

    #mindre {
        background-color: rgb(0, 155, 182);
    }

    #kommunal {
        background-color: rgb(0, 0, 0);
    }

</style>
