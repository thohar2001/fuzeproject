<template>
    <div class="navtrafik">
    <button id="allvarlig" class="butt" type="button" @click="filterEventClassSerious(1)" value="1">Allvarlig</button>
    <button id="medel" class="butt" type="button" @click="filterEventClassSerious(2)" value="2">Medel</button>
    <button id="mindre" class="butt" type="button" @click="filterEventClassSerious(3)" value="3">Mindre</button>
    <button id="kommunal" class="butt" type="button" @click="filterEventClassSerious(4)" value="4">Kommunal</button>
    </div>
    
    <div class="accordion" id="accordionFlushTrafficMessages">
        <div v-for="(message, index) in messages" :key="index" :value="message.priority" class="accordion-item">
            
            <h2 class="accordion-header" :id="'flush-heading' + index">
            
                <button class="accordion-button collapsed" :value="message.priority" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' +index" aria-expanded="false" :aria-controls="'flush-collapse' + index">
                    <!-- Accordion heading begins -->
                   <div class="location">{{message.exactlocation}} <span class="distance">{{ Math.round(message.distance)}} km</span> </div>
                    <!-- Accordion heading ends -->
                </button>
                    
            </h2>
            <div :id="'flush-collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'flush-heading' + index" data-bs-parent="#accordionFlushTrafficMessages"  >
                <div class="accordion-body" :value="message.priority">
                    <!-- Accordion body begins -->
                    
                    {{message.description}}
                    <br><br>
                     När: {{message.createddate}}
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
        
        /**
         * User has pressed one of the priority level buttons in th the component: only show traffic messages of that priority level in this component/view. 
         * Or if the same button was already depressed: show all types of traffic messages.
         * @param  {Number} priorityNumber Priority level of button which was pressed: 1-4.
        */
        async filterEventClassSerious(priorityNumber) {
            
            if(priorityNumber == this.currentPriority) {
                // User has pressed the same button which was already depressed: start showing all trafic messages irrespective of priority level.
                this.enableButtonByPriority(priorityNumber, true)
                this.messages = await getTrafficMessages()
                this.currentPriority = 0
            }
            else {
                // This button wasn't depressed from before: start showing only trafic messages that correspond to this priority level.
                this.enableButtonByPriority(priorityNumber, false)
                this.messages = this.messagesOriginal.slice()
                this.messages = this.messages.filter(message => message.priority == priorityNumber)
                this.currentPriority = priorityNumber
            }
        },

        /**
         * Enable only the button that is indicated by parameter priorityNumber or disregard priorityNumber and enable all four buttons.
         * @param  {Number} priorityNumber Priority level: 1-4
         * @param  {Boolean} enableAllButtons Enables all buttons if true. Else enable only button indicated by priorityNumber.
        */
        enableButtonByPriority(priorityNumber, enableAllButtons) {
            document.getElementById("allvarlig").disabled = (priorityNumber==1 || enableAllButtons? false : true)
            document.getElementById("medel").disabled = (priorityNumber==2 || enableAllButtons? false : true)
            document.getElementById("mindre").disabled = (priorityNumber==3 || enableAllButtons? false : true)
            document.getElementById("kommunal").disabled = (priorityNumber==4 || enableAllButtons? false : true)
        }   
    }
}
</script>

<style scoped>

    h2 {
        color: white;
    }

    .location {
        width: 100%;
        background-color: transparent;
    }
    .distance {
        float: right;
        background-color: transparent;
    }

    .accordion-body {
        text-align: left;
    }

    div.accordion-item {
        border: solid white 2px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: large;
        border-radius: 2em;
        padding: 1em;
        background-color:rgb(143, 143, 143);
        margin-top: 35px;
        margin-left: 15%;
        margin-right: 15%;
    }

    .navtrafik { 
        padding: 2%;
    }

    button.accordion-button:focus {   
        box-shadow: none;
    }

    div.accordion-item, button.accordion-button, div.accordion-body {
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: large;
    }

    /* set color for horizontal line between traffic message heading and traffic message body */
    div.accordion-body {
        border-top: 1px dashed white;
    }

    /* Color for button and traffic messages for priority=Allvarlig */
    button[value="1"], div.accordion-item[value="1"], button.accordion-button[value="1"], div.accordion-body[value="1"] {
        background-color: rgb(241, 93, 93);
    }

    /* Color for button and traffic messages for priority=Medel */
    button[value="2"], div.accordion-item[value="2"], button.accordion-button[value="2"], div.accordion-body[value="2"] {
        background-color: rgb(255, 195, 0);
    }

    /* Color for button and traffic messages for priority=Mindre */
    button[value="3"], div.accordion-item[value="3"], button.accordion-button[value="3"], div.accordion-body[value="3"] {
        background-color: rgb(68, 190, 199);
    }

    /* Color for button and traffic messages for priority=Kommunal */
    button[value="4"], div.accordion-item[value="4"], button.accordion-button[value="4"], div.accordion-body[value="4"] {
        background-color: rgb(0, 0, 0);
    }

    /* Additional formatting for the four priority level buttons */
    button.butt {
        border-radius: 25px;
        width: 130px;
        margin-left: 15px;
        margin-right: 15px;
        border: none;
        color: rgb(253, 253, 253);
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border: solid white 2px;
    }

    /* What the priority level buttons look like when they are disabled/greyed out */
    button.butt:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }

    /* if used on mobile, decrease size of filterbuttons to match same design as desktop */ 
    @media only screen and (max-width: 633px) {
    button.butt {
        margin-left: 3px;
        margin-right: 3px;
        font-size: 12px;
        padding: 10px 10px;
        width: 80px;
        }
    }

</style>
