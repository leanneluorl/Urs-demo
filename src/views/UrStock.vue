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
                        <h4 class="igd editor__head-button">Edit existing Ingredient</h4>
                        <div
                            class="igd editor updator"
                            v-for="(location, key) in groupBy(userStockIGD, 'foodtype')"
                            :key="key"
                        >
                            <h5 class="igd editor__head">{{key}}</h5>
                            <form @submit.prevent
                                class="igd editor__item"
                                v-for="igd in location"
                                :key="'SDID-'+igd.SDID"
                            >
                                <p>{{igd.IngredientID}}</p>
                                <div>
                                    <input type="number" :value="igd.Amount" :id="'Amount'+igd.SDID"
                                            :name="'Amount'+igd.SDID"
                                            min="0" max="99999"
                                            /><span class="unit"></span>
                                    <span v-if="error.id === igd.SDID"> {{error.msg}} </span>
                                </div>
                                <div class="custom-select">
                                    <!-- <select :id="'Location'+igd.SDID" >
                                        <option
                                            v-for="item in locationGetter"
                                            :value="item.Uniq_name"
                                            :key = item.Uniq_name
                                            :selected="igd.LocationID === item.Uniq_name"
                                        > {{ item.Uniq_name }} </option>
                                    </select> -->
                                    <SelectBox v-if="locationGetter.length"
                                        :id="'Location'+igd.SDID"
                                        :data-list="locationGetter"
                                        :list-key="'item'"
                                        :selected="{status: true, value: igd.LocationID}"
                                        :opt-group="{status: false}"
                                        :current="igd.LocationID"
                                        />
                                </div>
								<input type="submit" value="Edit" class="edit" @click="editStockIGD(igd.SDID)">
								<input type="submit" value="Delete" class="delete" @click="deleteUserStockIGD(igd.SDID)">
                            </form>
                        </div>
                        <h4 class="igd editor__head-button">Add new Ingredient</h4>
                        <div class="igd editor creator">
                            <form @submit.prevent
                                class="igd editor__item"
                                :key="formKey"
                            >
                                <div class="custom-select ingredient">
                                    <SelectBox v-if="ingredientGetter.length"
                                        id="createIGD"
                                        :data-list="ingredientGetter"
                                        :list-key="'item'"
                                        :selected="{status: false, value: 'Ingredient...'}"
                                        :opt-group="{status: true, by: 'Information'}"
                                        current=""/>
                                    <p v-if="error.createIGD" class="error">{{ error.createIGD }}</p>
                                </div>
                                <div>
                                    <input type="number" v-model="creator.Amount"
                                            min="0" max="999999"
                                            /><span class="unit"></span>
                                    <p v-if="error.createAmount" class="error">{{ error.createAmount }}</p>
                                </div>
                                <div class="custom-select location">
                                    <SelectBox v-if="locationGetter.length"
                                        id="createLocation"
                                        :data-list="locationGetter"
                                        :list-key="'item'"
                                        :selected="{status: false, value: 'Location...'}"
                                        :opt-group="{status: false}"
                                        current=""
                                        />
                                    <p v-if="error.createLocation" class="error">{{ error.createLocation }}</p>
                                </div>
								<input type="submit" value="Create" class="create" @click="creatStockIGD()">
                            </form>
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
import SelectBox from "@/components/ui/SelectBox.vue";

export default {
    name: "UrStock",
    components: {
        tabWrap,
        tab,
        SelectBox
    },
    data: () => {
        return {
            isFetch: false,
			LocationSelection: {},
            error: {
                createIGD: "",
                createLocation: "",
                createAmount: "",
            },
            // selected: {status: true, value: ''},
            creator: {
                IngredientID: '',
                Amount: '',
                LocationID: ''
            },
            formKey: 0
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
        // console.log('IGD',this.ingredient)
        // console.log('IGD',this.groupBy(this.ingredient, 'Information'))
		// console.log('IGD',Object.keys(this.groupBy(this.ingredient, 'Information')))
		// console.log('IGD',Object.keys(this.ingredient, 'Information'))

    },
    computed: {
    },
    methods: {
        editLocation(SDID, location) {
            return {
                [`editLocation-${SDID}`]: location
            }
        },
        imgName(img) {
            return img.replace(/image\/|'/g, "");
        },
		editStockIGD(SDID) {
            // e.preventDefault();
            var Amount = document.getElementById('Amount'+SDID).value,
                LocationID = document.getElementById('Location'+SDID).getAttribute('current');
            if( Amount>0 && Amount<999999) {
                this.updateUserStockIGD({
                        SDID: SDID,
                        data: {
                            Amount: Amount,
                            LocationID: LocationID
                        }})

            }else {
                this.error.id = SDID
                this.error.msg = "Number Should be....";
                console.log(this.error)
            }

		},
        userStockIGDdata(groupByItem) {
            var data = this.groupBy(this.userStockIGD, groupByItem)
            Object.keys(data)
                .sort()
                .forEach(function(v) {
                    console.log(v, data[v]);
                });
            return data
        },
        checkForm: function (e) {
            console.log("e",e)
            // if (this.name && this.age) {
            //     return true;
            // }

            // this.errors = [];

            // if (!this.name) {
            //     this.errors.push('Name required.');
            // }
            // if (!this.age) {
            //     this.errors.push('Age required.');
            // }

            e.preventDefault();
        },
        creatStockIGD() {
            this.error = {
                createIGD: "",
                createAmount: "",
                createLocation: ""
            }
            this.creator.IngredientID = document.getElementById('createIGD').getAttribute('current');
            this.creator.LocationID = document.getElementById('createLocation').getAttribute('current');
            console.log("this.creator.Amount",this.creator.Amount)
            if(!this.creator.IngredientID){
                this.error.createIGD = "Please select the Ingredient"
            }
            if(!this.creator.LocationID){
                this.error.createLocation = "Please select the Location"
            }
            if(!this.creator.Amount){
                this.error.createAmount = "Please enter number..."
            }
            if(this.creator.IngredientID && this.creator.LocationID && this.creator.Amount ){
                this.createUserStockIGD(this.creator)
                this.formKey += 1
                this.creator.Amount = ""
            }
            console.log("creator",this.creator);
            console.log("error",this.error);
        }
    },
    watch: {
        // userStockIGD: {
        //     immediate: true,
        //     handler() {
        //         console.log("Stock watch",this.userStockIGD)
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
                font-weight: 900;
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
        & > ul {
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
            h4 {
                margin: 2% 0;
            }
            .editor {
                padding: 1% 5% 5% 5%;
                &__head {
                    width: 100%;
                    background-color: $primary-g-extra;
                }
                &__item {
                    margin: 5px 0;
                    width: 100%;
                    @extend .flex-align-center;
                    p {
                        text-align: left;
                        font-weight: 700;
                        width: 25%;
                    }
                    & > div {
                        position: relative;
                        min-width: 30%;
                        input{
                            box-sizing: content-box;
                            width: 100%;
                            line-height: 2.4rem;
                            border: 1px solid $select-border;
                            padding: 0 0 0 15px;
                            &.unit::before {
                                content:"gram";
                                position: absolute;
                                width: 50px;
                                right: 5%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                z-index: 99;
                                color: $primary-g;
                            }
                        }
                    }

                    input:not([type="number"]) {
                        width: 15%;
                        max-width: 15%;
                        height: calc( 2px + 2.4rem);
                        &.edit {
                            background-color: $primary-g;
                        }
                        &.create {
                            background-color: $primary-g-dark;
                        }
                        &[type="submit"]{
                            cursor: pointer;
                        }
                    }

                    .custom-select {
                        width: 20%;
                        line-height: 2.4rem;
                        @extend .select-css;
                        .selector {
                            .option-group{
                                p{
                                    padding-left: 5px;
                                    background-color: $primary-g-50;
                                    width: 100%;
                                }
                                ul {
                                    li {
                                        padding-left: 20%;
                                        text-align: left;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .creator {
                .error {
                    position: absolute;
                    font-size: 0.8rem;
                    width: 100%;
                    color: $error;
                }
            }
        }
    }
}
</style>