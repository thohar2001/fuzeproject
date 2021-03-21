<template>
      <div :id="uniqueID" :class="reversed ? 'reversed' : 'regular'">
      </div>
</template>

<script>
import ApexCharts from "apexcharts";
//import { getTopFiveArtists } from '../lib/data.js';

export default {
  name: "TestChart",
  
  data() {
    return {
      uniqueID: "chart" + this.id
    }
  },
  props: {
    reversed: {
      type: Boolean,
      default: true
    },
    startdate: {
      type: String,
      //default: new Date().toISOString()
    },
    enddate: {
      type: String
    },
    id: {
      type: String
    }
  },
  
  async mounted() {
    console.log("this.startdate=" + this.startdate)
    console.log("this.enddate=" + this.enddate)
    //const toplist = await getTopFiveArtists()
    //console.log("toplist=" + toplist)
    //console.log(BASE_URL)
    var options = {
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Titel Artist",
          "Titel Artist",
          "Titel Artist",
          "Titel Artist",
          "Titel Artist",
        ],
      },
      yaxis: {
        reversed: this.reversed,
        axisTicks: {
          show: true,
        },
      },
    };

    console.log("Drawing ApexChart (element id=" + this.id + ")")
    let chart = new ApexCharts(document.querySelector("#"+this.uniqueID), options);
    chart.render();
    
    
  }
};
</script>

<style>
.reversed {
  padding-right: 50%;
}

.regular {
  padding-left: 50%;
}

</style>