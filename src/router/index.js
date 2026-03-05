import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/start' },
    { path: '/start', name: 'start', component: () => import('../views/Start.vue') },
    { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/airscene', name: 'airscene', component: () => import('../views/AirsceneVote.vue') },
    {
      path: '/p/:public_token',
      name: 'poll',
      component: () => import('../views/Poll.vue'),
    },
    {
      path: '/p/:public_token/results',
      name: 'results',
      component: () => import('../views/Results.vue'),
    },
    {
      path: '/r/:room_token/p/:public_token',
      name: 'room-poll',
      component: () => import('../views/Poll.vue'),
    },
    {
      path: '/r/:room_token/p/:public_token/results',
      name: 'room-results',
      component: () => import('../views/Results.vue'),
    },
    {
      path: '/my-rooms',
      name: 'my-rooms',
      component: () => import('../views/MyRooms.vue'),
    },
  ],
})

export default router