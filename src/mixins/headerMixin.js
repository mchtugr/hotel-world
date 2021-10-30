export default {
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
