import {
  required,
  minLength,
  minValue,
  maxValue,
  email,
  maxLength,
} from 'vuelidate/lib/validators'

const checkIdentityNum = (value) => {
  if (!value) return true
  value = String(value)
  let isEleven = /^[0-9]{11}$/.test(value)
  let totalX = 0
  for (let i = 0; i < 10; i++) {
    totalX += Number(value.substr(i, 1))
  }
  let isRuleX = totalX % 10 == value.substr(10, 1)
  let totalY1 = 0
  let totalY2 = 0
  for (var i = 0; i < 10; i += 2) {
    totalY1 += Number(value.substr(i, 1))
  }
  for (let i = 1; i < 10; i += 2) {
    totalY2 += Number(value.substr(i, 1))
  }
  let isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0)
  return isEleven && isRuleX && isRuleY
}

const checkHesCode = (value) => {
  if (!value) return true
  const regex =
    /^[A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]-[A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]-[A-Z0-9][A-Z0-9]$/g

  return regex.test(value)
}

export default {
  data() {
    return {
      city: 'Ankara',
      guestForm: {
        name: null,
        surname: null,
        gender: 'male',
        age: null,
        email: null,
        tel: null,
        identityNum: null,
        hesCode: null,
      },
    }
  },
  validations: {
    city: {
      required,
      minLength: minLength(3),
    },
    guestForm: {
      name: {
        required,
        minLength: minLength(3),
      },
      surname: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        minValue: minValue(12),
        maxValue: maxValue(60),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      },
      tel: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      identityNum: {
        required,
        checkIdentityNum,
      },
      hesCode: {
        required,
        checkHesCode,
      },
    },
  },
}
