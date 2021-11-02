<template>
  <div>
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
    <b-container>
      <b-row>
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
          <div class="my-selection">Summary</div>
          <b-card>
            <div class="d-flex justify-content-between bottom-border">
              <p class="text-start">
                <i class="far fa-calendar-alt"></i>
                <span class="mx-1">{{ this.$route.query.inDate }},</span>
                <span>{{ totalNights }}</span>
              </p>
              <p>{{ totalGuests }}</p>
            </div>
            <b-card-body class="border-bottom">
              <div>
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
            <div class="text-start d-flex justify-content-between mt-3">
              <span>TOTAL:</span>
              <span
                >{{ pricePerNight * this.$route.query.totalDays }}
                {{ currency }}</span
              >
            </div>
          </b-card>
          <div>
            <b-button v-b-modal.modal-1 class="book-now">PAY NOW</b-button>

            <b-modal id="modal-1" title="BootstrapVue">
              <p class="my-4">Hello from modal!</p>
            </b-modal>
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
  mixins: [headerMixin],

  computed: {
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

<style scoped></style>
