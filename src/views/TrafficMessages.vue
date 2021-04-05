<template>



    <h1>Dagens trafikmeddelanden</h1>
    <div class="nav">
    <button id="allvarlig" class="butt" type="button" @click="filterEventClassSerious(1)">Allvarlig</button>
    <button id="medel" class="butt" type="button" @click="filterEventClassSerious(2)">Medel</button>
    <button id="mindre" class="butt" type="button" @click="filterEventClassSerious(3)">Mindre</button>
    <button id="kommunal" class="butt" type="button" @click="filterEventClassSerious(4)">Kommunal</button>
    </div>
    
    <div v-for="(message, index) in messages" :key="index" :value="message.priority" class="accordion accordion-flush" id="accordionFlushTrafficMessages">
        <div class="accordion-item">
            
            <h2 class="accordion-header" :id="'flush-heading' + index">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' +index" aria-expanded="false" :aria-controls="'flush-collapse' + index">
                    <!-- Accordion heading begins -->
                    [{{message.exactlocation}}] [{{ Math.round(message.distance)}} km] 
                    <!-- Accordion heading ends -->
                </button>
                    
            </h2>
            <div :id="'flush-collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'flush-heading' + index" data-bs-parent="#accordionFlushTrafficMessages">
                <div class="accordion-body">
                    <!-- Accordion body begins -->
                    [{{message.createddate}}] {{message.priority}} {{message.description}}
                    <!-- Accordion body ends -->
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { getTrafficMessages } from '../lib/data.js'

export default {
    name: "Traffic stuff",

    data() {
        return {
            messages: [],
            messagesOriginal: [],
            currentPriority: 0,
            userLatitude: "",
            userLongitude: "",
        }
    },

    async mounted() {
        this.messages = await getTrafficMessages();
        this.messagesOriginal = this.messages.slice();
    }, methods: {
        
        async filterEventClassSerious(priorityNumber) {
            if(priorityNumber == this.currentPriority) {
                this.messages = await getTrafficMessages()
                this.currentPriority = 0
            }
            else {
                this.messages = this.messagesOriginal.slice()
                this.messages = this.messages.filter(message => message.priority == priorityNumber)
                this.currentPriority = priorityNumber
            }

        }
        
    }
}
</script>

<style scoped>
    


    p {
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: large;
        border-radius: 2em;
        padding: 1em;
        background-color:rgb(143, 143, 143);
        margin-left: 15em;
        margin-right: 15em;
    }

    p[value="1"] {
        background-color: rgb(250, 60, 76);
    }

    p[value="2"] {
        background-color: rgb(255, 195, 0);
    }

    p[value="3"] {
        background-color: rgb(68, 190, 199);
    }

    p[value="4"] {
        background-color: rgb(0, 0, 0);
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
        background-color: rgb(250, 60, 76);
    }
    
    #medel {
        background-color: rgb(255, 195, 0);
    }

    #mindre {
        background-color: rgb(68, 190, 199);
    }

    #kommunal {
        background-color: rgb(0, 0, 0);
    }

</style>
