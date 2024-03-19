import Main from "@/components/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/components/pages/PostPage.vue";
import About from "@/components/pages/About.vue";
import PostIdPage from "@/components/pages/PostIdPage.vue";
import PostPageWidthStore from "@/components/pages/PostPageWidthStore.vue";
import PostPageComposition from "@/components/pages/PostPageComposition.vue";

const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/posts",
        component: PostPage
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/posts/:id",
        component: PostIdPage
    },
    {
        path: "/store",
        component: PostPageWidthStore
    },
    {
        path: "/composition",
        component: PostPageComposition
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router