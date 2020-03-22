<template>
<main>
  <div style="text-align:center;margin:0 0 20px 0"><h2>公告管理</h2></div>
  <el-table
    :data="announcementList"
    style="width: 100%">
    <el-table-column
    label="序号"
    type="index"
    align="center">
  </el-table-column>
    <el-table-column
        prop="announcementTitle"
        label="公告标题"
        align="center">
    </el-table-column>
    <el-table-column
        prop="announcementContent"
        label="公告内容"
        align="center">
    </el-table-column>
    <el-table-column
        prop="announcementTime"
        label="公告时间"
        align="center">
    </el-table-column>
    <el-table-column
        prop="user.name"
        label="发布人"
        align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
        <template slot-scope="scope" >
          <el-button type="success" size="mini" @click="updataForm(scope.row)">修改</el-button>
          <el-button type="warning" size="mini" @click="deleteAnnouncement(scope.row.announcementId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-button type="success" @click="newAnnouncementDialogVisible = true" style="margin-top:20px">新增公告</el-button>
      <el-dialog
      title="请填写公告信息"
      :visible.sync="announcementDialogVisible"
      width="50%">
      <el-form :model="announcementForm" label-width="15%">
              <el-form-item label="公告标题" prop="title">
                  <el-input v-model="announcementForm.title" placeholder="请输入公告标题"></el-input>
              </el-form-item>
              <el-form-item label="公告内容：">
                  <el-input v-model="announcementForm.content" placeholder="请输入公告内容"></el-input>
              </el-form-item>
              <el-form-item>
                  <div><el-button type="primary" @click="updateAnnouncement">修改</el-button></div>
              </el-form-item>
          </el-form>
      </el-dialog>

      <el-dialog
      title="请填写公告信息"
      :visible.sync="newAnnouncementDialogVisible"
      width="50%">
      <el-form :model="announcementForm" label-width="15%">
              <el-form-item label="公告标题" prop="title">
                  <el-input v-model="announcementForm.title" placeholder="请输入公告标题"></el-input>
              </el-form-item>
              <el-form-item label="公告内容：">
                  <el-input v-model="announcementForm.content" placeholder="请输入公告内容"></el-input>
              </el-form-item>
              <el-form-item>
                  <div ><el-button type="primary" @click="issueAnnouncement">发布公告</el-button></div>
              </el-form-item>
          </el-form>
      </el-dialog>
</main>    
    
</template>
<script>
  export default {
    data() {
      return {
        user:'',
        newAnnouncementDialogVisible:false,
        announcementDialogVisible:false,
        announcementForm:{
          title:'',
          content:''
        },
        //临时存放id
        announcementId:'',
        announcementList:[],
        activeNames: []
      };
    },
    methods: {
      //发布公告
      issueAnnouncement(){
        this.axios.post('/announcement/issueAnnouncement',
                  {announcementTitle:this.announcementForm.title,
                  announcementContent:this.announcementForm.content,
                  user:{userId:this.user.userId}})
                  .then((res)=>{
                    if(res.data.status == 1){
                      this.$message({
                        type:"success",
                        message:res.data.msg
                      })
                      this.newAnnouncementDialogVisible = false
                      this.getData()
                    }
                    else{
                      this.$message({
                        type:"error",
                        message:res.data.msg
                      })
                    }
                  })
                  .catch()
      },
      //修改表单控制
      updataForm(announcement){
        this.announcementDialogVisible = true
        this.announcementForm.content = announcement.announcementContent
        this.announcementForm.title = announcement.announcementTitle
        this.announcementId = announcement.announcementId
      },
      //修改
      updateAnnouncement(announcementId){
        this.axios.post('/announcement/updateAnnouncement',
                  {
                  announcementId:this.announcementId,
                  announcementTitle:this.announcementForm.title,
                  announcementContent:this.announcementForm.content,
                  user:{userId:JSON.parse(localStorage.user).userId}})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
              type:"success",
              message:res.data.msg
            })
            this.getData()
            this.announcementDialogVisible = false
          }
          else{
            this.$message({
              type:"error",
              message:res.data.msg
            })
          }
        })
        .catch()
      },
      //删除
      deleteAnnouncement(announcementId){
        this.axios.get('/announcement/deleteAnnouncement',{params:{announcementId:announcementId}})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
              type:"success",
              message:res.data.msg
            })
            this.getData()
          }
          else{
            this.$message({
              type:"error",
              message:res.data.msg
            })
          }
        })
        .catch()
      },
      //获取数据
      getData(){
        this.axios.get('/announcement/getAllAnnouncement')
        .then((res)=>{
            if(res.data.status == 1){
              this.announcementList = res.data.data.announcementList
              console.log(this.announcementList)
            }
            
        })
        .catch()
      }
    },
    created(){
        this.getData()
        if(localStorage.getItem("user") != null){
        //取出缓存
        this.user = JSON.parse(localStorage.user)
        }
        else{
          this.user = this.$route.query.user
          //将用户信息放入缓存
          localStorage.user = JSON.stringify(this.user)
        }
    }
  }
</script>