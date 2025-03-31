import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/components/page-user-pedidos/HomeView.vue'
import admin from "@/components/page-admin/editar-pedidos/editPedidos.vue";
import LoginAdmin from "@/components/page-admin/login/login-admin.vue";
import campanhas from "@/components/page-user-campanhas/campanhas.vue"
import layout from "@/components/page-admin/dashboard/DashboardAdmin.vue";
import editCampanhas from "@/components/page-admin/editar-campanhas/editCampanhas.vue"
import muralCampanha from "@/components/page-mural-campanha/muralCampanha.vue"
import headerPage from "@/components/cabecalho-pages/headerPage.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/oracoes',
            name: 'oracoes',
            component: () => import('@/components/page-mural-oracoes/oracoes.vue')
        },

        {
            path: '/layout',
            name: 'layout',
            component: admin,

        },
        {
            path: '/login-admin',
            name: 'login-admin',
            component: LoginAdmin

        },
        {
            path: '/campanhas',
            name: 'campanhas',
            component: campanhas

        },
        {
            path: '/admin',
            name: 'admin',
            component: layout,

        },
        {
            path: '/editCampanhas',
            name: 'editCampanhas',
            component: editCampanhas,

        },
        {
            path: '/muralCampanha',
            name: 'muralCampanha',
            component: muralCampanha,

        },
        {
            path: '/headerPage',
            name: 'headerPage',
            component: headerPage,

        }
    ]
})

export default router
