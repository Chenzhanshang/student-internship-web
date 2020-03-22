<template>
    <el-form  ref="form" :model="form" label-width="10%">
        <h3>请输入以下信息进行注册</h3>
        <el-divider></el-divider>
        <el-form-item label="用户名：" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        
        <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入你的密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off" placeholder="请再次输入你的密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：">
            <el-input v-model="form.idCard" placeholder="请输入你身份证号"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：">
            <el-input v-model="form.phone" placeholder="请输入你电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
            <el-input v-model="form.email" placeholder="请输入你的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item>
            <div><el-button type="primary" @click="register">立即注册</el-button></div>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data(){
        return{
            form: {
                pass: '',
                checkPass: '',
                name:'',
                userName:'',
                idCard:'',
                phone: '',
                email: '',
                sex:''
            },
        }
    },
    methods:{
        register(){
            this.axios.post('/user/register',{
                password: this.form.pass,
                name:this.form.name,
                userName:this.form.userName,
                idCard:this.form.idCard,
                phone: this.form.phone,
                email:this.form.email,
                sex:this.form.sex
            })
            .then((res=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.$router.push('login')
                }
                else{
                    this.$message({
                        type:"warning",
                        message:res.data.msg
                    });
                }
            }))
            .catch()
        }
    }
}
</script>