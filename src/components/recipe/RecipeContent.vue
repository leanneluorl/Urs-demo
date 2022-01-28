<template>
    <section class="recipe" v-if="isFetch"> 
        <h1 class="section-title main recipe_title">
            {{ recipeInfo.RecipeTitle }}
        </h1>
        <div class="recipe-main-image" 
            :style="bgImg( `recipe-`+recipeID+`-main.jpg`)">
        </div>
        <div class="recipe_info">
            <div class="recipe_info-item _part1">
                <p class="recipe_info-item_part1-title">
                    Serving For
                </p>
                    <span>{{recipeInfo.PerServeing_For}}</span>
            </div>
            <div class="recipe_info-item _part1">
                <p class="recipe_info-item_part1-title">
                    Cooking Time
                </p>
                <span>{{recipeInfo.CookingTime}}</span>
            </div>
            <div class="recipe_info-item _part2">
                <p class="p-w50"> Diet Type: {{recipeInfo.DietTypeID}}</p>
                <p class="p-w50">Cuisine: {{recipeInfo.CuisineID}}</p>
                <p class="p-w100">{{recipeInfo.RecipeInfo}}</p>
                <p class="p-w50">View Times: {{recipeInfo.ViewTimes}}</p>
                <p class="p-w50">Create Date: {{recipeInfo.CreateDate}}</p>
            </div>
        </div>
        <div class="recipe_igd">
            <h3 class="recipe_igd_title">Ingredient</h3> 
            <div class="recipe_igd_foodtype"
                :v-for="(item, key, index) in recipeIGD"
                :key="key">
                <h6 class="recipe_igd_foodtype-title">
                    {{ key }} {{item}}
                </h6>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data: () => {
        return {
            recipeContent: {},
            recipeInfo: {},
            recipeIGD: {},
            isFetch: false
            //recipeID: async function(){await this.$route.params.recipeID}
        }
    },
    created: async function(){
        this.recipeID =  await this.$route.params.recipeID
        this.recipeContent =  await this.getRecipeContent({
            recipeID: this.$route.params.recipeID
        })
        .then( (res) => {
            this.recipeInfo = res[0][0]
            this.recipeIGD = this.groupBy(res[1], "FoodType")
            this.isFetch = true
        })
        console.log("recipeID",this.$route.params.recipeID);
        console.log("this.recipeInfo", this.recipeInfo);
        console.log("this.recipeIGD", this.recipeIGD);
    },
    computed: {
        
    },
    watch: {
        recipeContent: {
            handler: function(arr) {
                console.log("watch", arr)
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .recipe {
        width: calc( 100% - 220px);
        &-main-image {
            width: 100%;
            height: 300px;
            @extend .background-image;
            border-radius: 1.5vw;
        }
        &_info {
            &-item {
                &._part1 {
                    background-color: $primary-g-extra-light;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                border-radius: 1.5vw;
                min-height: 8rem;
                float: left;
                width: 50%;
                @extend .flex;
                
                &_part1-title {
                    margin-bottom: 0.5rem;
                }
                span{
                    display: block;
                    font-size: 5rem;
                    line-height: 4rem;
                }

                &._part2 {
                    flex-direction: row;
                    width: 100%;
                    border-radius: 1.5vw;
                    padding: 1vw 4vw;
                    background-color: $primary-g-extra;
                    p{
                        font-size: 0.5rem;
                        text-align: justify;
                        &:nth-of-type(2), &:nth-of-type(5){
                            text-align: right;
                        }
                        &.p-w50{
                            width: 50%;
                            font-weight: 700;
                        }
                        &.p-w100{
                            width: 100%;
                        }
                    }
                }
            }
            
            
        }
        &_igd {
            h3 {
                color: $primary-g-dark;
                line-height: 4rem;
            }
        }
    }
</style>