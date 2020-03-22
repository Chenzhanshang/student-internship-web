<template>
<main>
  <div style="text-align:center;margin:0 0 20px 0"><h2 >自主实习管理</h2></div>
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
        label="申请人姓名">
        </el-table-column>
        <el-table-column
        property="applyTime"
        align="center"
        label="申请时间">
        </el-table-column>
        <el-table-column
        property="companyName"
        align="center"
        label="公司名称">
        </el-table-column>
        <el-table-column
        property="companySite"
        align="center"
        label="公司地址">
        </el-table-column>
        <el-table-column
        property="companyPhone"
        align="center"
        label="公司联系方式">
        </el-table-column>
        <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="success"
                    plain
                    @click="pass(scope.row)"
                    >通过</el-button> 
                    <el-button
                    size="small"
                    type="danger"
                    plain
                    @click="reject(scope.row)"
                    >驳回</el-button> 
                </template>
            </el-table-column>
    </el-table>
  </main>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
      }
    },

    methods: {
      getData(){
          this.axios.get('/apply/getAllApplyByState')
          .then((res)=>{
            console.log(res)
            this.tableData = res.data.data.applyList
          })
          .catch()
      },
      pass(apply){
        this.axios.get('/apply/pass',{params:{applyId:apply.applyId}})
          .then((res)=>{
            console.log(res)
            if(res.data.status == 1){
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.getData()
            }
            else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
          .catch()
      },
      reject(apply){
        this.axios.get('/apply/reject',{params:{applyId:apply.applyId}})
          .then((res)=>{
            console.log(res)
            if(res.data.status == 1){
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.getData()
            }
            else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
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