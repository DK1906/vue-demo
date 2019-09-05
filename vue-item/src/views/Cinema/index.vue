<template>
    <div class="cinemaList"> 
         <Header title="新视界电影"></Header>
     
         <div id="content">
              
    <div class="fixed">
                        <van-notice-bar
  text="欢乐过暑假,看电影就送小吃,还有更多优惠折扣等着你！"
  speed=100 
  left-icon="volume-o"
  class="scorll"
  
/>
    </div>
     
            
              <CinemaList></CinemaList>
         </div>
        
          <Footer></Footer>
          </div>
</template>
<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CinemaList from "@/components/CinemaList"
export default {
    name:"Cinema",
    components:{
        Header,
        Footer,
        CinemaList
    },
    mounted(){
        console.log(this.$route.params.movieId)
    }
}
</script>


<style scoped>

.cinemaList{
    margin-top: 50px;
     position: relative;
}
.fixed{
     position: relative;
    z-index:-100;
    background-color: beige;
}
/* .scorll{
     position: fixed;
} */
</style>