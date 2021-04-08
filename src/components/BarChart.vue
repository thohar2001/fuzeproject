<template>
  <br />
  <p id="month" :style="'color: ' + colorMonth">
  {{ new Date(this.startdate).getMonthName() }}
  </p>
  <!-- <div :id="uniqueID" :class="reversed ? 'reversed' : 'regular'"></div> -->
  <template v-if="showLoading" style="color: white">
    Loading... 
    <div class="spinner-border" role="status" style="color: white">
      <span class="sr-only"></span>
    </div>
  </template>

  <div id="app" ref="app">
    <apexchart
      :ref="uniqueID"
      width="100%"
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
      barColors: ['#FA3C4C', '#FFC300', '#44BEC7', '#0084FF'],
      uniqueID: "chart" + this.id,
      colorMonth: null,
      showLoading: true,
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
          foreColor: '#FFFFFF',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [],
          axisBorder: {
            show: false
          },
        },
        yaxis: {
          reversed: this.reversed,
          axisTicks: {
            show: true,
          },
        },
        grid: {
          show: false,
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
    barcolor: {
      type: Number,
    }
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

    // Hide all charts while they are loading
    this.$refs.app.style.display = "none";

    // The chart chooses color depending on the value of the bar chart (barcolor prop)
    // 4 different colors to choose from 
    let theColor = []
    
    // set a color for this month
    this.colorMonth = this.barColors[this.barcolor % 4]
    theColor.push(this.barColors[this.barcolor % 4])  

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

    // Show charts again because they have finished loading
    this.$refs.app.style.display = "block";
    this.showLoading = false;
    // Add play amounts to chart.
    this.series[0]["data"] = newSeriesDataValues;
    // Add tracks to chart. P.S. The chart will be refreshed once this object is set.
    this.chartOptions = {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
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
        fill: {
          colors: theColor,
          type: 'gradient',
          gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
          }
        },
      xaxis: {
        categories: newXaxisCategoriesValues,
      },

      // theme: {
      //   palette: ['palette1', 'palette2', 'palette3']
      // },
    };
  },
};
</script>

<style>

#month {
    text-align: center;
    font-weight: 1000;
    font-size: 2em;
    margin-top: 1em;
    color: barColor;
    width: 100px;
    margin-left: 50%;

    display: flex; /* or inline-flex */
    align-items: center; 
    justify-content: center;
}
.reversed {
  padding-right: 50%;
}

.regular {
  padding-left: 50%;
}

@media screen and (max-width: 800px) {
  .reversed {
    padding-right: 0%;
  }
  .regular {
    padding-left: 0%;
  }
}



</style>