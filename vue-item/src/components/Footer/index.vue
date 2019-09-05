<template>
    <footer id="footer">
        <ul>
             <!-- <router-link tag="li" :to="{path:'/city'}">
            <van-icon name="video-o" />
                <p>
                    城市
                </p>
            </router-link > -->
            <router-link tag="li" :to="{path:'/movie'}">
            <van-icon name="video-o" />
                <p>
                    电影
                </p>
            </router-link >
             <router-link tag="li"  :to="{name:'cinema'}">
                  <van-icon name="shop-collect-o" />
                <p>
                    影院
                </p>
            </router-link >
             <router-link tag="li"   :to="{name:'mine'}">
                  <van-icon name="manager-o" />
                <p>
                    我的
                </p>
            </router-link >
        </ul>
    </footer>
</template>

<script>
export default {
    name:"footrer"
}
</script>

<style  scoped>
   #footer{
       width: 100%;
       height: 50px;
       background: white;
       border-top:2px solid #ebe8e3;
       position: fixed;
       left: 0;bottom: 0;
   }
   #footer ul{
       display: flex;
       text-align: center;
       height: 50px;align-items: center;

   }
   #footer ul li {
       flex: 1;
       height: 40px;
   }
     #footer ul li.active{
         color:#f03d37;
     }

       #footer ul li.router-link-active{
         color:#f03d37;
     }

     #footer ul li i{
         font-size: 20px;
     }
       #footer ul li p{
           font-size: 12px;
           line-height: 18px;
           margin: 0;
           }
</style>