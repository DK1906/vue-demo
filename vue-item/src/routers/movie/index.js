export default {
    path : "/movie",
    name:"movie",
    component:()=>import("@/views/Movie"),
    children:[
        {
            path:"city",
            name:"city",
            component:()=>import("@/components/City")
        },
        {
            path:"hotplaying",
            name:"hotplaying",
            component:()=>import("@/components/Hotplaying"),
            // children:[
            //     {
            //         path:'detail/:movieId?',
            //         name:"detail",
            //         component:()=>import("@/components/Detail"),

            // }
            // ]
        },
        {
            path:"comingsoon",
            name:"comingsoon",

            component:()=>import("@/components/Comingsoon")
        },
        {
            path:"search",
            name:"search",

            component:()=>import("@/components/Search")
        },
        {
            path:"/movie",
           redirect:"/movie/hotplaying"
        }
    ]
}