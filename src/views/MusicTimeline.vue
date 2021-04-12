<template>
  <h2>Topplåtar för P3 (spelningar / månad)</h2>

  <label >
    <select class="dropdown" ref="year" @change="dateUpdated">
      <option class="option" v-for="(y, index) in yearList" :value="y" :key="index">
        {{ y }}
      </option>
    </select>
  </label>

  <!-- create barcharts for each month: every other barchart faces left and every other barchar faces right. -->
  <template v-for="i in monthsInYear">
    <template v-if="i % 2">
      <!-- create left facing barchart -->
      <bar-chart
        :reversed="false"
        :id="'chart_' + String(i + dateUpdatedCounter * 100)"
        :key="selectedYear + '-' + i"
        :startdate="selectedYear + '-' + i"
        :barcolor="i"
      ></bar-chart>
    </template>
    <template v-else>
      <!-- create right facing barchart -->
      <bar-chart
        :reversed="true"
        :id="'chart_' + String(i + dateUpdatedCounter * 100)"
        :key="selectedYear + '-' + i + '-01'"
        :startdate="selectedYear + '-' + i + '-01'"
        :barcolor="i"
      ></bar-chart>
    </template>
  </template>
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
      monthlist: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec",
        ],
      yearList: [2018, 2019, 2020, 2021],
      selectedYear: 2018,
      monthsInYear: 12,
      dateUpdatedCounter: 0,
    };
  },
  methods: {
    dateUpdated() {
      this.selectedYear = this.$refs.year.value;
      console.log(this.selectedYear);
      this.dateUpdatedCounter++;
    },

    getComponentStartDate(komponentIndex) {
      let year = this.yearList[this.$refs.year.selectedIndex];
      let monthNumber = this.$refs.monthFrom.selectedIndex + komponentIndex;
      return year + "-" + monthNumber + "-01";
    },
  },
  async mounted() {
    this.dateUpdated();
  },
};
</script>

<style scoped>
h2 {
  color: white;
}

label {
  margin: 1em 1em;
}

.dropdown {
  width: 10em;
  height: 3em;
  color: white;
  font-size: large;
  background-color: #25283C;
  border-radius: 1em;
  outline: none;
}

.option {
  color: white;
  background-color: #25283C;
}

</style>