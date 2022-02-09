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
}