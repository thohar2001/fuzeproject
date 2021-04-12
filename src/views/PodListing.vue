<template>
  <p>Skräddarsy ditt podcast-schema:<br /></p>
  <label
    >Välj längd:
    <select v-model="timeIntervalString" ref="podLengthRange">
      <option value="0-10">0-10 min</option>
      <option value="10-20">10-20 min</option>
      <option value="20-30">20-30 min</option>
      <option value="30-40">30-40 min</option>
      <option value="40-50">40-50 min</option>
      <option value="50-60">50-60 min</option>
      <option value="60-80">60-80 min</option>
      <option value="80-100">80-100 min</option>
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
    <select v-model="selectedProgramId" ref="podProgram">
      <option
        v-for="(program, index) in programListFilteredByCategory"
        :key="index"
        :value="program.id"
      >
        {{ program.name }}
      </option>
    </select>
  </label>
  <br />

  <br />
  <template v-for="(podcast, index) in podcastList" :key="index">
    <div class="carden">
      <h1>
        <a class="link" :href="podcast.url">{{ podcast.title }}</a>
      </h1>
      <div class="timeinmin">
        <a class="link" :href="podcast.url">
          <img class="playbutton" src="@/assets/playbutton.png" />
          {{ podcast.lengthInMinutes }} min
        </a>
      </div>
    </div>
  </template>
  <hr />
</template>

<script>
import {
  getAllPrograms,
  getProgramCategories,
  getAllPods,
} from "../lib/data.js";

export default {
  name: "PodListing",

  data() {
    return {
      categoryList: [],

      /**
      * @description - Contains all programs on SR radio that contain podcasts.
      */
      programListAll: [],

      /**
      * @description - Contains all programs on SR radio that contain podcasts.
      */      
      programListFilteredByCategory: [],

      /**
      * @description - Contains all podcats on SR radio that correspond to the currently selected program AND currently selected category AND currently selected maximum and minimum podcast length.
      */ 
      podcastList: [],

    /**
      * @description - Currently selected category ID (in dropdownmenu for category) is stored here.
      */
      selectedCategoryId: null,

    /**
      * @description - Currently selected programme ID (in dropdownmenu for program) is stored here.
      */
      selectedProgramId: null,
      timeIntervalString: null,

    /**
      * @description - Currently selected maximum length of podcasts.
      */
      timeIntervalMin: null,

    /**
      * @description - Currently selected minimum length of podcasts.
      */
      timeIntervalMax: null,
    };
  },
  async mounted() {
    // fetch all programs from SR API
    this.programListAll = await getAllPrograms();
    // fetch all categories
    this.categoryList = await getProgramCategories();
  },
  methods: {

   /**
     * Get all podcast episodes for currently selected programme 
     * and store them in array which Vue will then use to generate the podcast list on the page.
     *
     */
    async refreshPodcastsList() {
      if (this.selectedProgramId) {
        this.podcastList = await getAllPods(this.selectedProgramId, this.timeIntervalMin, this.timeIntervalMax);
      }
    },

    /**
     * In dropdown menu for programmes, show only programmes which correspond to the specified categoryId
     *
     * @param  {Number} categoryId Category ID to filter programmes by.
     */
    filterProgramsByCategory(categoryId) {
      categoryId = Number(categoryId);
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
    /**
     * Array which is used to populate dropdown list for categoryhas changed: automatically select the first category in the dropdown list on the html page.
     *
     * @param  {Array} newCategoryList
     */
    categoryList(newCategoryList) {
      // Automatically select the first category in the dropdown list on the html page.
      this.selectedCategoryId = newCategoryList[0].id;
    },

    async timeIntervalString(newtimeIntervalString) {
      // Timeinterval dropdown box has changed: get max and min value from its string value.
      this.timeIntervalMin = newtimeIntervalString.split("-")[0];
      this.timeIntervalMax = newtimeIntervalString.split("-")[1];
      // Refresh the podcast list to reflect the new timerange restriction.
      this.refreshPodcastsList();
    },

    /**
     * A new selection has been made in the dropdown menu for category. Automatically reduce the content of the dropdown menu for programmes to show only programmes of that category.
     *
     * @param  {Number} newCategoryId
     */
    selectedCategoryId(newCategoryId) {
      this.filterProgramsByCategory(newCategoryId);
    },

    /**
     * A new selection has been made in the dropdown menu for program. Automatically reduce the content of the listing of podcats to show only podcasts of that programme.
     *
     */
    async selectedProgramId() {
      this.refreshPodcastsList();
    },

    /**
     * Array which is used to populate dropdown list for programmes has changed: automatically select the first category in the dropdown list on the html page.
     *
     * @param  {Array} newProgramList
     */
    programListFilteredByCategory(newProgramList) {
      // Automatically select the first program in the dropdown list on the html page.
      if (newProgramList.length > 0) {
        this.selectedProgramId = newProgramList[0].id;
      }
    },
  },
};
</script>

<style scoped>
a,
a:hover,
a:visited,
a:link,
a:active {
  color: #ffffff;
  text-decoration: none;
}

p,
label {
  color: #ffffff;
}

.timeinmin {
  color: #fa3c4c;
  vertical-align: middle;
}

h2 {
  margin-top: 0;
}

h1 a.link {
  font-size: x-large;
  color: #ffffff;
}

.playbutton {
  width: 40px;
}
/* this puts the elements that prints on the screen in cards */
.carden {
  display: inline-grid;
  padding: 40px;
  height: 24em;
  width: 30em;
  max-width: 360px;
  margin: 10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9);
}

option,
select {
  color: white;
}

/* This decreases the size of cards when used on mobile */
@media only screen and (max-width: 800px) {
  .carden {
    width: 15em;
  }
}
</style>
