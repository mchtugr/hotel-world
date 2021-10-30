import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import HotelDetail from '../pages/HotelDetail.vue'
import PaymentDetail from '../pages/PaymentDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/payment/:paymentId',
    name: 'PaymentDetail',
    component: PaymentDetail,
  },
  {
    path: '/:city/:hotelId',
    name: 'HotelDetail',
    component: HotelDetail,
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
