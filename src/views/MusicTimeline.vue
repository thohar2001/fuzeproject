<template>
  <h1>Most played songs each month</h1>

  <label>
    Year:
    <select ref="year" @change="dateUpdated">
      <option v-for="(y, index) in yearList" :value="y" :key="index">
        {{ y }}
      </option>
    </select>
  </label>

  <!-- <label>
    From:
    <select ref="monthFrom" @change="dateUpdated">
      <option
        v-for="(m, index) in monthlist"
        :value="index + 1"
        :key="index + 1"
      >
        {{ m }}
      </option>
    </select>
  </label>

  <label>
    To:
    <select ref="monthTo" @change="dateUpdated">
      <option
        v-for="(m, index) in monthlist"
        :value="m"
        :key="index + 1"
        :selected="index == new Date().getMonth() ? true : false"
      >
        {{ m }}
      </option>
    </select>
  </label> -->

  <!-- create barcharts for each month: every other barchart faces left and every other barchar faces right. -->

  <template v-for="i in monthsInYear">
    <template v-if="i % 2 == 0">
      <!-- create left facing barchart -->
      <bar-chart
        :reversed="false"
        :id="'chart_' + String(i + dateUpdatedCounter * 100)"
        :key="selectedYear + '-' + i"
        :startdate="selectedYear + '-' + i"
      ></bar-chart>
    </template>
    <template v-else>
      <!-- create right facing barchart -->
      <bar-chart
        :reversed="true"
        :id="'chart_' + String(i + dateUpdatedCounter * 100)"
        :key="selectedYear + '-' + i + '-01'"
        :startdate="selectedYear + '-' + i + '-01'"
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
      //   Number(this.$refs.monthTo.selectedIndex) +
      //   1 -
      //   Number(this.$refs.monthFrom.selectedIndex);
      this.dateUpdatedCounter++;
      //forceUpdate();
    },

    getComponentStartDate(komponentIndex) {
      let year = this.yearList[this.$refs.year.selectedIndex];
      let monthNumber = this.$refs.monthFrom.selectedIndex + komponentIndex;
      return year + "-" + monthNumber + "-01";
    },
  },
  async mounted() {
    this.dateUpdated();
    //console.log(getTopFiveArtists(2021, 1));
  },
};
</script>

<style scoped>
label {
  margin: 1em 1em;
}
</style>