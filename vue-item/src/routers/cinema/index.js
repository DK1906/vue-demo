export default {
    path : "/cinema/:movieId?/",
    name:"cinema",
    component:()=>import("@/views/Cinema")
}