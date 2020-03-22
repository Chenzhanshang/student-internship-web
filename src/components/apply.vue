<template>
<main>
    <div style="text-align:center;margin:0 0 20px 0"><h2 >自主实习申请/历史</h2></div>
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
        <el-table-column
        property="state"
        align="center"
        label="申请状态">
        </el-table-column>
    </el-table>
    <el-button type="success" @click="applyVisible = true" style="margin-top:20px">发起申请</el-button>
    <el-dialog
    title="请填写申请信息"
    :visible.sync="applyVisible"
    width="50%">
    <el-form :model="applyForm" label-width="18%">
            <el-form-item label="公司名称：">
                <el-input v-model="applyForm.companyName" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="公司地点：">
                <el-input v-model="applyForm.companySite" placeholder="请输入公司地点"></el-input>
            </el-form-item>
            <el-form-item label="公司联系电话：">
                <el-input v-model="applyForm.companyPhone" placeholder="请输入公司联系电话"></el-input>
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
        applyVisible:false,
        applyForm:{
            companyName:'',
            companySite:'',
            companyPhone:'',
        },
        tableData: [],
      }
    },

    methods: {
      submit(){
          this.axios.post('/apply/insertApply',{companyName:this.applyForm.companyName,
            companySite:this.applyForm.companySite,
            companyPhone:this.applyForm.companyPhone,
            user:{userId:JSON.parse(localStorage.user).userId}})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    });
                    this.applyVisible = false
                    this.getData()
                }
            })
            .catch()
      },
      getData(){
          this.axios.get('/apply/getUserApply',{params:{userId:JSON.parse(localStorage.user).userId}})
          .then((res)=>{
            this.tableData = res.data.data.applyList
          })
          .catch()
      },
    },
    created(){
        this.getData()
    }
  }
</script>