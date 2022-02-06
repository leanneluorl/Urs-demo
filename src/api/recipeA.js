import axios from 'axios';

const recipeApiURL = "http://localhost:8080/api/UrKitchen/Recipe"
const adminApiURL = "http://localhost:8080/api/UrKitchen/admin"

export default {
    getRecipes: (params) => {
        const keyword = params.keyword
        const order = params.order
        const sort = params.sort
        return axios({
            url: `${recipeApiURL}/${keyword}/${order}/${sort}`,
            method: 'get'
        })
    },

    getTable: (params) => {
        const table = params.table
        const keyword = params.keyword
        return axios({
            url: `${adminApiURL}/${table}/${keyword}`,
            method: 'get'
        })
    },

    getIngredient: (params) => {
        const table = params.table
        const keyword = params.keyword
        const order = params.order
        return axios({
            url: `${adminApiURL}/${table}/${keyword}/${order}`,
            method: 'get'
        })
    },

    searchRecipebyIGD: (data) => {
        return axios({
            url: `${recipeApiURL}/SearchRCPbyIGD`,
            method: 'post',
            data
        })
    },
    getRecipeContent: (params) => {
        const recipeID = params.recipeID
        return axios({
            url: `${recipeApiURL}/${recipeID}`,
            method: 'get'
        })
    },
    getRecipeIngredient: (params) => {
        const recipeID = params.recipeID
        return axios({
            url: `${recipeApiURL}/${recipeID}/IGD`,
            method: 'get'
        })
    },
    getRecipeInstru: (params) => {
        const recipeID = params.recipeID
        return axios({
            url: `${recipeApiURL}/${recipeID}/Instru`,
            method: 'get'
        })
    },
}