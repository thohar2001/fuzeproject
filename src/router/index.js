import { createRouter, createWebHashHistory } from 'vue-router'
import TrafficMessages from '../views/TrafficMessages.vue'
import Podtree from '../views/PodTree.vue'
import Musictimeline from '../views/MusicTimeline.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TrafficMessages
  },
  {
    path: '/podtree',
    name: 'Podtree',
    component: Podtree
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
