<template>
    <div class="user-stock_wrap" v-if="isFetch">
        <tab-wrap class="user-stock">
            <tab title="Ur Stock">
                <div
                    class="user-stock_locations"
                    v-for="(location, key) in groupBy(userStockIGD, 'LocationID')"
                    :style="bgImg(key.toLowerCase()+'.jpg')"
                    :key="key"
                >
                    <h3 class="user-stock_locations__head">{{key}}</h3>
                    <div
                        class="user-stock_locations__item"
                        v-for="igd in location"
                        :style="bgImg(imgName(igd.IGDImage))"
                        :key="igd.IngredientID"
                    >
                        <p>
                            {{igd.IngredientID}}
                            <br />
                            {{igd.Amount}} grem
                        </p>
                    </div>
                </div>
            </tab>
            <tab title="Manager Ur Stock">
                <tab-wrap class="user-stock_editor">
                    <tab title="Edit UrStock Ingredient" class="user-stock_editor__tab-content">
                        <div
                            class="igd_editor"
                            v-for="(location, key) in groupBy(userStockIGD, 'foodtype')"
                            :key="key"
                        >
                            <h5 class="igd_editor__head">{{key}}</h5>
                            <div
                                class="igd_editor__item"
                                v-for="igd in location"
                                :key="'SDID-'+igd.SDID"
                            >
                                <p>{{igd.IngredientID}}</p>
                                <input type="text" :value="igd.Amount" :id="'Amount'+igd.SDID" />
                                <select :id="'Location'+igd.SDID" v-model="LocationSelection['Location'+igd.SDID]">
                                    <option
                                        v-for="(item, key) in groupBy(userStockIGD, 'LocationID')"
                                        :value="key"
										:key = "key"
										:selected="igd.LocationID === key"
                                    > {{key}} </option>
                                </select>
								<button class="edit" @click="editStockIGD(igd.SDID)">Edit</button>
                            </div>
                        </div>
                    </tab>
                    <tab title="Edit UrStock 2" class="user-stock_editor__tab-content">test2</tab>
                    <tab title="Edit UrStock 3" class="user-stock_editor__tab-content">test3</tab>
                    <tab title="Edit UrStock 4" class="user-stock_editor__tab-content">test4</tab>
                </tab-wrap>
            </tab>
        </tab-wrap>
    </div>
</template>

<script>
import tabWrap from "@/components/ui/TabWrap.vue";
import tab from "@/components/ui/Tab.vue";

export default {
    name: "UrStock",
    components: {
        tabWrap,
        tab
    },
    data: () => {
        return {
            userStockIGDdata: {},
            isFetch: false,
			LocationSelection: {}
            // isLogin: this.userID !== undefined ? true : false,
        };
    },
    created: async function() {
        this.userStockIGDdata = await this.getUserStockIGD({
            userID: this.userID
        }).then(res => {
            if (res) {
                this.isFetch = true;
            }
        });
        console.log("this.userStockIGDdata,this.userID", this.userID);
        console.log("this.userStockIGDdata,this.userID", this.userStockIGD);
    },
    computed: {
        isLogin() {
            return this.userID ? true : false;
        }
    },
    methods: {
        imgName(img) {
            return img.replace(/image\/|'/g, "");
        },
		editStockIGD(SDID) {
			console.log("value", document.getElementById('Amount'+SDID).value )
		}
    },
    watch: {
        // userStockIGD: {
        // 	immediate: true,
        //     handler() {
        //         console.log("Stock watch",this.userStockIGD)
        // 		this.isFetch = true
        //     }
        // }
    }
};
</script>

<style lang="scss">
.user-stock {
    & > ul {
        @extend .flex;
        justify-content: space-between;
        filter: $primary-g-extra-dark;
        li {
            @extend .flex-align-center;
            width: 50%;
            height: 50px;
            min-height: 2rem;
            background-color: $primary-g-dark;
            border-radius: 2vw 2vw 0 0;
            color: $primary-g;
            font-size: 1.5rem;
            font-weight: 600;
            &.tabs__selected {
                background-color: $primary-g-extra-dark;
            }
        }
    }
    &_wrap {
        width: calc(100% - 120px);
        margin: 0 10px 0 110px;
    }
    &_locations {
        min-height: 300px;
        border-radius: 1vw;
        @extend .background-image;
        @extend .flex;
        align-content: center;
        flex-wrap: wrap;
        padding: 5%;
        &__head {
            flex-basis: 100%;
            margin-bottom: 2vw;
        }
        &__item {
            flex-basis: 18%;
            @include psuedo-height($height: 100%);
            margin: 1%;
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 100%;
            @extend .flex-align-center;
            p {
                color: white;
                text-shadow: 1px 2px 0 $primary-g-extra-dark,
                    -1px -1px 0 $primary-g-extra-dark,
                    1px -1px 0 $primary-g-extra-dark,
                    -1px 1px 0 $primary-g-extra-dark,
                    1px 1px 0 $primary-g-extra-dark;
            }
        }
    }
    &_editor {
        @extend .flex;
        ul {
            @extend .flex;
            justify-content: flex-start;
            flex-direction: column;
            width: 15%;

            li {
                width: fit-content;
                max-width: 100%;
                font-size: 1rem;
                border-radius: 1vw 0 0 0;
                border-top: 1px solid $primary-g-dark;
                background-color: $primary-g-extra;
                padding: 10px 15px;
                &.tabs__selected {
                    background-color: $primary-y-light;
                    filter: none;
                    border: none;
                }
            }
        }
        &__tab-content {
            width: 85%;
            background-color: $primary-y-light;
            .igd_editor {
                padding: 5%;
                &__head {
                    width: 100%;
                    background-color: $primary-g-extra;
                }
            }
        }
    }
}
</style>