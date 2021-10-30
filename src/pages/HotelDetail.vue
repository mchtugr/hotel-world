<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import headerMixin from '../mixins/headerMixin'

export default {
  name: 'HotelDetail',
  components: {
    Header,
  },
  ...headerMixin,
}
</script>

<style scoped></style>
