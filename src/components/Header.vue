<template>
  <div class="header-container">
    <b-container>
      <!-- Company Logo -->
      <b-nav small class="align-items-center justify-content-between mt-2">
        <div class="logo" @click="goHome">HOTELWORLD</div>
        <!-- Currency Selection -->
        <b-nav-item>
          <span
            class="currency"
            :class="{ 'selected-currency': isUSD }"
            @click="changeCurrency('USD')"
            >USD</span
          >
          <span
            class="currency"
            :class="{ 'selected-currency': isTRY }"
            @click="changeCurrency('TRY')"
            >TRY</span
          >
        </b-nav-item>
      </b-nav>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isUSD: Boolean,
    isTRY: Boolean,
  },
  methods: {
    changeCurrency(cur) {
      this.$emit('changeCurrency', cur)
    },
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style>
.nav {
  margin: 0;
  padding: 0;
}
.logo {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  letter-spacing: 1px;
  color: #f25621;
  font-size: 48px;
  font-weight: 900;
  text-align: left;
  cursor: pointer;
}

.currency {
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-weight: 600;
  color: #777;
  margin: 5px;
  padding: 7px;
  border-radius: 5px;
}

.selected-currency {
  color: #f25621;
}

.header-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
}
</style>
