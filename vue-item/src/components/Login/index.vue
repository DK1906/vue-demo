<template>
  <div>
    <Head title="登录/注册" :show="true"></Head>
    <van-tabs v-model="active" class="login-box">
      <van-tab title="登录">
        <van-cell-group>
          <van-field
          class="login-van"
            v-model="login.keys"
            required
            clearable
            label="账号"
            placeholder="请输入用户名/手机号"
          />
          <van-field

            v-model="login.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-button class="login-btn" @click="todoLogin" type="danger" size="large">马上登录</van-button>
        </van-cell-group>
      </van-tab>
      <van-tab title="注册">
        <van-cell-group>
             
          <van-field
            v-model="register.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
              
            @click-right-icon="$toast('请输入4位长度的用户名')"
          />
             <span class="register-span"  v-show='!((/^[0-9,a-z,A-Z]{4}$/).test(register.username))'>请输入4位长度的用户名</span>

         
          <van-field
            v-model="register.mobile"
            required
            clearable
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            right-icon="question-o"
           
            @click-right-icon="$toast('请输入11位长度的手机号')"
          />
           <span class="register-span" v-show='!((/^1(3|4|5|6|7|8|9)\d{9}$/).test(register.mobile))'>请输入11位长度的手机号</span>
          <van-field
            v-model="register.password"
            type="password"
            label="密码"
            placeholder="请输密码"
            required
            right-icon="question-o"
          
            @click-right-icon="$toast('请输入6-12位长度的密码')
             
"         />
           <span class="register-span"  v-show='!((/^[0-9,a-z,A-Z]{6,12}$/).test(register.password))'>请输入6-12位长度的密码</span>
          <van-field
            v-model="register.dbpwd"
            type="password"
            required
            clearable
            label="确认密码"
            placeholder="请输入确认密码"
          />
           <span class="register-span" v-show='register.dbpwd==register.password?false:true'>密码不一致</span>
          <van-button class="register-btn" @click="todoRegister" type="primary" size="large">立即注册</van-button>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import { setTimeout } from 'timers';
export default {
    
  data() {
    return {
 
      active:1,
      register:{
          username:"",
           mobile:"",
            password:"",
             dbpwd:"",
              
             
      },
     
      login:{

      }
    };
  },
  computed:{   
        
      
  },
  methods:{
      todoLogin(){
         console.log(this.login)
        this.axios.post("/vue/login",this.login).then(res=>{
             
          if(!!res.data.type){
            sessionStorage.userInfo = JSON.stringify({
              token:res.data.token,
          
              username:this.login.keys
            });
            // setTimeout(()=>{
              this.$router.push({name:"mine"});
            // },600);
          }else{
            sessionStorage.userInfo=JSON.stringify({
              token:""
            })
          }
        })
      },
       todoRegister(){
          if((/^[0-9,a-z,A-Z]{4}$/).test(this.register.username)&&(/^1(3|4|5|6|7|8|9)\d{9}$/).test(this.register.mobile)&&(/^[0-9,a-z,A-Z]{6,12}$/).test(this.register.password)&&this.register.dbpwd==this.register.password)
{
   this.axios.post("/vue/register",this.register).then(res=>{
                if(!!res.data.type){
                    this.active = 0;

                }else{
                    console.log("注册失败")
                }
                this.register = {};
            })
}else{
   console.log("注册失败")
}
           
        }
     
  }
}
</script>



<style scoped>
.login-box{
    margin-top: 100px;
    width:100%;
    padding:10px;
    box-sizing: border-box;
}

.login-box .register-span{
    font-size: 12px;
    color:red;
}
.register-btn{
    margin-top: 50px;
}
.login-btn{
    margin-top: 150px;
}
.login-van{
    margin-bottom: 50px;
}
</style>