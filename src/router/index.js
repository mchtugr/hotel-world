import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import HotelDetail from '../pages/HotelDetail.vue'
import ReservationDetail from '../pages/ReservationDetail.vue'
import CityHotels from '../pages/CityHotels.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/:city',
    name: 'CityHotels',
    component: CityHotels,
    props: true,
  },
  {
    path: '/:city/hotel/:hotelId',
    name: 'HotelDetail',
    component: HotelDetail,
    props: true,
  },
  {
    path: '/:city/hotel/:hotelId/reservation',
    name: 'ReservationDetail',
    component: ReservationDetail,
  },

  // {
  //   path: '/payment/:paymentId/success',
  //   name: 'PaymentSuccess',
  //   component: PaymentSuccess,
  // },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
