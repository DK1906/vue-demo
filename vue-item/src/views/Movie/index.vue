<template>
    <div id="main"> 
         <Header  title="新视界电影"></Header>
         <div id="content">
              <div class="movie-menu">
             <router-link tag="div" to="/movie/city" class="city-name">
                 <span>
                   {{ this.$store.state.cityInfo[1]}}<van-icon name="arrow-down" />
                 </span>
                 <span class="icon-pic"></span>
             </router-link >


             <div class="hot-switch">
                 <router-link  tag ="div" to="/movie/hotplaying"  class="hot-item ">
                     正在热映
                 </router-link>
                  <router-link  tag ="div" to="/movie/comingsoon" class="hot-item ">
                     即将上映
                 </router-link>
             </div>

            <router-link class="search-entry "   tag ="div" to="/movie/search">
              <span style="padding-top:3px;"> <van-icon name="search" /></span>
            </router-link>

             </div>
        <div  class="keep-list">
          
                 <router-view >

                 </router-view>
            
             </div>
         </div>
          <Footer></Footer>
    </div>
  
</template>




<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
    name:"Movie",
    components:{
        Header,
        Footer
    }
}
</script>

<style  scoped>
    #content{
        flex: 1;
        overflow: auto;
        margin-bottom: 50px;
        z-index:1000;
        /* position: relative; */
        
        display: flex;
        flex-direction: column;
    }
    #content .movie-menu{
         
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6ee;
         position: fixed;
           top: 50px;
        left: 0;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        /* margin-bottom: 50px; */
        
      
     
     
    }
   
    .movie-menu .city-name{
        /* margin-left: 20px; */
        height: 100%;
        line-height: 45px;
        
    }
    .movie-menu .city-name.active{
        color:#ef4238;
        border-bottom: 2px solid #ef4238;

    }
    .movie-menu .city-name.router-link-active{
        color:#ef4238;
        border-bottom: 2px solid #ef4238;

    }
    .movie-menu .hot-switch{
        display: flex;
        height: 100%;
        line-height: 45px;
    }
    .movie-menu .hot-item{
        font-size: 15px;
        color: #666;
        /* width: 80px; */
        text-align: center;
        margin: 0 12px ;
        font-weight: 700;
    }
     .movie-menu .hot-item.active{
            color:#ef4238;
        border-bottom: 2px solid #ef4238;
     }
      .movie-menu .hot-item.router-link-active{
            color:#ef4238;
        border-bottom: 2px solid #ef4238;
     }
     .movie-menu .search-entry{
         margin-right: 10px;
         height: 100%;line-height: 45px;
     }
      .movie-menu .search-entry.active{
              color:#ef4238;
        border-bottom: 2px solid #ef4238;
      }
       .movie-menu .search-entry.router-link-active{
              color:#ef4238;
        border-bottom: 2px solid #ef4238;
      }
        .movie-menu .search-entry i {
            font-size: 24px;
            color: red;
        }
        /* .keep-list{
            margin-top: 200px;
        } */
</style>