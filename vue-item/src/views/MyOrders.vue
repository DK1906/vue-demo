<template>
  <div>
    <div class="allTime" v-if="show" @click="changeTime3">
      <p style="margin-top:100px;" @click="changeTime('10:00')">10:00</p>
      <p @click="changeTime('12:00')">12:00</p>
      <p @click="changeTime('16:00')">16:00</p>
      <p @click="changeTime('18:00')">18:00</p>
    </div>
    <Header title="我的订单"></Header>
    <ul
      v-for="(info,i) in this.$store.state.ticketsInfoList"
      :key="i"
      style="margin-bottom:80px;margin-top:50px;"
    >
      <li class="ticketInfo">
        <p>{{info.username}}</p>
        <p>《{{info.nm}}》</p>
        <p>影院：{{info.cinema}}</p>

        <p>
          <span>{{info.count}}张</span>
        </p>
         <p>座位：{{info.i}}</p>
        <p>
          开场时间：
          <span>{{info.time}}</span>
        </p>
        <p>
          原价：
          <del>{{info.money}}</del> 元
        </p>
        <p>折后价：{{(info.money)*0.9}}</p>

        <span class="change" @click="changeTime2(info.time,info.cinema,info.nm,info.timeMark)">改签</span>
        <span
          class="return"
          @click="noTicket($event,info.time,info.cinema,info.nm,i,info.timeMark)"
        >退票</span>
        <span class="returned">已退票</span>
      </li>
    </ul>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// import { Dialog } from 'vant';
export default {
  data() {
    return {
      // flag:true,
      oldTime: "",
      //  newTime:"",
      cinema: "",
      nm: "",
      timeMark: "",
      show: false
      // time:this.$route.params.time,
    };
  },
  watch: {
    //  ticketsInfoList:{
    //  }
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    console.log( this.$store.state.ticketsInfoList)
    this.axios
      .get("/vue/getInfo", {
        params: { username: JSON.parse(sessionStorage.userInfo).username }
      })
      .then(res => {
        console.log(res.data.result);
        var ticketsInfoList = res.data.result;
        this.$store.commit("ticketsInfoList", ticketsInfoList);
      });
  },
  methods: {
    changeTime3() {
      this.show = !this.show;
    },
    changeTime2(time, cinema, nm, timeMark) {
      // var a = e.target. getAttrbute('data-time')
      // console.log(a)
      // console.log(time)
      this.timeMark = timeMark;
      this.oldTime = time;
      this.nm = nm;
      this.cinema = cinema;
      this.show = !this.show;
    },
    changeTime(newTime) {
      //  console.log(this.oldTime)
      //  console.log(newTime,JSON.parse(sessionStorage.userInfo).username,this.nm,this.cinema)
      this.axios
        .get("/vue/changeTime", {
          params: {
            newTime: newTime,
            oldTime: this.oldTime,
            username: JSON.parse(sessionStorage.userInfo).username,
            nm: this.nm,
            cinema: this.cinema,
            timeMark: this.timeMark
          }
        })
        .then(res => {
          // console.log( res.data.result)
          if (res.data.result.ok) {
            this.axios
              .get("/vue/getInfonew", {
                params: {
                  username: JSON.parse(sessionStorage.userInfo).username
                }
              })
              .then(res => {
                //  console.log( res.data.result)
                // this.ticketsInfoList = res.data.result;
                var ticketsInfoList = res.data.result;
                this.$store.commit("ticketsInfoList", ticketsInfoList);
              });
          }
        });
    },
    noTicket(e, time, cinema, nm, i, timeMark) {
      this.oldTime = time;
      this.cinema = cinema;
      this.nm = nm;
      this.timeMark = timeMark;
      this.axios
        .get("/vue/noTicket", {
          params: {
            time: this.oldTime,
            username: JSON.parse(sessionStorage.userInfo).username,
            nm: this.nm,
            cinema: this.cinema,
            timeMark: this.timeMark
          }
        })
        .then(res => {
          // this.show = !this.show;
          //  console.log(res.data.result)
          if (res.data.result.deletedCount) {
            e.target.parentNode.style.backgroundColor = "darkgrey";
            document.getElementsByClassName("change")[i].style.display = "none";
            e.target.style.display = "none";
            document.getElementsByClassName("returned")[i].style.display =
              "block";

            //  e.target.nextSibling.style.display = 'block';
          }
        });
    }
  }
};
</script>

<style scoped>
.ticketInfo {
  text-align: left;
  font-weight: bold;
  background-color: rgb(243, 250, 250);

  /* overflow: hidden; */
  height: 221px;
  /* margin-top: 50px; */
  border-bottom: 1px dashed grey;
  border-top: 1px dashed grey;
}
.ticketInfo p {
  margin-top: 0;
  margin-bottom: 5px;
}
.change {
  background-color: coral;
  padding: 5px;
  border-radius: 3px;
  float: left;
}
.return {
  background-color: coral;
  padding: 5px;
  border-radius: 3px;
  float: right;
}
.allTime {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(110, 110, 110, 0.6);
}
.allTime p {
  background-color: darkorange;
  padding: 20px;
}
.xs {
  display: none;
}
.returned {
  background-color: coral;
  padding: 5px;
  border-radius: 3px;
  float: right;
  display: none;
}
</style>