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
    <option v-for="(m, index) in monthlist" :value="m" :key="index">{{ m }}</option>
  </select>
  </label>

  <label>
  To:
  <select ref="monthTo" @change="dateUpdated">
    <option v-for="(m, index) in monthlist" :value="m" :key="index">{{ m }}</option>
  </select>
  </label>

  <!-- create barcharts for each month -->
  
  <template v-for="i in timerangeInMonths">
    <template v-if="i%2 == 0">
      <!-- create left facing barchart -->
      <bar-chart :reversed="false" :id="String(i)" :key="i"></bar-chart>    
    </template>
    <template v-else>
      <!-- create right facing barchart -->
      <bar-chart :reversed="true" :id="String(i)" :key="i"></bar-chart>
    </template>
  </template>
  
<!--
  <bar-chart :reversed="false"></bar-chart>
  <bar-chart
    :reversed="true"
    :startdate="'2020-02-10'"
    :enddate="'2020-02-17'"
  ></bar-chart>
  <bar-chart :reversed="false"></bar-chart>
  <bar-chart></bar-chart>
  -->
</template>

<script>
import BarChart from "../components/BarChart.vue";

export default {
  name: "Home",
  components: {
    BarChart,
  },
  data() {
    return {
      monthlist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearList: [2018, 2019, 2020, 2021],
      timerangeInMonths: 0
    };
  },
  methods: {
    dateUpdated() {
      console.log("Date is now " + this.$refs.year.value + "-" + this.$refs.monthTo.value + "-" + this.$refs.monthTo.value)
      this.timerangeInMonths = Number(this.$refs.monthTo.value) - Number(this.$refs.monthFrom.value)
    }
  }, mounted() {
    this.dateUpdated()
  }
};
</script>

<style scoped>
label{
  margin: 1em 1em;
}
</style>