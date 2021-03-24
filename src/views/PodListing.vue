<template>
  <label
    >Välj längd:
    <select v-model="timeIntervalString" ref="podLengthRange">
      <option value="30-40" selected>30-40</option>
      <option value="40-50">40-50</option>
      <option value="50-60">50-60</option>
      <option value="60-70">60-70</option>
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
  <p v-for="(podcast, index) in podcastList" :key="index" :value="podcast.id"><a :href="podcast.url">{{podcast.title}}</a></p>
  <!-- <PodCircle></PodCircle> -->
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
    this.categoryList = await getProgramCategories();
    this.programListAll = await getAllPrograms();
  },
  methods: {
    async refreshPodcastsList() {
      if (this.selectedProgramId) {
        this.podcastList = await getAllPods(this.selectedProgramId, this.timeIntervalMin, this.timeIntervalMax)
      }
    },
    filterProgramsByCategory(categoryId) {

      this.programListFilteredByCategory = this.programListAll.filter(
        (program) => {
          if (program.programcategory) {
            // Program contains category: slect program if it's got the category we are looking for.
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
    async timeIntervalString(newtimeIntervalString) {
      // Timeinterval dropdown box has changed: get max and min value from its string value.
      this.timeIntervalMin = newtimeIntervalString.split("-")[0]
      this.timeIntervalMax = newtimeIntervalString.split("-")[1]
      this.refreshPodcastsList()
    },

    selectedCategoryId(newCategoryId) {
      console.log("You have selected category: " +  newCategoryId + ".");
      this.filterProgramsByCategory(newCategoryId);
    },

    async selectedProgramId(newProgramId) {
      console.log("You have selected program: " + this.selectedProgramId + "(" + newProgramId + ")");
      // TODO: get new values for podcast array
      this.refreshPodcastsList()
    },

    /*
    programListFilteredByCategory(newArray) {
      // A new category has been chosen: automatically select the first program in the category
      if (newArray.length > 0) {
        this.selectedProgramId = String(newArray[0].id);
      }
    },
    */
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
