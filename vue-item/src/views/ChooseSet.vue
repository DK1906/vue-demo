<template>
  <div>
    <Header title="选座"></Header>
    <h3 style="margin-top:80px;">电影荧幕</h3>
    <ul class="allSet">
      <li v-for="(set,i) in setlist" :key="i" @click="arr.indexOf(i)!=-1?'':mySet($event,i)">{{i+1}}</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
      <li class="vip">vip</li>
    </ul>
    <div class="pay" @click="pay()">
      <span>{{money}}</span>元
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      flag: false,
      num: 0,
      setlist: 56,
      money: 0,
      count: 0,
      arr:[]
    };
  },
  components: {
    Header
  },
  methods: {
    mySet(e, i) {
      console.log(i);
      var nm = this.$route.params.nm;
      var cinema = this.$route.params.cinema;
      var time = this.$route.params.time;
    var iArr = [];
      if (this.num % 2 == 0) {
        //                     添加：节点.classList.add("类名")；
        // 删除：节点.classList.remove("类名")；

        e.target.classList.add("active");

      } else {
        e.target.classList.remove("active");
      }
       


      this.num++;
      var allMoney = document.getElementsByClassName("active");

      this.money = allMoney.length * this.$route.params.money;
      //  console.log( this.money)
      this.count = allMoney.length;
    },


      pay() {
         var nm = this.$route.params.nm;
      var cinema = this.$route.params.cinema;
      var time = this.$route.params.time;
  

            // //确认和取消座位
       var liList=document.getElementsByTagName("li")
    //    console.log(liList)
            for(var i=0;i<liList.length;i++){
                // console.log(liList[0].classList)
                if(liList[i].classList.value == "active"){
                    console.log(i)
          this.axios
            .post("/vue/comfirmSet", { nm, cinema, time, i ,  username: JSON.parse(sessionStorage.userInfo).username})
            .then(res => {
              console.log(res.data.type);

           
            });
        }
      }
                  



         console.log(this.count,this.money)
      this.axios
        .get("/vue/myOrders", {
          params: {
            username: JSON.parse(sessionStorage.userInfo).username,
            money: this.money,
            time: this.$route.params.time,
            nm: this.$route.params.nm,
            cinema: this.$route.params.cinema,
            count: this.count,
            timeMark: new Date()
          }
        })
        .then(res => {
          // this.money = res.data.result.money;
          // this.count= res.data.result.count
          console.log(res.data.result.money, res.data.result.count);
          // console.log(res.data.result.money)
          this.$router.push({ name: "myOrders", params: res.data.result });
        });
    
  }





  },
  
  mounted() {
    //    console.log(this.$route.params)
    var nm = this.$route.params.nm;
    var cinema = this.$route.params.cinema;
    var time = this.$route.params.time;
  
    this.axios
      .get("/vue/printRed", {
        params: {
          nm,
          cinema,
          time
        }
      })
      .then(res => {
        console.log(res.data.result);
        var result =res.data.result
        for(var j=0;j<result.length;j++){
             var liList=document.getElementsByTagName("li");
             for(var k= 0;k<liList.length;k++){
                 if(k==result[j].i){
                    liList[k].style.backgroundColor = 'red';
                  this.arr.push(k);
                 }
             }
        }
      });
  }
  }

</script>

<style  scoped>
ul.allSet {
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
h3 {
  border: 1px solid black;
}
li {
  width: 40px;
  height: 40px;
  border: 1px salmon solid;
  margin-bottom: 5px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
}
.active {
  background-color: green;
}
.pay {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: orangered;
  width: 100%;
  height: 50px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
}
.vip {
  background: red;
}
</style>