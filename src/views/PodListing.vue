<template>
  

  <select ref="podLength">
    <option value="30">Välj tid:</option>
    <option value="30">30-40</option>
    <option value="40">40-50</option>
    <option value="50">50-60</option>
    <option value="60">60-70</option>
  </select>


  <label>Välj kategori:  
  <select ref="podCategory" @change="this.filterProgramsByCategory">
    <option v-for="(category, index) in categoryList" :key="index" :value="category.id">{{category.name}}</option>
  </select>
  </label>

  <label>
  Välj program:
  <select ref="podProgram" @change="false">
    <option v-for="(program, index) in programListFilteredByCategory" :key="index" :value="program.id">{{program.name}}</option>
  </select>
  </label>


  <!-- <p v-for="(podcast, index) in podcastList" :key="index" :value="program.id">{{podcast.name}}</p> -->
  <!-- <PodCircle></PodCircle> -->

</template>

<script>
import { getAllPrograms, getProgramCategories } from '../lib/data.js'

export default {
  name: "PodListing",
  
  data() {
    return {
      monthlist: ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"],
      categoryList: [],
      programList: [],
      programListFilteredByCategory: [],
      selectedCategoryId: 0
      
    };
  },
  async mounted() {
    this.categoryList = await getProgramCategories()
    this.programList = await getAllPrograms()
    this.programListFilteredByCategory = this.programList
    this.selectedCategoryId = this.$refs.podCategory.value
    //this.getPrograms(this.selectedCategoryId)
    //console.log("this.programList=" + this.programList)
    //console.log("hej monika hej på dig monika " + this.categoryList);
  },
  methods: {
    filterProgramsByCategory() {
      this.selectedCategory= this.$refs.podCategory.selectedIndex //.value
      this.programListFilteredByCategory = this.programList.filter(program => program.categoryId == this.selectedCategory)
      console.log("Filtering categories by " + this.selectedCategory + "(" + this.programListFilteredByCategory.length + "items)")
    }
  }
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
