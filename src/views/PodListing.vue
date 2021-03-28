<template>
  <label
    >Välj längd:
    <select v-model="timeIntervalString" ref="podLengthRange">
      <option value='30-40'>30-40 min</option>
      <option value='40-50'>40-50 min</option>
      <option value='50-60'>50-60 min</option>
      <option value='60-70'>60-70 min</option>
    </select>
  </label>

  <label
    >Välj kategori:
    <select v-model="selectedCategoryId" ref="podCategory">
      <option
        v-for="(category, index) in categoryList"
        :key="index"
        :value="category.id"
        :selected="index == 0 ? true : false"
      >
        {{ category.name }}
      </option>
    </select>
  </label>

  <label>
    Välj program:
    <select v-model="selectedProgramId" ref="podProgram" >
      <option
        v-for="(program, index) in programListFilteredByCategory"
        :key="index"
        :value="program.id"
      >
        {{ program.name }}
      </option>
    </select>
  </label>
  <br/>

  Podcasts will be displayed here:<br/>
  <template v-for="(podcast, index) in podcastList" :key="index">
    <h1><a :href="podcast.url">{{podcast.title}}</a></h1>
    {{ podcast.lengthInMinutes}} minuter
    <p>
      {{podcast.description}}<br>
    </p>

  </template>
  <hr>
  <!-- TODO: Add ApexChart here -->
</template>

<script>
import { getAllPrograms, getProgramCategories, getAllPods } from "../lib/data.js";

export default {
  name: "PodListing",

  data() {
    return {

      categoryList: [],
      programListAll: [],
      programListFilteredByCategory: [],
      podcastList: [],
      selectedCategoryId: null,
      selectedProgramId: null,
      timeIntervalString: null,
      timeIntervalMin: null,
      timeIntervalMax: null,
      
    };
  },
  async mounted() {
    this.programListAll = await getAllPrograms();
    this.categoryList = await getProgramCategories();
  },
  methods: {

    async refreshPodcastsList() {
      if (this.selectedProgramId) {
        this.podcastList = await getAllPods(this.selectedProgramId, this.timeIntervalMin, this.timeIntervalMax)
      }
    },

    filterProgramsByCategory(categoryId) {
      categoryId = Number(categoryId)
      this.programListFilteredByCategory = this.programListAll.filter(
        (program) => {
          if (program.programcategory) {
            // Program contains category: add program to result if it's got the category we are looking for.
            return program.programcategory.id == categoryId;
          } else {
            // Program contains no category at all: discard all those programs.
            return false;
          }
        }
      );
    },
  },
  watch: {

    categoryList(newCategoryList) {
      // Catgeory list has been retrieved: automatically select the first category in the dropdown list on the html page.
      this.selectedCategoryId=newCategoryList[0].id
    },

    async timeIntervalString(newtimeIntervalString) {
      // Timeinterval dropdown box has changed: get max and min value from its string value.
      this.timeIntervalMin = newtimeIntervalString.split("-")[0]
      this.timeIntervalMax = newtimeIntervalString.split("-")[1]
      // Refresh the podcast list to reflect the new timerange restriction.
      this.refreshPodcastsList()
    },

    selectedCategoryId(newCategoryId) {
      console.log("You have selected category: " +  newCategoryId + ".");
      this.filterProgramsByCategory(newCategoryId);
    },

    async selectedProgramId(newProgramId) {
      console.log("You have selected program: " + newProgramId + ".");
      // TODO: get new values for podcast array
      this.refreshPodcastsList()
    },

    programListFilteredByCategory(newProgramList) {
      // Programlist has been filtered by category: automatically select the first program in the dropdown list on the html page.
      if (newProgramList.length > 0) {
        this.selectedProgramId = newProgramList[0].id;
      }
    },
    
  },
};
</script>

<style>
canvas {
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  width: 320px;
  height: 320px;
}

@media only screen and (min-width: 800px) {
  canvas {
    width: 800px;
    height: 800px;
  }
}
</style>