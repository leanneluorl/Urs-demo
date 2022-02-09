<template>
<section class="ingredient_search-box">
    <h2 class="section-title">Find Ur Recipes</h2>
    <p class="wordings">
    Drag and Drop the ingredien to selection box.
    <br />Search Recipes by Ingredients:
    <span
        v-for="selection in selections"
        class="selection_list"
        :key="selection">
        {{selection}}
    </span>
    </p>
    <div
    id="recipe-selection"
    :style="bgImg('cuttingboard.png')"
    class="recipe-selection"
    >
        <div v-for="dropbox in 3"
            :id="`selection-`+dropbox"
            :key="`drop-box`+dropbox"
            @dragover.prevent
            @drop.prevent="drop"
            class="igd-dropbox"
        />
        <div class="igd-drop-button-box" ondrop="drop(event)" >
            <button class="igd-drop-button search" type="button" @click="searchRecipe">Find!</button>
            <button class="igd-drop-button reset" type="button" @click="ResetSearchResult">Reset</button>
        </div>
    </div>

    <div v-for="(foodtype, key) in formatIngredientData"
        :key="`foodtype-`+key"
        class="drag-ingredient drag-ingredient-wrap"
        >
        <div class="drag-ingredient-type">
            <h6 class="Head2-foodtype">{{ foodtypeName(key) }}</h6>
        </div>
        <div class="drag-ingredient-item" >
            <div class="igd-dragbox"
                v-for="ingredient in foodtype"
                :key="`ingredient-`+ingredient.itemID"
                >
                <div
                    class="igd-icon"
                    draggable="true"
                    @dragstart="dragStart"
                    @dragover.stop
                    :item="ingredient.item"
                    :id="`IGD`+ingredient.itemID"
                    :style="bgImg(FTimageName(ingredient.FTimage))"
                >
                    <p class="igd-icon_font">{{ingredient.item}}</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            selections: [],
            searchRecipeResult: {}
        };
    },
    props: {
        ingredientData: {
            type: Array,
            //default: () => ([]),
        }
    },
    computed: {
        formatIngredientData() {
            return this.groupBy(this.ingredientData, "foodTypeID") //Database setting, "foodTypeID" case sensitive
        }
    },
    methods: {
        foodtypeName(key) {
            return this.foodtype[key-1].item
        },
        FTimageName(FTimage) {
            return FTimage.replace("'image/",'').replace("'",'')
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        dragStart(ev) {
            ev.dataTransfer.setData("igdID", ev.target.id);
        },
        drop(ev) {
            ev.preventDefault();
            const igdID = ev.dataTransfer.getData("igdID")
            const igd = document.getElementById(igdID)
            ev.target.appendChild(igd);
            this.selections.push(igd.getAttribute('item'))
        },
        searchRecipe() {
            var jsonData = {}
            var arrLength = this.selections.length
            if( arrLength === 0 ){
                alert("Please slect the ingredient/s")
                return
            }
            for (var x = 1; x < 4; x++) {
                var name = "selection"+x
                jsonData[name] = (arrLength >= x) ?  this.selections[x-1] :  ""  ;
            }
            this.searchRecipebyIGD(jsonData).then(res =>{
                    this.$emit("searchResult",res)
				}).catch(err => {
					console.dir(err)
				})

        },
        ResetSearchResult() {
            this.$emit("resetDrag",'')

        },
    },
    created: function() {

    },
};
</script>

<style lang="scss" scoped>

    .ingredient_search-box {
        padding: 2.5%;
        background-color: $primary-g;
        filter: brightness(0.95);
        padding: 0 2vw;
        margin: 0 0 0 110px;
        @media only screen and (max-width: 600px) {

            button {
                font-size: 0.6rem;
                line-height: 1;
            }
        }
        .wordings {
            color: $primary-g-dark;
            filter: brightness(0.75);
        }


        & > h3, & > p {
            padding: 20px 0 10px;
        }
        .selection_list {
            background-color: $primary-g-light;
            margin: 0 10px;
        }
        .igd-drop-button{
            &-box {
                height: 100%;
                min-width: 50px;
            }
            cursor: pointer;
            border-radius: 0.2vw;
            min-width: 50px;
            &.search {
                background-color: $primary-g;
                width: 6vw;
                height: 6vw;
            }
            &.reset {
                margin-top: 0.2vw;
                height: 3vw;
                width: 6vw;
            }
            &:hover {
                &.search {
                filter: brightness(1.1);
                }
                filter: brightness(0.9);
                transform: scale(1.01);
            }
        }
        .igd-icon {
        width: 40px;
        height: 40px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 40px 40px;
        @extend .flex-align-center;
        p{
            color: white;
            font-size: 0.75rem;
            line-height: 0.8rem;
            word-break: break-all;
        }
    }
    }
    .recipe-selection {
        margin: auto;
        background-size: 100% 200%;
        @extend .flex-align-center;
        & > div {
            width: 7vw;
            height: 7vw;
            @extend .flex-align-center;
            &.igd-drop-button-box {
                flex-direction: column;
            }
        }
        .igd-dropbox {
            border-radius: 1.5vw;
            border: 0.4vw dotted $primary-g-dark;
            outline: 0.4vw dotted $primary-g-light;
            margin: 2vw;
            outline-offset: 1vw;

        }
    }
    .drag-ingredient {
        &:nth-of-type(odd){
            background: #00000005;
        }
        @extend .flex;
        &-type {
            width: 150px;
            @extend .flex;
            align-items: center;
            text-align: left;
        }
        &-item{
            @extend .flex;
        }
        .igd-dragbox {
                background-color: $primary-g-dark;
                width: 50px;
                height: 50px;
                margin: 5px;
                padding: 5px;
                border-radius: 5px;
            }
    }
</style>