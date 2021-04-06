import { createRouter, createWebHashHistory } from 'vue-router'
import StartPage from '../views/StartPage.vue'
import TrafficMessages from '../views/TrafficMessages.vue'
import PodListing from '../views/PodListing.vue'
import Musictimeline from '../views/MusicTimeline.vue'
import About from '../views/About.vue'


const routes = [
  {
    path: '/start',
    name: 'Start',
    component: StartPage,
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Home',
    component: TrafficMessages
  },
  {
    path: '/PodListing',
    name: 'PodListing',
    component: PodListing,
  },
  {
    path: '/MusicTimeline',
    name: 'Musictimeline',
    component: Musictimeline
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
