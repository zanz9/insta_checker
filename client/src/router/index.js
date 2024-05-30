import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SchoolBoyView from "@/views/SchoolBoyView.vue";
import SchoolBoyListView from "@/views/SchoolBoyListView.vue";
import AddSchoolBoyView from "@/views/AddSchoolBoyView.vue";
import AddClassView from "@/views/AddClassView.vue";
import AddGenderView from "@/views/AddGenderView.vue";
import AddParentView from "@/views/AddParentView.vue";
import AddSchoolView from "@/views/AddSchoolView.vue";
import AddTeacherView from "@/views/AddTeacherView.vue";

export class RouterNames {
    static Home = 'Home'
    static Login = 'Login'
    static Register = 'Register'
    static SchoolBoyList = 'SchoolBoyList'
    static SchoolBoy = 'SchoolBoy'
    static AddSchoolBoy = 'AddSchoolBoy'
    static AddClass = 'AddClass'
    static AddGender = 'AddGender'
    static AddParent = 'AddParent'
    static AddSchool = 'AddSchool'
    static AddTeacher = 'AddTeacher'
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
                    initialRoute: true,
                    name: RouterNames.SchoolBoyList,
                    component: SchoolBoyListView
                },
                {
                    path: '/schoolBoy/:id',
                    name: RouterNames.SchoolBoy,
                    component: SchoolBoyView
                },
                {
                    path: '/addSchoolBoy',
                    name: RouterNames.AddSchoolBoy,
                    component: AddSchoolBoyView
                },
                {
                    path: '/addClass',
                    name: RouterNames.AddClass,
                    component: AddClassView
                },
                {
                    path: '/addGender',
                    name: RouterNames.AddGender,
                    component: AddGenderView
                },
                {
                    path: '/addParent',
                    name: RouterNames.AddParent,
                    component: AddParentView
                },
                {
                    path: '/addSchool',
                    name: RouterNames.AddSchool,
                    component: AddSchoolView
                },
                {
                    path: '/addTeacher',
                    name: RouterNames.AddTeacher,
                    component: AddTeacherView
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
