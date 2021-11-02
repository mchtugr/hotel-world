<template>
  <b-card class="bg-light">
    <b-form class="search-form">
      <h5 class="text-start">Guest {{ guestNo }}</h5>
      <!-- Name & Surname -->
      <b-row>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start">Name:</div>
          <b-form-input
            v-model="$v.guestForm.name.$model"
            type="text"
            placeholder="John"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.name.minLength"
          >
            * At least 3 letters
          </div>
        </b-col>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start">Surname:</div>

          <b-form-input
            v-model="$v.guestForm.surname.$model"
            type="text"
            placeholder="Doe"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.surname.minLength"
          >
            * At least 3 letters
          </div>
        </b-col>
      </b-row>
      <!-- Gender & Age -->
      <b-row>
        <b-col class="guest-form-input-container my-2">
          <div class="text-start">Age:</div>
          <b-form-input
            v-model="$v.guestForm.age.$model"
            placeholder="26"
            type="number"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.age.minValue"
          >
            * Minimum age is 12
          </div>
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.age.maxValue"
          >
            * Maximum age is 60
          </div>
        </b-col>
        <b-col class="guest-form-input-container my-2">
          <div class="text-start form-input">Gender:</div>
          <b-form-select
            v-model="$v.guestForm.gender.$model"
            :options="genderOptions"
            class="guest-form-select"
          />
        </b-col>
      </b-row>

      <!-- Email & Tel  -->
      <b-row>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start form-input">Email:</div>
          <b-form-input
            v-model="$v.guestForm.email.$model"
            placeholder="johndoe@mail.com"
            type="email"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.email.email"
          >
            * Please enter a valid email address
          </div>
        </b-col>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start form-input">Telephone:</div>
          <b-form-input
            v-model="$v.guestForm.tel.$model"
            placeholder="5554443322"
            type="number"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.tel.minLength"
          >
            * Minimum 10 digits
          </div>
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.tel.maxLength"
          >
            * Maximum ten digits
          </div>
        </b-col>
      </b-row>

      <!-- TC & HES Code -->
      <b-row>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start form-input">TC Identity No:</div>

          <b-form-input
            v-model="$v.guestForm.identityNum.$model"
            class="search-input"
            placeholder="17364523451"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.identityNum.checkIdentityNum"
          >
            * Please enter a valid Identity Num
          </div>
        </b-col>
        <b-col md="6" class="guest-form-input-container my-2">
          <div class="text-start form-input">HES Code:</div>

          <b-form-input
            v-model="$v.guestForm.hesCode.$model"
            placeholder="N1F4-3423-54"
            class="search-input"
          />
          <div
            class="text-start guest-form-error"
            v-if="!$v.guestForm.hesCode.checkHesCode"
          >
            * Please enter a valid HES CODE
          </div>
        </b-col>
      </b-row>
      <div class="d-flex justify-content-end">
        <span class="text-end save-btn" @click="saveGuestDetails">Save</span>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import validations from '../mixins/validators'

export default {
  name: 'GuestDetailForm',
  props: { guestNo: Number },
  data() {
    return {
      genderOptions: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
        { value: 'other', text: 'Other' },
      ],
    }
  },
  mixins: [validations],
  methods: {
    saveGuestDetails() {
      this.$v.guestForm.$touch()
      if (!this.$v.guestForm.$invalid) {
        console.log('good to go')
      }
    },
  },
}
</script>

<style>
.save-btn {
  background-color: #f25621;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-weight: 700;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #ca3b0d;
  border: none;
}

.save-btn:focus {
  background-color: #ca3b0d;
  border: none;
  outline: none;
}
.guest-form-input-container {
  position: relative;
}

.guest-form-select {
  height: 37px;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 3px;
  color: #212529;
  line-height: 1.5;
}

.guest-form-error {
  position: absolute;
  z-index: 22;
  border-radius: 5px;
  bottom: -18px;
  /* padding: 5px; */
  color: red;
  font-size: 12px;
  font-weight: 400;
}
</style>
