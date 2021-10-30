<template>
  <div id="app">
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      currency: 'TRY',
    }
  },
  methods: {
    changeCurrency(cur) {
      this.currency = cur
    },
  },

  computed: {
    isUSD() {
      return this.currency === 'USD'
    },
    isTRY() {
      return this.currency === 'TRY'
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
