<template>
    <main >
      <div style="text-align:center;margin:0 0 0px 0"><h2 >公告</h2></div>
      <el-table
      :data="announcementList"
      @row-click="select"
      style="width: 100%">
      <el-table-column
          prop="announcementTime"
          label=""
          align="center">
      </el-table-column>
      <el-table-column
          prop="announcementTitle"
          label=""
          align="center">
      </el-table-column>
  
      
      <el-table-column
          prop="user.name"
          label=""
          align="center">
      </el-table-column>
      </el-table>
      <el-dialog
      title="公告内容"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      center>
      <div style="text-align:center"><span>{{nowContent}}</span></div>
    </el-dialog>
    </main>
</template>
<script>
  export default {
    data() {
      return {
        announcementList:[],
        dialogVisible: false,
        nowContent:'',
        activeNames: [],
      };
    },
    methods: {
      //选中行
      select(selection, row){
        this.dialogVisible = true
        this.nowContent = selection.announcementContent
      },

      //关闭弹窗
      handleClose(){
        this.dialogVisible = false
      }
    },
    created(){
        this.axios.get('/announcement/getAllAnnouncement')
        .then((res)=>{
            if(res.data.status == 1){
              console.log(res.data.data.announcementList)
              this.announcementList =  res.data.data.announcementList
            }
        })
        .catch()
    }
  }
</script>