<template>
  <div class="header-container">
    <b-container>
      <!-- Company Logo -->
      <b-nav small class="align-items-end justify-content-between mt-2">
        <div class="logo">HOTELWORLD</div>
        <!-- Currency Selection -->
        <b-nav-item>
          <span
            class="currency"
            :class="{ 'selected-currency': isUSD }"
            @click="changeCurrency('USD')"
            >USD</span
          >
          <span class="seperator">|</span>
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
  },
}
</script>

<style>
.logo {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  letter-spacing: 1px;
  color: #f25621;
  font-size: 34px;
  font-weight: 900;
  text-align: left;
}

.currency {
  font-size: 16px;
  color: #ebebeb;
}

.selected-currency {
  color: #f25621;
}

.seperator {
  margin: 0 5px 0 5px;
  font-size: 16px;
}
.header-container {
  border-bottom: 1px solid #ebebeb;
}
</style>
