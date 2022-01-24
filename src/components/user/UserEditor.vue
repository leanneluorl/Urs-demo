<template>
    <div class="user_editor-box">
        
        <h1>User Info Editor</h1>
        <div class="close" @click="clickCloseEdit()"></div>
        <div class="user-item">
            <div class="user-item-title line">User ID</div>
            <div class="user-item-input line">{{ user.UserID}}</div>
            <div class="user-item-title line">Email</div>
            <div class="user-item-input line">{{ user.Email }}</div>
            <div class="user-item-title line">First Name</div>
            <div class="user-item-input line">
                <input type="text" id="FirstName" v-model="fName"  />
            </div>
            <div class="user-item-title line">Last Name</div>
            <div class="user-item-input line">
                <input type="text" id="LastName" v-model="lName"  />
            </div>
            <div class="user-item-title line">Mobile No</div>
            <div class="user-item-input line">
                <input type="text" id="MobileNo"  v-model="mobile" />
            </div>
            <button class="user-edit" @click="editUser()">Submit</button>
            <button class="reset">Reset</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserEditor',
    data:() => {
        return {
            fName: '',
            lName: '',
            mobile: ''
        }
    },
    components: {
       
    },
    methods: {
        editUser() {
            console.log(this.fName,this.lName,this.mobile)
            this.updateUserInfo({
                FirstName: this.fName,
                LastName: this.lName,
                MobileNo: this.mobile
            })
        },
        clickCloseEdit() {
            this.$emit('close-edit',false)
        }
    }
};
</script>

<style lang="scss">
    .user_editor-box {
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        width: 450px;
        height: 400px;
        background-color: lightgray;
        border-radius: 3vw;
        filter: drop-shadow( 0 0 10px #00000080);
        h1 {
            margin-top: 30px;
        }
        .close {
            cursor: pointer;
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 10px;
            right: 10px;
            &:after{
                display: inline-block;
                font-weight: 900;
                font-size: 2rem;
                content: "\00d7"; /* This will render the 'X' */
            }
        }
        .user-item{
            @extend .flex;
            text-align: left;
            justify-content: flex-start;
            padding: 3vw 10%;
            &-item, &-title{
                &.line {
                    margin: 5px 0;
                }
                
                float: left;
            }
            &-input {
                width: 65%;
            }
            &-title {
                width: 35%;
            }
            button {
                width: 100px;
                height: 30px;
                margin:50px 20px 50px 0;
            }
        }
    }
</style>