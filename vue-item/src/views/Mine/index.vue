


<template >
  <div class="fir">
    <Header title="个人中心" btnTitle='返回首页' :show="true">2321312</Header>
 
    <div v-if="isLogin" class="personal" >
         <Uploadavatar class="userimg"  > </Uploadavatar >
         <div class="name"><p >{{this.$store.state.username}}</p><p class="exit" @click='clearSession'>退出登录</p></div>       
    </div>
    
    <div v-else style="margin-top:200px;">
      <van-button @click="gotoLogin" type="primary" class="gotoLogin">请先登录</van-button>
    </div>
      
         <div class="myShop" @click='gotomyOrder' v-if="isLogin">
        <span >我的订单</span><p>全部订单》</p>
    </div>
     
         <div class="myComment"  @click='gotomyComment' v-if="isLogin">
        <span >我的评价</span><p>全部评价》</p>
    </div>
     
    


    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Uploadavatar from "@/components/Uploadavatar"
export default {
  data() {
    return {
      isLogin: false,
    //   username:'',
 
    
     
    
    };
  },
    components:{
        Uploadavatar,
          Footer,
          Header
    },
    watch:{
       
    
    },
  methods: {
    gotoLogin(){
  this.$router.push({ name: "login"});
    },
    gotomyComment(){
      // console.log(222) 
  this.$router.push({name:"myComment"})
    },
    gotomyOrder(){
     this.$router.push({name:"myOrders"})
      
    },
    // gotoLogin() {
    //   this.$router.push({ name: "login" });
    // },
    clearSession(){
     sessionStorage.userInfo=''
          this.$router.push({ name: "login"});
        // this.$router.replace({ path: '/login' })
  
    }
  },
  computed:{
    

  },
  
  mounted(){
      // console.log( JSON.parse(sessionStorage.userInfo).username)
      //  console.log('sss')
       if(sessionStorage.userInfo){
              // console.log(sessionStorage.userInfo)
            this.isLogin = JSON.parse(sessionStorage.userInfo).token;
            var username = JSON.parse(sessionStorage.userInfo).username;
            this.$store.commit('getUsername',username)
        } 

        // this.axios.get("/vue/mock/data").then(res=>{

        // })
  },


}
</script>

<style  scoped>
.fir{
  background-color: #c3c5c1;
  overflow: hidden;
  height: 600px;
}
.personal{
    margin-top: 55px;
    overflow: hidden;
    background-color: #eee;
    margin-bottom: 10px;

}
.userimg{
    /* width: 100px;height: 100px;
    background-color:aqua; */
        float: left;
     
}
.name{
    float: left;
  margin-left: 20px;
  font-weight: bold;
  margin-bottom: 10px;
     /* color: azure; */
    /* text-align:left; */
}
.name .exit{
     opacity: 0.6;
}
 .myComment,.myDiscount,.myShop{
    padding: 10px;
    height: 40px;
    line-height: 40px;
  border:1px solid #786789;
    background-color:#eee;
    border-radius: 5px;
    font-weight: bold;
}

.myShop span{
    float: left;
    vertical-align: middle;
}
.myShop p{
    float:right;
    margin: 0;
    opacity: 0.7;
}
.myComment span{
    float: left;
    vertical-align: middle;
}
.myComment p{
    float:right;
    margin: 0;
    opacity: 0.7;
}
.myDiscount span{
    float: left;
    vertical-align: middle;
}
.myDiscount p{
    float:right;
    margin: 0;
    opacity: 0.7;
}
.gotoLogin{
    margin-top: 50px;
}

</style>