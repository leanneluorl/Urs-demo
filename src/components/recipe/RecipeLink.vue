<template>
    <router-link class="recipe-link" 
        :to="{ name: 'RecipeContent', params: { recipeID: recipe.RecipeID}}">
        <h5 class="recepi-link-title">{{recipe.RecipeTitle}}</h5> 
        <div class="recipe-link-main-image-wrap" 
            :style="bgImg( `recipe-`+recipe.RecipeID+`-main.jpg`)">
            <!-- <img 
                @error="setAltImg"
                :src="getImgURL(recipe.RecipeID)" 
                :alt="recipe.recipeTitle" 
                class="recipe-link-main-image"
                > -->
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        recipe: {
            type: Object,
            default: null
        },
    },
    methods: {
        getImgURL(RecipeID) {
            let path = `@/img/recipe/recipe-${RecipeID}-main.jpg`;
            console.log(path, typeof(path))
            return path;//this.checkImg(path) ;
        },
        setAltImg(e) { 
            console.log('Image failed to load');
            e.target.src = require("@/img/test.jpg")
        } 
    }
};
</script>

<style lang="scss">
    .recipe-link {
        @media only screen and (max-width: 600px) {
            width: calc( (100vw - 210px) / 2 );
            height: calc( (100vw - 210px) / 2 );
        }
        border: 2px solid $primary-g-dark;
        border-radius: 1vw;
        width: 24%;
        margin: .5%;
        &-main-image-wrap{
            @extend .background-image;
            @include psuedo-height($height:85%);
        }
        h5 {
            color: $primary-g-dark;
            max-height: 3.6vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &-main-image-wrap {
            height: 80%;
            overflow: hidden;
        }
        img {
            width: 100%;
            min-height: 100%;
        }
    }
</style>