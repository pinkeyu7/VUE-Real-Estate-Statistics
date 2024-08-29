import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HousePriceView from '../views/HousePriceView.vue'
import CarPriceView from '../views/CarPriceView.vue'
import TotalPriceView from '../views/TotalPriceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/house-price',
      name: 'house_price',
      component: HousePriceView
    },
    {
      path: '/car-price',
      name: 'car_price',
      component: CarPriceView
    },
    {
      path: '/total-price',
      name: 'total_price',
      component: TotalPriceView
    }
  ]
})

export default router
