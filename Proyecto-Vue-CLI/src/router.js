import { createRouter, createWebHistory} from "vue-router";
import Api from "./components/Api.vue";

const routes =[

    {path: '/', component: Api},  
    {path: '/api', component: Api},

    {path: '/:pathmatch(.*)*', component: Api}, /* se puede hacer un componente de error */
]

const router = createRouter({
    history: createWebHistory(), 
    routes: routes 
})

export default router;