<template>
<main>
    <div style="text-align:center;margin:0 0 20px 0"><h2 >上传报告</h2></div>
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
        property="reportTime"
        align="center"
        label="上传时间">
        </el-table-column>
        <el-table-column
        property="reportContent"
        align="center"
        label="报告内容">
        </el-table-column>
    </el-table>
    <el-button type="success" @click="reportVisible = true" style="margin-top:20px">上传报告</el-button>
    <el-dialog
    title="请填写报告内容"
    :visible.sync="reportVisible"
    width="50%">
    <el-form :model="reportForm" label-width="18%">
            <el-form-item label="报告内容">
                <el-input v-model="reportForm.reportContent" placeholder="请输入报告内容"></el-input>
            </el-form-item>
            <el-form-item>
                <div><el-button type="primary" @click="submit">提交申请</el-button></div>
            </el-form-item>
        </el-form>
    </el-dialog>
  </main>
</template>
<script>
  export default {
    data() {
      return {
        reportVisible:false,
        reportForm:{
          reportContent:'',
        },
        tableData: [],
      }
    },

    methods: {
      submit(){
          this.axios.post('/report/insertReport',{reportContent:this.reportForm.reportContent,
            user:{userId:JSON.parse(localStorage.user).userId}})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.reportVisible = false
                    this.getData()
                }
            })
            .catch()
      },
      getData(){
          this.axios.get('/report/getUserReport',{params:{userId:JSON.parse(localStorage.user).userId}})
          .then((res)=>{
            this.tableData = res.data.data.reportList
          })
          .catch()
      },
    },
    created(){
        this.getData()
    }
  }
</script>