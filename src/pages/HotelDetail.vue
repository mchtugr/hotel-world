<template>
  <div class="mb-5">
    <Header @changeCurrency="changeCurrency" :isUSD="isUSD" :isTRY="isTRY" />
    <b-container>
      <b-row>
        <b-col md="8" class="mt-3">
          <div class="my-selection">
            {{ hotelDetail.name }} in {{ $route.query.city | capitalize }}
          </div>
          <b-card>
            <b-row>
              <b-col>
                <!-- IMAGE CAROUSEL -->
                <div>
                  <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                  >
                    <!-- Text slides with image -->
                    <b-carousel-slide
                      v-for="(image, i) in hotelDetail.images"
                      :key="i"
                      :text="i + 1 + '/' + hotelDetail.images.length"
                      :img-src="require(`@/assets/img/${image}`)"
                      class="carousel-img"
                    ></b-carousel-slide>
                  </b-carousel>
                </div>
              </b-col>
            </b-row>
            <!-- FACILITIES -->
            <b-row class="mt-3">
              <h5 class="text-start">Top Facilities</h5>
              <div class="facility-container">
                <div
                  v-for="(facility, i) in hotelDetail.facilities"
                  :key="i"
                  class="facility-item"
                >
                  <span v-html="facility.icon" class="facility-icon" />
                  <span class="facility-title">{{ facility.title }}</span>
                </div>
              </div>
            </b-row>
            <!-- TABS -->
            <b-row class="mt-3">
              <b-col>
                <b-tabs content-class="mt-3">
                  <!-- DETAIL -->
                  <b-tab title="About" active>
                    <div
                      class="text-start m-1"
                      v-for="(detail, i) in hotelDetail.description"
                      :key="i"
                    >
                      {{ detail }}
                    </div>
                  </b-tab>
                  <!-- REVIEWS -->
                  <b-tab title="Reviews">
                    <b-row
                      v-for="(comment, i) in hotelDetail.reviews"
                      :key="i"
                      class="my-4 text-start"
                    >
                      <b-col sm="1">
                        <img :src="imgUrl" :alt="name" class="comment-img" />
                      </b-col>
                      <b-col sm="2">{{ name }}</b-col>
                      <b-col sm="9">{{ comment }}</b-col>
                    </b-row>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <!-- Summary -->
        <b-col md="4" class="mt-3">
          <div class="my-selection">My Selection</div>
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
          <div class="book-now">BOOK NOW</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import headerMixin from '../mixins/headerMixin'
import filters from '../mixins/filters'
import hotels from '../assets/data.json'

export default {
  name: 'HotelDetail',
  components: {
    Header,
  },
  data() {
    return {
      // get hotel from id
      hotelDetail: hotels.find(
        (hotel) => hotel.id === this.$route.query.hotelId
      ),
      name: this.$faker().name.findName(),
      imgUrl: this.$faker().image.avatar(),
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
  },
  mixins: [headerMixin, filters],
  computed: {
    localPrice: function () {
      if (this.currency === 'TRY') {
        return (this.hotelDetail.price * 9.6).toFixed(2)
      } else {
        return this.hotelDetail.price
      }
    },
    totalNights: function () {
      if (this.$route.params.totalDays === 1) {
        return this.$route.query.totalDays + ' night'
      } else {
        return this.$route.query.totalDays + ' nights'
      }
    },
    totalGuests: function () {
      if (this.$route.query.guestNum === 1) {
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
.my-selection {
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
}

.in-date {
  margin-left: 5px;
}

.bold {
  font-weight: bold;
}

.small-text {
  font-size: 14px;
}

.bottom-border {
  border-bottom: 1px solid #ebebeb;
}

.book-now {
  width: 100%;
  background-color: #f25621;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.carousel-img {
  height: 350px;
  object-fit: cover;
}

.facility-container {
  display: flex;
  flex-wrap: wrap;
}

.facility-item {
  margin-right: 10px;
}

.facility-icon {
  margin-right: 5px;
  color: #00dfce;
}

.comment-img {
  width: 50px;
  height: 50px;
  border-radius: 100px;
}
</style>
