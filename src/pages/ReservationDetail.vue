<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
    <b-container>
      <b-row>
        <!-- Guest Form list -->
        <b-col lg="8">
          <div
            v-for="guestNo in Number(this.$route.query.guestNum)"
            :key="guestNo"
            class="my-3"
          >
            <GuestDetailForm :guestNo="guestNo" />
          </div>
        </b-col>
        <b-col lg="4" class="bg-light mt-3">
          <!-- summary -->
          <div class="my-selection">Summary</div>
          <b-card>
            <div class="d-flex justify-content-between bottom-border">
              <p class="text-start">
                <!-- stay summary -->
                <i class="far fa-calendar-alt"></i>
                <span class="mx-1">{{ this.$route.query.inDate }},</span>
                <span>{{ totalNights }}</span>
              </p>
              <p>{{ totalGuests }}</p>
            </div>
            <b-card-body class="border-bottom">
              <div>
                <!-- price summary -->
                <div class="text-start bold mb-1">{{ totalGuests }}</div>
                <div class="d-flex justify-content-between">
                  <p class="small-text">
                    <span>{{ pricePerNight }} {{ currency }}</span>
                    <span class="mx-1">x</span>
                    <span>{{ totalNights }}</span>
                  </p>
                  <p class="small-text">
                    <span class="mx-1">{{
                      pricePerNight * this.$route.query.totalDays
                    }}</span>
                    <span>{{ currency }}</span>
                  </p>
                </div>
              </div>
              <div class="text-success text-start">Free Cancellation</div>
            </b-card-body>
            <!-- total price for whole stay -->
            <div class="text-start d-flex justify-content-between mt-3">
              <span>TOTAL:</span>
              <span
                >{{ pricePerNight * this.$route.query.totalDays }}
                {{ currency }}</span
              >
            </div>
          </b-card>
          <!-- payment modal -->
          <div>
            <div class="mt-3">
              <button class="pay-btn" v-b-modal.modal-multi-1>
                Proceed to Checkout
              </button>

              <b-modal
                id="modal-multi-1"
                size="lg"
                title="Vue Bank"
                hide-footer
                no-stacking
              >
                <!-- card details section -->
                <b-container>
                  <h3 class="text-center">
                    Total {{ pricePerNight * this.$route.query.totalDays }}
                    {{ currency }}
                  </h3>
                  <b-col lg="8" class="m-auto">
                    <b-form class="p-3">
                      <div class="my-2 card-input-container">
                        <div>Cardholder Name</div>
                        <b-form-input
                          v-model="$v.creditCard.fullName.$model"
                          type="text"
                          placeholder="John Doe"
                        />
                        <div
                          v-if="!$v.creditCard.fullName.minLength"
                          class="card-form-error"
                        >
                          Name is too short
                        </div>
                      </div>
                      <div class="my-2 card-input-container">
                        <div>Card Number</div>
                        <b-form-input
                          v-model="$v.creditCard.cardNumber.$model"
                          type="text"
                          placeholder="4321345223457643"
                        />
                        <div
                          v-if="!$v.creditCard.cardNumber.minLength"
                          class="card-form-error"
                        >
                          Card number must be 16 digits
                        </div>
                        <div
                          v-if="!$v.creditCard.cardNumber.maxLength"
                          class="card-form-error"
                        >
                          Card number must be 16 digits
                        </div>
                      </div>

                      <b-row class="my-2">
                        <b-col class="card-input-container">
                          <div>Expiry Date</div>
                          <b-form-input
                            v-model="$v.creditCard.expiryDate.$model"
                            type="text"
                            placeholder="12/24"
                          />
                          <div
                            v-if="!$v.creditCard.expiryDate.checkExpiryDate"
                            class="card-form-error"
                          >
                            Please enter a valid expiry date
                          </div>
                        </b-col>
                        <b-col class="card-input-container">
                          <div>CVV</div>
                          <b-form-input
                            v-model="$v.creditCard.cvvNumber.$model"
                            type="text"
                            placeholder="832"
                          />
                          <div
                            v-if="!$v.creditCard.cvvNumber.minLength"
                            class="card-form-error"
                          >
                            CVV number must be 3 digits
                          </div>
                          <div
                            v-if="!$v.creditCard.cvvNumber.maxLength"
                            class="card-form-error"
                          >
                            CVV number must be 3 digits
                          </div>
                        </b-col>
                      </b-row>
                    </b-form>
                  </b-col>
                </b-container>
                <div class="d-flex justify-center">
                  <button
                    v-b-modal.modal-multi-2
                    class="pay-btn"
                    :disabled="isPaymentDisabled"
                  >
                    Pay Now
                  </button>
                </div>
              </b-modal>
              <!-- Payment Success Section -->
              <b-modal id="modal-multi-2" title="Success" hide-footer>
                <h2 class="my-2 text-success text-center">
                  Payment Successfull !
                </h2>
                <p class="text-center">
                  {{ pricePerNight * this.$route.query.totalDays }}
                  {{ currency }} deducted from your account
                </p>
              </b-modal>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import GuestDetailForm from '../components/GuestDetailForm.vue'
import headerMixin from '../mixins/headerMixin'
import validations from '../mixins/validators'
import hotels from '../assets/data.json'

export default {
  name: 'ReservationDetail',
  components: {
    Header,
    GuestDetailForm,
  },
  data() {
    return {
      hotelDetail: hotels.find(
        (hotel) => hotel.id === this.$route.query.hotelId
      ),
    }
  },
  mixins: [headerMixin, validations],
  computed: {
    isPaymentDisabled() {
      this.$v.creditCard.$touch()
      return this.$v.creditCard.$invalid
    },
    localPrice: function () {
      if (this.currency === 'TRY') {
        return (this.hotelDetail.price * 9.6).toFixed(2)
      } else {
        return this.hotelDetail.price
      }
    },
    totalNights: function () {
      if (this.$route.query.totalDays === '1') {
        return this.$route.query.totalDays + ' night'
      } else {
        return this.$route.query.totalDays + ' nights'
      }
    },
    totalGuests: function () {
      if (this.$route.query.guestNum === '1') {
        return this.$route.query.guestNum + ' guest'
      } else {
        return this.$route.query.guestNum + ' guests'
      }
    },
    pricePerPerson: function () {
      return (this.$route.query.guestNum * this.localPrice).toFixed(2)
    },
    pricePerNight: function () {
      return (this.$route.query.guestNum * this.localPrice).toFixed(2)
    },
  },
}
</script>

<style>
.credit-card-container {
  display: grid;
  height: 100px;
  align-items: center;
}
.credit-card {
  margin: 20px;
  background-color: #efefef;
  height: 200px;
  border-radius: 5px;
}

.pay-btn {
  background-color: #f25621;
  color: #fff;
  border: none;
  display: inline-block;
  margin: 0 auto;
  border-radius: 5px;
  padding: 5px 15px;
  font-weight: 700;
  cursor: pointer;
}

.pay-btn:hover {
  background-color: #ca3b0d;
  border: none;
}

.pay-btn:focus {
  background-color: #ca3b0d;
  border: none;
  outline: none;
}

.pay-btn:disabled {
  background-color: #ebebeb;
}

.card-input-container {
  position: relative;
}
.card-form-error {
  position: absolute;
  color: red;
  font-size: 10px;
  bottom: -15px;
}
</style>
