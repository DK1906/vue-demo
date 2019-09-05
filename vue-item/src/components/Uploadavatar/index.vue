<template>
    <div id="photo">
        <img :src="touxiang" alt="上传头像" @click="uploadImg" class="touxiang">
        <input type="file" @change="shangchuan" ref="upload" accept="image/*" class="hiddenInput">
    </div>
</template>

<script>
export default {
    data(){
        return {
            touxiang:""
        }
    },
    methods:{
        uploadImg(){
            this.$refs.upload.click();
        },
        shangchuan(){
            // console.log("shangchuan...")
            let file = this.$refs.upload.files[0];
          
             // 表单  Form    name 
             let data = new FormData(); //新建表单对象
             data.append("avatar",file);

             this.axios.post("/vue/uploadAvatar",data).then(res=>{
                   console.log(res.data)
                 

                //  this.touxiang = res.data.pic.replace(/public/,'');   // 配置代理 

                 this.touxiang = res.data.pic.replace(/public/,"http://123.56.106.124:1906");
                // localStorage.avatar = this.touxiang;

             })
                // processData: false,//默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            // contentType: false,//数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。data:formData,
        }
    },
    mounted(){
         // if(localStorage.avatar){
        //     this.touxiang = localStorage.avatar;
        // }else{
        //     // 使用默认 
        //     this.touxiang = require("@/assets/images/photo.png");
        // }
        let username = "";
        if(sessionStorage.userInfo){
            username = JSON.parse(sessionStorage.userInfo).username;

        }
        if(username){
            this.axios.post("/vue/getAvatar",{
                username
            }).then(res=>{
                if(!!res.data.type){
                    this.touxiang = res.data.avatar.replace(/public/,"http://123.56.106.124:1906")
                    console.log(this.touxiang);
                }else{
                    this.touxiang = require('@/assets/images/img4.jpg');
                }
            })
        }else{
            this.touxiang = require('@/assets/images/img4.jpg');
        }
    }
}
</script>


<style scoped>
.touxiang{
  width: 100px;
  height: 100px;
    border-radius: 50%;
}
.hiddenInput{
    display: none;
}
</style>
