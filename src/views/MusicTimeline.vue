<template>
  <h3>Music timeline will be displayed here.</h3>

  <label>
    Year:
    <select ref="year" @change="dateUpdated">
      <option v-for="(y, index) in yearList" :value="y" :key="index">{{ y }}</option>
    </select>
  </label>

  <label>
  From:
  <select ref="monthFrom" @change="dateUpdated">
    <option v-for="(m, index) in monthlist" :value="index+1" :key="index+1">{{ m }}</option>
  </select>
  </label>

  <label>
  To:
  <select ref="monthTo" @change="dateUpdated">
    <option v-for="(m, index) in monthlist" :value="m" :key="index+1" :selected="(index == new Date().getMonth()) ? true : false">{{ m }}</option>
    <!-- Tommi testar: <option v-for="(m, index) in monthlist" :value="m" :key="index+1" :selected="(index == new Date().getMonth()) ? true : false">{{ m }}</option> -->
  </select>
  </label>

  <!-- create barcharts for each month: every other barchart faces left and every other barchar faces right. -->
  
  <template v-for="i in timerangeInMonths">
    <template v-if="i%2 == 0">
      <!-- create left facing barchart -->
      <bar-chart :reversed="false" :id="'chart_' + String(i + (dateUpdatedCounter*100))" :key="i" :startdate="getStartDate()" :enddate="getEndDate()"></bar-chart>
    </template>
    <template v-else>
      <!-- create right facing barchart -->
      <bar-chart :reversed="true" :id="'chart_' + String(i + (dateUpdatedCounter*100))" :key="i" :startdate="getStartDate()" :enddate="getEndDate()"></bar-chart>
    </template>
  </template>
</template>

<script>
import BarChart from "../components/BarChart.vue";
import { getTopFiveArtists } from "../lib/data.js";

export default {
  name: "Home",
  components: {
    BarChart,
  },
  data() {
    return {
      monthlist: ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"],
      yearList: [2018, 2019, 2020, 2021],
      timerangeInMonths: 0,
      dateUpdatedCounter: 0
    };
  },
  methods: {
    dateUpdated() {
      //console.log("Date fields are now " + this.$refs.year.value + ": " + this.$refs.monthFrom.selectedIndex + "-" + this.$refs.monthTo.selectedIndex)
      this.timerangeInMonths = Number(this.$refs.monthTo.selectedIndex)+1 - Number(this.$refs.monthFrom.selectedIndex)
      this.dateUpdatedCounter++;
      //alert("this.timerangeInMonths=" + this.timerangeInMonths)
    },
    getStartDate() {
      return this.yearList[this.$refs.year.selectedIndex] + "-" + (this.$refs.monthFrom.selectedIndex+1) + "-01"
    },
    getEndDate() {
      return this.yearList[this.$refs.year.selectedIndex] + "-" + (this.$refs.monthTo.selectedIndex+2) + "-01"
    }
  }, mounted() {
    this.dateUpdated();
    console.log("YOYOYOYOYOYO: " + getTopFiveArtists('2021-01-01', '2021-01-31'));
  }
};
</script>

<style scoped>
label{
  margin: 1em 1em;
}
</style>