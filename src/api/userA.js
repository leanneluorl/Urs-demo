import axios from 'axios';
import cookie from 'vue-cookies'

const userApiURL = "http://localhost:4000/api/UrKitchen/user"

export default {
    getUser: (params) => {
        const userID = params.userID
        return axios({
            url: `${userApiURL}/${userID}`,
            method: 'get'
        })
    },
    getUserStockIGD: (params) => {
        const userID = params.userID
        return axios({
            url: `${userApiURL}/${userID}/StockIGD`,
            method: 'get'
        })
    },
    updateUserInfo: (data) => {
        const userID = cookie.get('user-id')
        return axios({
            url: `${userApiURL}/${userID}`,
            method: 'put',
            data
        })
    },
    createUserStockIGD: (data) => {
        const userID = cookie.get('user-id')
        return axios({
            url: `${userApiURL}/StockIGD/Create/${userID}`,
            method: 'post',
            data
        })
    },
    updateUserStockIGD: (SDID, data) => {
        console.log("data", data)
        return axios({
            url: `${userApiURL}/SDID/${SDID}`,
            method: 'put',
            data
        })
    },
    deleteUserStockIGD: (SDID) => {
        return axios({
            url: `${userApiURL}/stockIGD/${SDID}`,
            method: 'delete'
        })
    },
}