<template>
  <br />
  {{ new Date(this.startdate).getMonthName() }}
  <div :id="uniqueID" :class="reversed ? 'reversed' : 'regular'"></div>
</template>

<script>
import ApexCharts from "apexcharts";
import { getTopFiveArtists } from "../lib/data.js";

export default {
  name: "TestChart",

  data() {
    return {
      uniqueID: "chart" + this.id,
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
    var options = {
      series: [
        {
          // bar values
          data: [],
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
        categories: [],
      },
      yaxis: {
        reversed: this.reversed,
        max: 300,
        axisTicks: {
          show: true,
        },
      },
    };

    let date = new Date(this.startdate);
    const toplist = await getTopFiveArtists(
      date.getFullYear(),
      date.getMonth() + 1
    );

    let amountOfTimesPlayed;
    let artist;
    let song;
    for (let track of toplist) {
      artist = track.split(":")[0];
      song = track.split(":")[1].split("¤")[0];
      amountOfTimesPlayed = track.split("¤")[1];
      options.series[0]["data"].push(amountOfTimesPlayed);
      options.xaxis["categories"].push(artist + ", " + song);
    }
    //console.log(BASE_URL)

    let chart = new ApexCharts(
      document.querySelector("#" + this.uniqueID),
      options
    );
    chart.render();

    this.$forceUpdate();
  },
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