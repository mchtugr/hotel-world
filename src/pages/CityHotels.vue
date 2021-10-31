<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
    <b-container>
      <!-- get router params and filter capitalize -->
      <h2 class="mt-3">Hotels in {{ $route.params.city | capitalize }}</h2>
      <HotelCard
        v-for="hotel in hotelData"
        :key="hotel.id"
        :data="hotel"
        :city="$route.params.city"
        :currency="currency"
        @goHotelDetail="goHotelDetail"
      />
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import HotelCard from '../components/HotelCard.vue'
import headerMixin from '../mixins/headerMixin'
import filters from '../mixins/filters'

import data from '../assets/data.json'
export default {
  name: 'CityHotels',
  components: {
    Header,
    HotelCard,
  },
  data() {
    return {
      hotelData: data,
    }
  },
  methods: {
    goHotelDetail(hotelId) {
      this.$router.push({ name: 'HotelDetail', params: { hotelId } })
    },
  },
  mixins: [headerMixin, filters],
}
</script>

<style></style>
