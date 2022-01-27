import Vue from 'vue'
import Vuex from 'vuex'
import Recipe from './recipe'
import User from './user'
// import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        news: [
            {
                date: "2021/09/22",
                title: "16條自行車多元路線遊程推廣及販售",
                content: "",
                image: "'./../img/index_news01.jpg'"
            },
            {
                date: "2021/09/22",
                title: "最美伸展台 芝蘭公園海上觀景平台啟用",
                content: "",
                image: "./../img/index_news02.jpg"
            },
        ],
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        Recipe: Recipe,
        User: User,
    }
})


export default store