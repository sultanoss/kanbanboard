import { createApp } from "vue";
import App from "./App.vue";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
import SignUp from "./components/SignUp.vue";
import Help from "./components/Help.vue"

const firebaseConfig = {
    apiKey: "AIzaSyCWOZKferZ4TiSnQM-b3jvKBl-qTFm0o9w",
    authDomain: "kanban-board-de372.firebaseapp.com",
    databaseURL: "https://kanban-board-de372-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kanban-board-de372",
    storageBucket: "kanban-board-de372.appspot.com",
    messagingSenderId: "421175975051",
    appId: "1:421175975051:web:3c706d4fe117a11928c88e"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth, db };

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', component: MyLogin },
        {
            path: '/main', component: MainPage,
            children: [
                { path: "summary", component: MySummary },
                { path: "board", component: MyBoard },
                { path: "addtask", component: AddTask },
                { path: "contacts", component: MyContacts },
                { path: "help", component: Help },
            ]
        },
        { path: '/signup', component: SignUp },
    ],
    linkActiveClass: 'active' //change the default class name from router-link-active to active
});

const app = createApp(App);
app.use(router);
app.mount('#app');
