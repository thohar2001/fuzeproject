<template>
  <label
    >Välj tid:
    <select ref="podLength">
      <option value="30">30-40</option>
      <option value="40">40-50</option>
      <option value="50">50-60</option>
      <option value="60">60-70</option>
    </select>
  </label>

  <label
    >Välj kategori:
    <select ref="podCategory" @change="categoryDropdownChanged">
      <option
        v-for="(category, index) in categoryList"
        :key="index"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </label>

  <label>
    Välj program:
    <select ref="podProgram" @change="programDropdownChanged">
      <option
        v-for="(program, index) in programListFilteredByCategory"
        :key="index"
        :value="program.id"
      >
        {{ program.name }}
      </option>
    </select>
  </label>

  <!-- <p v-for="(podcast, index) in podcastList" :key="index" :value="program.id">{{podcast.name}}</p> -->
  <!-- <PodCircle></PodCircle> -->
</template>

<script>
import { getAllPrograms, getProgramCategories } from "../lib/data.js";

export default {
  name: "PodListing",

  data() {
    return {
      monthlist: [
        "January",
        "Februari",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Oktober",
        "November",
        "December",
      ],
      categoryList: [],
      programListAll: [],
      programListFilteredByCategory: [],
      selectedCategoryId: null,
      selectedProgramId: null,
      timeIntervalMin: null,
      timeIntervalMax: null,
    };
  },
  async mounted() {
    this.categoryList = await getProgramCategories();
    this.programListAll = await getAllPrograms();

    // TODO: remove this and create a watcher for this array
    var event = new Event("change");
    this.$refs.podCategory.dispatchEvent(event);
  },
  methods: {
    filterProgramsByCategory(categoryId) {

      this.programListFilteredByCategory = this.programListAll.filter(
        (program) => {
          if (program.programcategory) {
            return program.programcategory.id == categoryId;
          } else {
            return false;
          }
        }
      );
    },

    categoryDropdownChanged(evt) {
      this.selectedCategoryId = evt.target.value;
    },

    programDropdownChanged(evt) {
      this.selectedProgramId = evt.target.value;
    },
  },
  watch: {

    programListAll(newList) {
      this.programListFilteredByCategory = newList.slice()
    },

    selectedCategoryId(newCategoryId) {
      console.log("You have selected category: " + this.selectedCategoryId + "(" + newCategoryId + ")");
      this.filterProgramsByCategory(newCategoryId);
    },

    selectedProgramId(newProgramId) {
      console.log("You have selected program: " + this.selectedProgramId + "(" + newProgramId + ")");
    },

    programListFilteredByCategory(newArray) {
      // A new category has been chosen: automatically select the first program in the category
      if (newArray.length > 0) {
        this.selectedProgramId = String(newArray[0].id);
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
