import user from '../api/userA'
import cookie from 'vue-cookies'
// import router from '../router'

const User = {
    namespaced: true,
    state: () => ({
        userID: cookie.get('user-id') || '',
        response: {},
        error: {},
        user: cookie.get('user-data') || '',
        loginPOP: false,
        userIngredientStock: {}
        
    }),
    mutations: {
        setUserID:  (state, userID) => {
            state.userID = userID;
        },
        setUser: (state, user) => {
            state.user = user;
        },
        setloginPOP: (state, loginPOP) => {
            state.loginPOP = loginPOP;
        },
        setUserIngredientStock: (state, userIngredientStock) => {
            state.userIngredientStock = userIngredientStock;
        }
    },
    actions: {
        login: ({ commit }, params) => {
            return user.getRecipes(params).then(res => {
                console.log("Login",res)
                console.log("UserID",res.data.UserID)
                if(!res.data.UserID || params.password !== res.data.UserPWD){
                    console.log("ERROR")
                    return {
                        status: "failed",
                        msg: "Login Failed"
                    }   
                }else if(params.password === res.data.UserPWD){
                    cookie.set('user-id', res.data.UserID)
                    cookie.set('user-data', res.data)
                    commit('setUser', res.data)  
                    commit('setUserID', res.data.UserID)  
                    commit('setloginPOP', false)  
                    alert("Login success!")
                }
                return res.data
            })
        },
        getLoginPOP: ({ commit }, status) => {
            commit('setloginPOP', status)  
        },
        logout: ({ commit }) => {
            cookie.remove('user-data')
            cookie.remove('user-id')
            commit('setUser', '')  
            commit('setUserID', '')  
        },
        getUserStockIGD: ({ commit }, params) => {
            return user.getUserStockIGD(params).then(res => {
                commit('setUserIngredientStock', res.data)  
                return res.data
            })
        },
        // updateUserInfo: ({ commit }, params) => {
        //     return user.updateUserInfo(params).then(res => {
        //         cookie.remove('user-data')
        //         cookie.set('user-data', res.data)
        //         commit('setUser', res.data)
        //         console.log(res)  
        //         alert("User Info Updated!")
        //         return res.data
        //     })
        // },
        updateUserInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                user.updateUserInfo(data).then(res => {
                    resolve(res);
                    cookie.remove('user-data')
                    cookie.set('user-data', res.data)
                    commit('setUser', res.data)
                    console.log(res)  
                    alert("User Info Updated!")
                    return res.data
                }).catch(err => {
                    if (err.response.status == 400) {
                        reject(err);
                    }
                })
            });

        },
    },
    getters: {
        // recipesGetter: (state) => {
        //     return state.recipes || {}
        // },
    }
}

export default User