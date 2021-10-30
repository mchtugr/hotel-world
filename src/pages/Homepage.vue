<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import headerMixin from '../mixins/headerMixin'
export default {
  name: 'Homepage',
  components: {
    Header,
  },
  ...headerMixin,
}
</script>

<style scoped>
div {
  background-image: url(https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1600/v1584631386/hw/homepage/hero_images/beach_yoga_desktop.jpg);
  width: 100vw;
  min-height: 100vh;
  box-shadow: inset 0 0 150px 2px #282a2d;
}
</style>
