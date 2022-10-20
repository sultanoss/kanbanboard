import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyLogin from "./components/MyLogin.vue"
import MainPage from "./components/MainPage.vue";
import MySummary from "./components/MySummary.vue"
import MyBoard from "./components/MyBoard.vue"
import AddTask from "./components/AddTask.vue"
import MyContacts from "./components/MyContacts.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', component: MyLogin },
        { path: '/main', component: MainPage,
        children:[
            { path: "summary", component: MySummary },
            { path: "board", component: MyBoard },
            { path: "addtask", component: AddTask },
            { path: "contacts", component: MyContacts },
        ] 
    },
        

    ],
    linkActiveClass: 'active' //change the default class name from router-link-active to active
});

const app = createApp(App);

app.use(router);
app.mount('#app');
