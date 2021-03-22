import { createRouter, createWebHashHistory } from 'vue-router'
import TrafficMessages from '../views/TrafficMessages.vue'
import PodListing from '../views/PodListing.vue'
import Musictimeline from '../views/MusicTimeline.vue'
import About from '../views/About.vue'

const routes = [
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
