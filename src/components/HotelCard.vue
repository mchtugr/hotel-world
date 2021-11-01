<template>
  <div class="m-5 hotel-card">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <!-- hotel img -->
        <b-col md="4">
          <b-card-img
            :src="require(`@/assets/img/${data.images[0]}`)"
            :alt="data.name"
            class="rounded-0 hotel-card-img"
          ></b-card-img>
        </b-col>
        <!-- hotel card middle / info -->
        <b-col md="5">
          <b-card-body class="hotel-card-middle">
            <div class="hotel-card-top">
              <div class="d-flex">
                <div class="hotel-name text-start">
                  {{ data.name }}
                  <span
                    v-for="(star, i) in data.star"
                    :key="'fullstar' + i"
                    class="star"
                    ><i class="fas fa-star"></i
                  ></span>
                  <span
                    v-for="(star, i) in 5 - data.star"
                    :key="'emptystar' + i"
                    class="star"
                    ><i class="far fa-star"></i
                  ></span>
                </div>
              </div>
              <div class="text-start distance-text">
                {{ data.distance }} km from city centre, {{ city | capitalize }}
              </div>
            </div>
            <div class="hotel-card-bottom">
              <!-- PERKS -->
              <div class="perks">
                <div
                  v-for="(perk, i) in data.top_perks"
                  :key="i"
                  class="perks-item"
                >
                  <span v-html="perk.icon" />
                  <span v-html="perk.title" class="perk-title" />
                </div>
              </div>
              <!-- BOTTOM SCORE, REVIEW NUM -->
              <div class="bottom-detail">
                <div class="score-section mt-1">
                  <div class="score px-2 py-1">{{ data.rating }}</div>
                  <div class="reviews-section text-start mx-2">
                    <div class="review-sum">Fabulous</div>
                    <div class="review-num">
                      {{ data.reviews.length }} Total Reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-col>
        <!-- price info -->
        <b-col md="3">
          <div class="price-section">
            <div class="local-price">{{ localPrice }} {{ currency }}</div>
            <div class="price-info">per person per night</div>
            <div class="view-btn" @click="goHotelDetail">View</div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import filters from '../mixins/filters'

export default {
  name: 'HotelCard',
  props: {
    data: Object,
    city: String,
    currency: String,
  },

  methods: {
    goHotelDetail() {
      // send hotel id to parent
      this.$emit('goHotelDetail', this.data.id)
    },
  },
  mixins: [filters],
  computed: {
    localPrice: function () {
      if (this.currency === 'TRY') {
        return (this.data.price * 9.6).toFixed(2)
      } else {
        return this.data.price
      }
    },
  },
}
</script>

<style>
.hotel-card-img {
  height: 200px;
  object-fit: cover;
}

.hotel-card-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: middle;
}

.hotel-name {
  font-size: 20px;
  font-weight: 700;
}

.star {
  font-size: 14px;
  color: #ff9529;
}

.distance-text {
  text-align: left;
  font-size: 14px;
}

.hotel-card-bottom {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.perks {
  display: flex;
  font-size: 14px;
}

.perks-item {
  margin-right: 10px;
}

.perk-title {
  margin-left: 5px;
}

.score-section {
  display: inline-flex;
}

.score {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  background-color: #f25621;
  display: flex;

  align-items: center;
  border-radius: 3px;
}

.reviews-section {
  display: inline-block;
}

.bottom-detail {
  display: flex;
}

.review-sum {
  font-size: 16px;
  color: #f25621;
  font-weight: 900;
}

.review-num {
  font-size: 13px;
  color: #f25621;
  font-weight: 400;
}

.price-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 10px;
  height: 95%;
}

.local-price {
  font-weight: 600;
}

.price-info {
  font-size: 12px;
}

.view-btn {
  width: 95%;
  background-color: #f25621;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 6px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.view-btn:hover {
  background-color: #ca3b0d;
}
</style>
