export default {
  filters: {
    // capitalize more than one space seperated words
    capitalize(val) {
      return val
        .split(' ')
        .map((item) => item[0].toUpperCase() + item.slice(1))
        .join(' ')
    },
  },
}
