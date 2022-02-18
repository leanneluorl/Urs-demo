import user from '../api/userA'
import cookie from 'vue-cookies'
import router from '../router'

const User = {
    namespaced: true,
    state: () => ({
        userID: cookie.get('user-id') || '',
        response: {},
        error: {},
        user: cookie.get('user-data') || '',
        loginPOP: false,
        userStockIGD: [],
        userEditorPOP: false
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
        setUserEditorPOP: (state, status) => {
            state.userEditorPOP = status;
        },
        setUserStockIGD: (state, userStockIGD) => {
            state.userStockIGD = userStockIGD;
        }
    },
    actions: {
        login: ({ commit }, params) => {
            return user.getUser(params).then(res => {
                if(!res.data.UserID || params.password !== res.data.UserPWD){
                    console.log("ERROR")
                    return {
                        status: "failed",
                        msg: "Login Failed"
                    }
                }else if(params.password === res.data.UserPWD){
                    cookie.set('user-id', res.data.UserID)
                    cookie.set('user-data', res.data)
                    user.getUserStockIGD(params).then(res => {
                        commit('setUserStockIGD', res.data)
                    })
                    commit('setUser', res.data)
                    commit('setUserID', res.data.UserID)
                    commit('setloginPOP', false)
                    alert("Login success!")
                    router.push(cookie.get('redirection'));
                }
                return res.data
            })
        },
        getLoginPOP: ({ commit }, status) => {
            commit('setloginPOP', status)
        },
        getUserEditorPOP: ({ commit }, status) => {
            commit('setUserEditorPOP', status)
        },
        logout: ({ commit }) => {
            cookie.remove('user-data')
            cookie.remove('user-id')
            commit('setUser', '')
            commit('setUserID', '')
        },
        getUserStockIGD: ({ commit }, params) => {
            return user.getUserStockIGD(params).then(res => {
                commit('setUserStockIGD', res.data)
                return res.data
            })
        },
        updateUserInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                user.updateUserInfo(data).then(res => {
                    resolve(res);
                    cookie.remove('user-data')
                    cookie.set('user-data', res.data)
                    commit('setUser', res.data)
                    commit('setUserEditorPOP', false)
                    alert("User Info Updated!")
                    return res.data
                }).catch(err => {
                    if (err.response.status == 400) {
                        reject(err);
                    }
                })
            });
        },
        createUserStockIGD({dispatch, state}, data) {
            console.log(" {SDID, data}", data)
            return new Promise((resolve, reject) => {
                user.createUserStockIGD(data).then(res => {
                    resolve(res);
                    dispatch('getUserStockIGD', {userID: state.userID})
                    alert("User Stock Created!")
                    return res.data
                }).catch(err => {
                    console.log(err)
                    if (err.response.status == 400) {
                        reject(err);
                    }
                })
            });
        },
        updateUserStockIGD({dispatch, state}, {SDID, data}) {
            console.log(" {SDID, data}",SDID)
            console.log(" {SDID, data}", data)
            return new Promise((resolve, reject) => {
                user.updateUserStockIGD(SDID, data).then(res => {
                    resolve(res);
                    dispatch('getUserStockIGD', {userID: state.userID})
                    alert("User Stock Updated!")
                    return res.data
                }).catch(err => {
                    if (err.response.status == 400) {
                        reject(err);
                    }
                })
            });
        },
        deleteUserStockIGD: ({ dispatch, state }, params) => {
            return user.deleteUserStockIGD(params).then(res => {
                dispatch('getUserStockIGD', {userID: state.userID})
                return res.data
            })
        },
    },
    getters: {
        userGetter: (state) => {
            return state.userID || ''
        },
        userIsLogin: (state) => {
            return state.userID.length
        },
    }
}

export default User