<template>
    <div class="ticketList">
       
             <Header title="影院"></Header>
     
    
      <div class="ticket-head">

        <h3 class="cinema-nm">{{this.$route.params.nm}}</h3>
    
     
        <h3 class="addr">
             <van-icon name="location-o" color="blue" size=18px />{{this.$route.params.addr}} </h3>
      </div>
      <div>
          <!-- <van-swipe :autoplay="3000" width=200 height=200>
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img :src='image' />
  </van-swipe-item>
</van-swipe> -->
<van-swipe :autoplay="2000"  class="swipe-head">
  <van-swipe-item  class="show-swipe"><img src="@/assets/images/first.jpg" alt=""></van-swipe-item>
   <van-swipe-item   class="show-swipe"><img src="@/assets/images/second.jpg" alt=""></van-swipe-item>
    <van-swipe-item   class="show-swipe"><img src="@/assets/images/tir.jpg" alt=""></van-swipe-item>
     <van-swipe-item  class="show-swipe" ><img src="@/assets/images/fouth.jpg" alt=""></van-swipe-item>
      <van-swipe-item  class="show-swipe" ><img src="@/assets/images/fifth.jpg" alt=""></van-swipe-item>
  
</van-swipe>

      </div>

  
     <div class="intro">
         <p class="cname">中文名：{{this.$store.state.detailMovie.nm}}</p>
            <p> 英文名：{{this.$store.state.detailMovie.enm}}</p>
        <p class="small-p">类型：{{this.$store.state.detailMovie.cat}}</p>
         <p class="small-p">导演：{{this.$store.state.detailMovie.dir}}</p>
          <p class="small-p">主演：{{this.$store.state.detailMovie.star}}</p>
           
     </div>
     <div class="tickets">
         <ul>
             <li>
                 
                     <span class="time">10:00</span>
                
                   
                   <router-link :to="{name:'chooseSet',params:{time:'10:00',money:'39',nm:this.$store.state.detailMovie.nm,cinema:this.$route.params.nm}}">  <span class="buy"  >购票</span></router-link>
                     <span class="money">39元</span>
                
                   
                
             </li>
              <li>
                 
                     <span class="time"  >12:00</span>
                
                   <router-link :to="{name:'chooseSet',params:{time:'12:00',money:'39',nm:this.$store.state.detailMovie.nm,cinema:this.$route.params.nm}}">  <span class="buy"  >购票</span></router-link>
                     <span class="money">39元</span>
                
                   
                     
                
             </li>
              <li>
                 
                     <span class="time"  >16:00</span>
                
                    <router-link :to="{name:'chooseSet',params:{time:'16:00',money:'39',nm:this.$store.state.detailMovie.nm,cinema:this.$route.params.nm}}">  <span class="buy"  >购票</span></router-link>
                   
                     <span class="money">39元</span>
                
                   
                
             </li>
              <li>
                 
                     <span class="time"  time="18:00">18:00</span>
                
                  <router-link :to="{name:'chooseSet',params:{time:'18:00',money:'39',nm:this.$store.state.detailMovie.nm,cinema:this.$route.params.nm}}">  <span class="buy"  >购票</span></router-link>
                     <span class="money">39元</span>
                
                  
                     
                
             </li>
             </ul>
     </div>
     <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer"

export default {
    name:'ticketList',
    data(){
        return {
    
        }
    },
   
    mounted(){
        console.log(this.$route.params.movieId)
          this.axios.get('/api/detailMovie?movieId='+this.$route.params.movieId).then(res=>{
//  console.log(res.data.data.detailMovie.img)
              var detailMovie = res.data.data.detailMovie;
              this.$store.commit('getDetailMovie',detailMovie)
            })
    },
    components:{
        Header,
        Footer
    }

}
</script>



<style scoped>
    /* .ticketList{
       
    } */
    .swipe-head{
        padding-top: 5px;
        z-index: -10;
    }
    .ticketList{
        margin-top: 50px;
        margin-bottom: 80px;
    }
   .ticket-head{
       text-align: left;
   }
   .ticket-head .cinema-nm{
     margin: 0;
     padding-top: 10px;
     padding-left: 10px;
   }
    .ticket-head .addr{
        margin: 0;
        padding-top: 10px;
        padding-left: 10px;
        font-size:14px;
    }
   
    .intro{
        font-weight: bold;
        /* background-color: darkorange; */
         text-align: left;
    }
    .intro p{
        margin: 0;
        margin-bottom: 5px;
    }
    .intro .small-p{
        color:darkgrey;
        font-size: 12px;
    }
     .intro .cname{
         font-size: 20px;
     }
    .tickets ul li {
        padding: 20px;
        background-color: cornsilk;
        border: 1px solid orange;
        margin-bottom: 5px;
        border-radius: 5px;
    }
      .tickets ul li .buy{
          float: right;
          margin-left: 50px;
          padding: 5px;border-radius: 5px;
          border: 1px solid orange;
          color: orangered;

      }
    .tickets ul li .money{
        float: right;
         color: orangered;
    }
      .tickets ul li .time{
          font-weight: bold;
      }
      .show-swipe img{
          width: 100%;
          height: 200px;
      }
    

   
</style>