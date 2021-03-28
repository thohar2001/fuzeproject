<template>
  <br />
  <p id="month">
  {{ new Date(this.startdate).getMonthName() }}
  </p>
  <!-- <div :id="uniqueID" :class="reversed ? 'reversed' : 'regular'"></div> -->

  <div id="app">
    <apexchart
      :ref="uniqueID"
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
      :class="reversed ? 'reversed' : 'regular'"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { getTopFiveArtists } from "../lib/data.js";
//import ApexCharts from "apexcharts";

export default {
  name: "TestChart",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      uniqueID: "chart" + this.id,
      //ApexCharts model 3.0 start

      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
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
          categories: [],
        },
        yaxis: {
          reversed: this.reversed,
          axisTicks: {
            show: true,
          },
        },
      },

      //ApexCharts 3.0 model ends
    };
  },
  props: {
    reversed: {
      type: Boolean,
      default: true,
    },
    startdate: {
      type: String,
      //default: new Date().toISOString()
    },
    id: {
      type: String,
    },
  },
  created() {
    Date.prototype.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    Date.prototype.getMonthName = function () {
      return this.monthNames[this.getMonth()];
    };
  },

  async mounted() {

    let date = new Date(this.startdate);
    const toplist = await getTopFiveArtists(
      date.getFullYear(),
      date.getMonth()
    );

    let amountOfTimesPlayed;
    let artist;
    let song;
    const newSeriesDataValues = [];
    const newXaxisCategoriesValues = [];
    for (let track of toplist) {
      artist = track.split(":")[0];
      song = track.split(":")[1].split("¤")[0];
      amountOfTimesPlayed = track.split("¤")[1];


      newSeriesDataValues.push(amountOfTimesPlayed);
      newXaxisCategoriesValues.push([artist, song]);
    }
    // Add play amounts to chart.
    this.series[0]["data"] = newSeriesDataValues;
    // Add tracks to chart. P.S. The chart will be refreshed once this object is set.
    this.chartOptions = {
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
        enabled: true,
        dropShadow: {
        enabled: true,
        left: 2,
        top: 2,
        opacity: 0.5
        }
      },
      xaxis: {
        categories: newXaxisCategoriesValues,
      },
      yaxis: {
        reversed: this.reversed,
        axisTicks: {
          show: true,
        },
      },
    };

  },
  methods: {

  },
};
</script>

<style>

#month {
    text-align: center;
    margin-top: 5em;
    font-weight: 1000;
    background-color:rgb(0, 162, 255);
    border:3px solid rgb(0, 162, 255);   
    color: white; 
    height:100px;
    border-radius:50%;
    width: 100px;
    margin-left: 50%;

    display: flex; /* or inline-flex */
    align-items: center; 
    justify-content: center;
}
.reversed {
  padding-left: 25%;
}

.regular {
  padding-left: 50%;
}

@media screen and (max-width: 800px) {
  .reversed {
    padding-left: 0%;
  }
  .regular {
    padding-left: 0%;
  }
}



</style>