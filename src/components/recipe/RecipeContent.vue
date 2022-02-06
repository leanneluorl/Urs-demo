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
            <h3 class="recipe_igd_title recipe_subtitle">Ingredient</h3>
            <div class="recipe_igd_foodtype"
                v-for="(foodtype, key, index) in recipeIGD"
                :key="index">
                <h6 class="recipe_igd_foodtype-title">
                    {{key}}
                </h6>
                <div class="recipe_igd_foodtype_item_wrap"
                v-for="(item, index) in foodtype"
                :key="item.FoodType+'-'+index">
                <p class="recipe_igd_foodtype_item">{{item.IngredientID}}</p>
                <p class="recipe_igd_foodtype_item">{{item.Amount}}</p>
                <p class="recipe_igd_foodtype_item">{{item.Unit}}</p>
                </div>
            </div>
        </div>
        <div class="recipe_instru">
            <h3 class="recipe_instru_title recipe_subtitle">Instruction</h3>
            <div class="recipe_instru_wrap"
                v-for="Instru in recipeInstru"
                :key="'step-'+Instru.StepNo">
                <div class="recipe_instru-img"></div>
                <div class="recipe_instru-p_wrap">
                    <h2 class="recipe_instru-p-title">
                        Step {{Instru.StepNo}}
                    </h2>
                    <p class="recipe_instru-p_item">{{Instru.Instruction}}</p>
                </div>

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
            recipeInstru: {},
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
            this.recipeInstru = res[2]
            this.isFetch = true
        })
        console.log("recipeID",this.$route.params.recipeID);
        console.log("this.recipeInfo", this.recipeInfo);
        console.log("this.recipeIGD", this.recipeIGD);
        console.log("this.recipeInstru", this.recipeInstru);
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
        &_subtitle {
            color: $primary-g-dark;
            line-height: 4rem;
            font-weight: 700;
        }
        &_igd {
            &_foodtype {
                &-title {
                    background-color: $primary-g-extra;
                    line-height: 2rem;
                }
                &_item {
                    &_wrap {
                        @extend .flex;
                        justify-content: center;
                        padding: 1vw 4vw;
                        border-bottom: dotted 1px $primary-g-extra;
                        p {
                            min-width: 25%;
                            text-align: right;
                            &:first-child {
                                text-align: left;
                            }
                        }
                    }

                }
            }



        }
        &_instru {
            &_wrap {
                @extend .flex;
                &:nth-of-type(even){
                    flex-direction: row-reverse;
                }
            }
            &-img {
                width: 25%;
                @include psuedo-height($height:100%);
                background-color: $primary-g;
            }
            &-p {
                &-title {
                    color: $primary-g;
                    font-weight: 700;
                }
                &_wrap {
                    text-align: left;
                    width: 75%;
                    padding: 2vw;
                }
            }
        }
    }
</style>