<template>
  <div class="movie-body" ref="movie-body">
    <ul v-if="flag">
      <li v-for="(movie,i) in this.$store.state.movieList" :key="i">
        <div @click="toDetail(movie.id)">
          <div class="pic-show" style="float:left">
            <img :src="movie.img | setWH('128.180')" alt />
          </div>
          <div class="info-list" style="float:left">
            <h2>{{ movie.nm}}</h2>
            <p>
              观众评
              <span class="grade">{{ movie.sc}}</span>
              <span style="margin-left:50px;" class="grade">{{ movie.version}}</span>
            </p>
            <p>主演：{{ movie.star}}</p>
            <p>{{ movie.showInfo}}</p>
          </div>
        </div>
        <div class="btn-mall" ref="buyTicket" @click="buyTicket(movie.id)">购票</div>
      </li>
    </ul>
    <!-- <Detail v-if="flag2"></Detail> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Detail from "@/components/Detail";
// import BetterScroll from "better-scroll"
export default {
  name: "Hotplaying",
  components: {
    Detail
  },
  data() {
    return {
      // movieList:[]
      flag: true,
      flag2: false
    };
  },
  mounted() {
    var cityId = this.$store.state.cityInfo[0];
    this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
      if (res.data.msg === "ok") {
        var movieList = res.data.data.movieList;
        console.log(movieList);
        this.$store.commit("getMovieList", movieList);
      }
    });
  },
  methods: {
    buyTicket(movieId) {
      this.$router.push({ name: "cinema", params: { movieId: movieId } });
    },

    toDetail(movieId) {
      //     // console.log(11111)
      //     // this.axios.get('/api/detailMovie?movieId=345808').then(res=>{
      //         // console.log(res)
      this.$router.push({ name: "detail", params: { movieId: movieId } });
      console.log(movieId);
      this.flag = false;
      this.flag2 = true;

      //     // })
    }
  }
};
</script>

<style  scoped>
#content .movie-body {
  text-align: left;
  margin-top: 100px;
  flex: 1;
  overflow: auto;
}
.movie-body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie-body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
}
.movie-body .pic-show {
  margin-right: 10px;
  width: 64px;
  height: 90px;
}
.movie-body .pic-show img {
  width: 100%;
  padding-top: 20px;
}
.movie-body .infi-list {
  /* margin-right: 100px; */
  margin-left: 10px;
  flex: 1;
  /* position: relative; */
}
.movie-body .info-list h2 {
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie-body .info-list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie-body .info-list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie-body .info-list img {
  width: 50px;
  float: left;
  /* position: absolute;
    right: 10px;
    top: 5px; */
}
.movie-body .btn-mall {
  margin-left: 30px;
}
.movie-body .btn-mall,
.movie-body .btn-pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background: #f03d37;
  color: beige;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie-body .btn-pre {
  background-color: #3c9fe6;
}
</style>
