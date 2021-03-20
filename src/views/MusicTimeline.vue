<template>
  <h3>Music timeline will be displayed here.</h3>
  <div id="chart"></div>
  <div id="chart2"></div>
</template>

<script>
import ApexCharts from "apexcharts";


export default {
  name: "TestChart",

  mounted() {
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
        reversed: false,
        axisTicks: {
          show: true,
        },
      },
    };

    var options2 = {
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
        reversed: true,
        axisTicks: {
          show: true,
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
  },
};
</script>

<style>
#chart {
  padding-left: 50%;
}

#chart2 {
  padding-right: 50%;
}
</style>
