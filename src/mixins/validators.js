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

const checkExpiryDate = (value) => {
  if (!value) return true
  const month = value.slice(0, 2)
  const slash = value.slice(2, 3)
  const year = value.slice(3)
  // if month or year not a number do not validate
  if (isNaN(Number(month)) || isNaN(Number(year))) {
    return false
  }
  // month should be between 1 and 12
  if (Number(month) > 12 || Number(month) < 1) {
    return false
  }
  // '/' should be between month and year
  if (slash !== '/') {
    return false
  }
  // year should be between 2021 and 2030
  if (Number(year) < 21 || Number(year) > 30) {
    return false
  }
  // if all conditions met, validate
  return true
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
      creditCard: {
        fullName: null,
        cardNumber: null,
        expiryDate: null,
        cvvNumber: null,
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
    creditCard: {
      fullName: {
        required,
        minLength: minLength(3),
      },
      creditCard: {
        required,
        minLength: minLength(16),
        maxLength: maxLength(16),
      },
      expiryDate: {
        required,
        checkExpiryDate,
      },
      cvvNumber: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3),
      },
    },
  },
}
