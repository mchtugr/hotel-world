<template>
  <div class="search-box">
    <h1>Meet the World</h1>
    <p class="search-description">
      36,000 properties, 178 countries • Over 13 million verified guest reviews
      • 24/7 customer service
    </p>
    <b-container>
      <b-form>
        <div class="search-form">
          <b-row>
            <b-col xs="12">
              <div class="input-container">
                <b-form-input
                  v-model="city"
                  placeholder="Where do you want to go?"
                  class="search-input city-input"
                ></b-form-input>
                <i class="fas fa-search" style="color: #f25621"></i>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" sm="6" xs="6">
              <b-form-group>
                <label class="search-label">CHECK IN</label>
                <b-form-input
                  v-model="inDate"
                  type="date"
                  class="search-input"
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="6" xs="6">
              <b-form-group>
                <label class="search-label">CHECK OUT</label>
                <b-form-input
                  v-model="outDate"
                  type="date"
                  class="search-input"
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="12" xs="12">
              <b-form-group>
                <label class="search-label">GUESTS</label>
                <div class="input-container">
                  <b-form-select
                    v-model="guestNum"
                    :options="selectOptions"
                    class="search-input search-select"
                  />
                  <i class="fas fa-user-friends" style="color: #f25621"></i>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </b-form>

      <b-button class="search-btn">Let's go!</b-button>
    </b-container>
  </div>
</template>

<script>
const currentDate = new Date().getTime()
export default {
  name: 'SearchBox',
  data() {
    return {
      guestNum: 1,
      currentDate: new Date().getTime(),
      inDate: new Date().toISOString().split('T')[0],
      outDate: new Date(currentDate + 86400000).toISOString().split('T')[0],
      city: '',
      selectOptions: [
        { value: 1, text: '1 Guest' },
        { value: 2, text: '2 Guests' },
        { value: 3, text: '3 Guests' },
        { value: 4, text: '4 Guests' },
        { value: 5, text: '5 Guests' },
        { value: 6, text: '6 Guests' },
      ],
    }
  },
}
</script>

<style scoped>
h1 {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 72px;
  color: #fff;
}

.search-box {
  margin: 50px auto 0;
}

.search-description {
  color: #fff;
}
.search-form {
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: left;
}

.search-input {
  line-height: 40px;
  border-radius: 5px;
}

.city-input {
  padding-left: 50px;
}

.search-select {
  width: 100%;
  height: 55px;
  padding: 8px;
  padding-left: 50px;
}

.search-label {
  color: #fff;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
}

.input-container {
  position: relative;
}

.search-btn {
  background-color: #f25621;
  border: none;
  padding: 15px 25px;
  margin-top: 30px;
  font-weight: 700;
}

.search-btn:hover {
  background-color: #ca3b0d;
  border: none;
}

.search-btn:focus {
  background-color: #ca3b0d;
  border: none;
  outline: none;
}

.fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
}

.fa-user-friends {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
