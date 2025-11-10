import { createRouter, createWebHistory} from "vue-router";
import Http from "./components/Http.vue";
import Api from "./components/Api.vue";

const routes =[

    {path: '/', component: Api},  


    {path: '/http', component: Http},
    {path: '/api', component: Api},


    {path: '/:pathmatch(.*)*', component: Http}, /* se puede hacer un componente de error */
]

const router = createRouter({
    history: createWebHistory(), 
    routes: routes 
})

export default router;