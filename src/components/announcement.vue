<template>
    <main >
      <div style="text-align:center;margin:0 0 20px 0"><h2 >公告</h2></div>
      <div style="margin-top:10px,width:100%;height:100%">
        <el-tree
            :data="treeData"
            accordion>
        </el-tree>
      </div>
    </main>
</template>
<script>
  export default {
    data() {
      return {
        announcementList:[],
        activeNames: [],
        treeData:[],
      };
    },
    methods: {
    },
    created(){
        this.axios.get('/announcement/getAllAnnouncement')
        .then((res)=>{
            if(res.data.status == 1){
              this.announcementList = res.data.data.announcementList
              this.announcementList.forEach(element => {
                var json = {label: element.announcementTitle, children: [{label:element.announcementContent}]}
                this.treeData.push(json)
              });
            }
        })
        .catch()
    }
  }
</script>