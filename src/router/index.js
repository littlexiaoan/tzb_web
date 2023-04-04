import VueRouter from "vue-router";
import First from "@/views/first/First";
import Second from "@/views/second/Second";
import Third from "@/views/third/Third";
import Fourth from "@/views/fourth/Fourth";
import Fifth from "@/views/fifth/Fifth";

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "first",
            component: First
        },
        {
            path: "/second",
            name: "second",
            component: Second
        },
        {
            path: "/third",
            name: "third",
            component: Third
        },
        {
            path: "/fourth",
            name: "fourth",
            component: Fourth
        },
        {
            path: "/fifth",
            name: "fifth",
            component: Fifth
        },
    ]
})
