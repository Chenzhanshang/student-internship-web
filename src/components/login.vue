<template >
    <el-container>
        <el-header>
            <h1>大学生实习管理系统</h1>
            <h3>( College Student Practice Management System 1.0)</h3>
            <el-divider></el-divider>
        </el-header>
        <el-main class="main" >
            <div class="background">
                <img :src="imgSrc" width="100%" height="100%" />
            </div>
            <el-row type="flex" align="middle" justify="end">

                <el-col :xs="18" :sm="14" :md="10" :lg="8" :xl="8" >
                    <el-form ref="loginForm" label-position="left" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifycode">
                    <el-row :span="24">
                        <el-col :span="12">
                        <el-input v-model="loginForm.verifycode" auto-complete="off" placeholder="请输入验证码" size=""></el-input>
                        </el-col>
                        <el-col :span="12">
                        <div @click="refreshCode">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </div>
                        </el-col>
                    </el-row>
                    </el-form-item>
                    <div style="float:left;width:100%;text-align:left;margin: 0 0 10px 0">
                        <el-checkbox-group v-model="remember">
                            <el-checkbox label="记住密码"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-form-item >
                        <el-button type="primary" :loading="loading" @click="login('loginForm')">{{loading==false?'登录':'登录中'}}</el-button>
                        <el-button type="warning"  @click="register()">注册</el-button>
                    </el-form-item>
                </el-form>
                </el-col>
            </el-row>
        </el-main>
        <div style="margin-top:20px">
            <el-divider ></el-divider>
        </div>
        <div>
        <p>Copyrighe 2020 All Right Reserved</p>
        <span>QQ:510370741 E-mail:510370741@qq.com</span>
        </div>
        <el-divider ></el-divider>
    </el-container>
</template>

<script>
import SIdentify from '@/components/SIdentify'
export default {
    components: { SIdentify },
    data() {
      // 验证码自定义验证规则
      const validateVerifycode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } 
        else if (value !== this.identifyCode) {
          console.log('validateVerifycode:', value)
          callback(new Error('验证码不正确!'))
        } 
        else {
          callback()
        }
      }
        return {
            remember:'',
            findDialogVisible:false,
            imgSrc:require('../assets/bgImage.jpg'),
            identifyCode:'',
            identifyCodes:'1234567890',
            findForm: {
                name:'',
                idCard:'',
                phone: '',
                email: '',
                verifycode:''
            },
            loading:false,
            loginForm:{
                userName:'',password:''
            },
             rules: {
                userName: [
                    {required: true, message: '账号不可为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ],
                verifycode: [
                    { required: true, trigger: 'blur', validator: validateVerifycode }
                ]
            }
        }
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.loading = true
                    this.axios.post('/user/login',this.loginForm)
                    .then((res)=>{
                        if(res.data.status==1){
                            //弹出提示
                            this.$message({
                                type:"success",
                                message:res.data.msg
                            });
                            if(res.data.data.user.role == 0){
                                this.$router.push({
                                    path: '/home',
                                    query: {
                                    user: res.data.data.user
                                    }
                                })
                            }
                            else{
                                this.$router.push({
                                    path: '/adminHome',
                                    query: {
                                    user: res.data.data.user
                                    }
                                })
                            }
                            
                        }
                        else{
                            //弹出提示
                            this.$message({
                                type:"warning",
                                message:res.data.msg
                            });
                        }
                        this.loading = false
                        
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.loading = false
                    });
                }
                else{
                    //校验未通过,不提交表单
                    return false
                }
            })
        },
        //注册
        register(){
            this.$router.push('/register')
            
        },
        //找回账号
        find(){
            this.axios.post('/user/find',{
                name:this.findForm.name,
                idCard:this.findForm.idCard,
                phone: this.findForm.phone,
                email:this.findForm.email,
            })
            .then((res=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.userName = res.data.data.user.userName
                    this.password = res.data.data.user.password
                    this.findFlag = true
                }
                else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    });
                }
            }))
            .catch()
        },
        randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
        }
      }
    },
    created(){
        this.refreshCode()
    }
    
}
</script>

<style scoped>
    .login-box {
    border: 1px solid #DCDFE6;
    width: 80%;
    margin:  60px 0 0 0;
    padding: 25px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: #fff;
  }

  .main{
      margin-top: 30px
  }

  .background{
    float: left;
    margin-top: 20px;
    width:55%;  
    height:55%;
    position: absolute;
    }


</style>