<template>
<main>
    <div style="text-align:center;margin:0 0 20px 0"><h2 >报告列表</h2></div>
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
        label="上传时间">
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
          this.axios.get('/report/getAllReport')
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