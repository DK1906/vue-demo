<template>
  <div class="cinema_body">
    <ul>
      <li
        v-for="(cinema,i) in this.$store.state.cinemaList"
        :key="i"
        @click="gotoCinema(cinema.nm,cinema.addr)"
      >
        <div>
          <span>{{ cinema.nm}}</span>
          <span class="q">
            <span class="price">{{ cinema.sellPrice}}</span>元起
          </span>
        </div>

        <div class="address">
          <span class="addr">{{ cinema.addr}}</span>
          <span>{{ cinema.distance}}</span>
        </div>
        <div class="card">
          <div v-if="cinema.tag.allowRefund">可改签</div>
          <div v-if="cinema.tag.endorse">可退票</div>
          <div v-if="cinema.tag.snack">小吃</div>
          <div v-if="cinema.tag.vipTag">折扣卡</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  data() {
    return {
      // cinemaList:[]
    };
  },
  comments: {},
  mounted() {
    var cityId = this.$store.state.cityInfo[0];
    this.axios.get("/api/cinemaList?cityId=" + cityId).then(res => {
      console.log(res);
      if (res.data.msg === "ok") {
        var cinemaList = res.data.data.cinemas;
        // console.log(  this.cinemaList)
        this.$store.commit("getCinemaList", cinemaList);
      }
    });
  },
  methods: {
    gotoCinema(nm, addr) {
      console.log(this.$route.params.movieId);
      if (this.$route.params.movieId) {
        this.$router.push({
          name: "ticketList",
          params: { movieId: this.$route.params.movieId, nm: nm, addr: addr }
        });
      } else {
        this.$router.push({ name: "hotplaying" });
      }
      // console.log(0000)
    }
  }
};
</script>

<style scoped>
#content .cinema_body {
  text-align: left;
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
#content .cinema_body .q {
  /* text-align: right !important; */
  float: right;
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address .addr {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px #f90 solid;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  columns: #589daf;
  border: 1px solid #589daf;
}
</style>