<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import headerMixin from '../mixins/headerMixin'

export default {
  name: 'PaymentDetail',
  components: {
    Header,
  },
  mixins: [headerMixin],
}
</script>

<style scoped></style>
