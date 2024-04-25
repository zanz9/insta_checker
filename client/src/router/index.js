import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SchoolBoyView from "@/views/SchoolBoyView.vue";
import SchoolBoyListView from "@/views/SchoolBoyListView.vue";

export class RouterNames {
    static Home = 'Home'
    static Login = 'Login'
    static Register = 'Register'
    static SchoolBoyList = 'SchoolBoyList'
    static SchoolBoy = 'SchoolBoy'
}

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: RouterNames.Home,
            component: HomeView,
            children: [
                {
                    path: '',
                    name: RouterNames.SchoolBoyList,
                    component: SchoolBoyListView
                },
                {
                    path: '/schoolBoy/:id',
                    name: RouterNames.SchoolBoy,
                    component: SchoolBoyView
                }
            ]
        },
        {
            path: '/login',
            name: RouterNames.Login,
            component: LoginView
        },
        {
            path: '/register',
            name: RouterNames.Register,
            component: RegisterView
        }
    ]
})

router.beforeResolve(async (to, from, next) => {
    let isNotLogin = !localStorage.getItem('accessToken');
    if ((isNotLogin && to.name !== RouterNames.Login) && (isNotLogin && to.name !== RouterNames.Register)) {
        next({name: RouterNames.Login})
    } else {
        next()
    }
})

export default router
