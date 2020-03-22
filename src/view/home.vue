<template>
<main>
  <div style="height:650px;background-color:#545c64">
    <el-row class="tac" :gutter=20>
        <el-col :span="4" >
            <div class="left">
            <div class="user"><span >管理员：{{user.userName}} </span><span class="p1" @click="logout">注销</span></div>
            
            <el-menu
            default-active="/adminHome/adminAnnouncement"
            class="el-menu-vertical-demo"
            :router=true
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            
            <el-submenu index="1">
                <template slot="title">
                    <span>管理员账号管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/adminHome/adminUserMessage"><span style="font-size:12px">查看账号信息</span></el-menu-item>
                <el-menu-item @click="updatePassword"><span style="font-size:12px">修改密码</span></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/adminHome/adminWork">
                <span slot="title">作业管理</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/adminReport" >
                <span slot="title">报告列表</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/userManage">
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/feedback" >
                <span slot="title">反馈列表</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/adminApply">
                <span slot="title">自主实习审批</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/adminTeachingMaterial">
                <span slot="title">教学资料上传</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/adminTask">
                <span slot="title">实习任务管理</span>
            </el-menu-item>
            <el-menu-item index="/adminHome/adminAnnouncement">
                <span slot="title">公告管理</span>
            </el-menu-item>
            </el-menu>
            </div>
        </el-col>
        
        <el-col :span="20" style="height:650px;background-color:#ffffff">
            <router-view></router-view>
        </el-col>
 
    </el-row>
  </div>
</main>
</template>
<script>
  export default {
      data(){
          return{
              user:'',
          }
      },
    methods: {
      //退出
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      },
      //修改密码
      updatePassword(){
      this.$prompt('请输入新密码', '修改密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal:false,
        inputPlaceholder:'密码'
        }).then(({ value }) => {
          this.axios.post("/user/updatePassword",{userName:this.user.userName,password: value})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
              type:'success',
              message:res.data.msg
            })
          }
          else{
            this.$message({
              type:'error',
              message:"修改密码失败"
            })
          }
          
        })
        .catch()
      })
      .catch(() => {
        });
      },
      //提交反馈
      submitFeedback(){
        this.$prompt('请填写反馈内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal:false,
        inputPlaceholder:'反馈内容'
        }).then(({ value }) => {
          this.axios.post("/feedback/submitFeedback",{user:{userId:this.user.userId},feedbackContent: value})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
              type:'success',
              message:res.data.msg
            })
          }
          else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
          
        })
        .catch()
      })
      .catch(() => {
        });
      },
    },

    created(){
        
      if(localStorage.getItem("user") != null){
        //取出缓存
        this.user = JSON.parse(localStorage.user)
      }
      else{
        this.user = this.$route.query.user
        //将用户信息放入缓存
        localStorage.user = JSON.stringify(this.user)
      }

      //更新路由
      this.$router.push('/adminHome/adminAnnouncement')
        
  }
}
</script>

<style>
.user{
    color: aliceblue;
    padding: 20px 0 20px 0;
}


.left{
    height:100%;
    background-color:#545c64
}
.p1{
    position:absolute;
    margin-left: 10px;
    color:#18C6E0
}

</style>