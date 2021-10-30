<template>
  <div class="homepage">
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
    <SearchBox />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import SearchBox from '../components/SearchBox.vue'
import headerMixin from '../mixins/headerMixin'

export default {
  name: 'Homepage',
  components: {
    Header,
    SearchBox,
  },
  ...headerMixin,
}
</script>

<style>
.homepage {
  background-image: url(https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1600/v1584631386/hw/homepage/hero_images/beach_yoga_desktop.jpg);
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100vw;
  background-size: cover;
  min-height: 100vh;
  filter: grayscale(10%);
  box-shadow: inset 0 0 150px 2px #282a2d;
}
</style>
