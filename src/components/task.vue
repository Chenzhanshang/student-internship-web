<template>
<main>
    <div style="text-align:center;margin:0 0 20px 0"><h2 >实习任务查看</h2></div>
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
          this.axios.get('/task/getAllTask')
          .then((res)=>{
            this.tableData = res.data.data.taskList
          })
          .catch()
      },

     
    },
    created(){
        this.getData()
    }
  }
</script>