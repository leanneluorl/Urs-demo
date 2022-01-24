<template>
    <div id="login" class="login">
        <div class="close" @click="closeLogin"></div>
        <form>
        <table class="login-table">
            <tbody>
            <tr>
                <td>User ID:</td>
                <td>
                <input type="text" v-model="uid" />
                </td>
            </tr>
            <tr>
                <td>Password:</td>
                <td>
                <input type="password" name="password" v-model="pwd" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                <input type="button" value="Login" @click="Signin" />
                <input type="button" value="Sign up!!" onclick="loadRegisterPage();" />
                </td>
            </tr>
            </tbody>
        </table>
        </form>
        <div class="err">{{err.msg}}</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Login',
    data:() => {
		return {
			uid: "",
            pwd: "",
            err: {}
		}
	},
    computed: {
        ...mapState('User', ['user']),
        
    },
    methods: {
        ...mapActions('User', ['login']),
        Signin() {
            console.log(this.uid)
            this.login({
                userID: this.uid,
                password:this.pwd,
            }).then( result => {
                this.err = result
                console.log(result)
            })
        }
    }
};
</script>

<style lang="scss">
    .login {
        width: 400px;
        height: 200px;
        background: $primary-g-dark;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.6);
        text-align: left;
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        padding: 50px;

        .err {
            margin: 20px 0;
        }

        .close {
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
    }

    .login-table {
        margin: auto;
        tr {
            height: 2rem;
            td:nth-of-child(1){
                width: 120px;
                padding-right: 10px;
            }
        }
        input[type="button"] {
            min-width: 80px;
            margin-right: 16px;
        }
    }
    
    /*Registration page*/
    #registration {
        width: 700px;
        background: #51a668;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.6);
        text-align: center;
        position: absolute;
        top: 50vh;
        left: 50vw;
        margin: -200px 0 0 -300px;
        border-radius: 10px;
        padding: 3vw;
    }
    .check_button {
        display: block;
        width: 150px;
    }
    #registration input[type="text"] {
        width: 250px;
    }
    #registration #login-table {
        text-align: left;
    }
</style>