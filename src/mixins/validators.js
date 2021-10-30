import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      city: 'Ankara',
    }
  },
  validations: {
    city: {
      required,
      minLength: minLength(3),
    },
  },
}
