import { createRouter, createWebHashHistory } from 'vue-router'
import TrafficMessages from '../components/TrafficMessages.vue'
import Podtree from '../components/PodTree.vue'
import Musictimeline from '../components/MusicTimeline.vue'

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
