<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">欢迎登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" @keyup.enter.native="handleSubmit2" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {axiosGet, axiosPost, showMsg, confirm} from '../common/common.js'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: 'admin',
                    checkPass: 'admdsin123456'
                },
                rules2: {
                    account: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass }
                    ],
                    checkPass: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            ...mapMutations([
                'NAV_ARR',
                'ADMIN'
            ]),
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            async handleSubmit2(ev) {
                var that = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        axiosPost({
                            url: 'login',
                            data: {
                                admin: this.ruleForm2.account,
                                pwd: this.ruleForm2.checkPass,
                            },
                            success: (response) => {
                                if(response.data.isok == 1) {
                                    this.logining = false;
                                    this.ADMIN(response.data.admin);
                                    this.NAV_ARR(JSON.stringify(response.data.nav_arr));
                                    // this.$store.commit('nav_arr', JSON.stringify(response.data.nav_arr));
                                    showMsg('登录成功', 'success');
                                    this.$router.push({
                                        path: '/'
                                    })
                                } else {
                                    this.logining = false;
                                    showMsg('账号密码不正确', 'error');
                                    this.$notify({
                                        title: '超级管理员',
                                        message: '账号: admin 密码: admdsin123456',
                                        type: 'warning'
                                    });
                                };
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    /*lang="scss"*/
    
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    
    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>