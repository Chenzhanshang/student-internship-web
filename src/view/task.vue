<template>
<main>
    <div style="text-align:center;margin:0 0 20px 0"><h2 >实习任务管理</h2></div>
    <el-table
    :data="tableData"
    style="width: 100%">
        <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80">
        </el-table-column>
        <el-table-column
        property="user.name"
        align="center"
        label="发布人姓名">
        </el-table-column>
        <el-table-column
        property="taskTime"
        align="center"
        label="发布时间">
        </el-table-column>
        <el-table-column
        property="taskContent"
        align="center"
        label="实习任务内容">
        </el-table-column>
        <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope" >
          <el-button type="warning" size="mini" @click="deleteTask(scope.row.taskId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="taskVisible = true" style="margin-top:20px">发布实习任务</el-button>
    <el-dialog
    title="请填写实习任务内容"
    :visible.sync="taskVisible"
    width="50%">
    <el-form :model="taskForm" label-width="18%">
            <el-form-item label="任务内容">
                <el-input v-model="taskForm.taskContent" placeholder="请输入实习任务内容"></el-input>
            </el-form-item>
            <el-form-item>
                <div><el-button type="primary" @click="submit">发布</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>
  </main>
</template>
<script>
  export default {
    data() {
      return {
        taskVisible:false,
        taskForm:{
          taskContent:'',
        },
        tableData: [],
      }
    },

    methods: {
      submit(){
          this.axios.post('/task/insertTask',{taskContent:this.taskForm.taskContent,
            user:{userId:JSON.parse(localStorage.user).userId}})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.taskVisible = false
                    this.getData()
                }
            })
            .catch()
      },
      getData(){
          this.axios.get('/task/getAllTask')
          .then((res)=>{
            this.tableData = res.data.data.taskList
          })
          .catch()
      },
      deleteTask(taskId){
        this.axios.get('/task/deleteTask',
        {params:{taskId:taskId}})
        .then((res)=>{
          if(res.data.status == 1){
            this.$message({
                type:"success",
                message:res.data.msg
            });
            this.getData()
          }
          else{
            this.$message({
                type:"error",
                message:res.data.msg
            });
          }
        })
        .catch()
      }
    },
    created(){
        this.getData()
    }
  }
</script>