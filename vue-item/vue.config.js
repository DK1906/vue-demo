


// vue/cli 相关配置文件  脚手架  

module.exports = {
    publicPath:"",  // 设置项目的公共路径 打包上线 ,

    devServer:{ 
        host:"0.0.0.0",
        port:7000,
        open:true,   // 自动打开浏览器 
        proxy:{    //  代理 
            "/vue": {
                target:"http://123.56.106.124:1906",
                changeOrigin: true,
            },
            "/avatar": {
                target:"http://123.56.106.124:1906",
                changeOrigin: true,
            },
            "/api":{
                target:"http://39.97.33.178",
                changeOrigin: true,
            }
        }  
    },
}