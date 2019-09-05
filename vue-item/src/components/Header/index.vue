<template>
  <div>
    <h1 id="header">{{ title }}</h1>
    <div
      class="btn"
      @click="goBack"
      v-if="this.$route.name=='mine'|| this.$route.name=='myOrders'|| this.$route.name=='chooseSet'|| this.$route.name=='detail'|| this.$route.name=='ticketList'|| this.$route.name=='myComment'?true:false"
    >返回</div>
    <div class="btn" @click="goIndex" v-if="this.$route.name=='mine'?true:false">{{btnTitle}}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      tppe: String,
      default: "新视界电影"
    },
    btnTitle: {
      tppe: String,
      default: "返回首页"
    }
  },
  methods: {
    goIndex() {
      this.$router.push({ name: "hotplaying" });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    // console.log(this.$route)
  }
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: rgb(101, 101, 190);
  border-bottom: 1px solid #e54847;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
}
/* #header {
       
    } */
.btn {
  /* width: 50px; */
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  position: fixed;
  left: 5px;
  top: 10px;
  background-color: coral;
  border-radius: 3px;
}
</style>