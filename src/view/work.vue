<template>
  <el-container>
    <el-main>
        <div style="text-align:center;margin:0 0 20px 0"><h2>作业管理</h2></div>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="序号"
            type="index"
            align="center">
            </el-table-column>
            <el-table-column
                prop="fileDescribe"
                label="作业描述"
                align="center">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名"
                align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="warning"
                    plain
                    @click="update(scope.row)"
                    >修改</el-button> 
                    <el-button
                    size="small"
                    type="danger"
                    plain
                    @click="deleteFile(scope.row)"
                    >删除</el-button> 
                    <el-button
                    size="small"
                    type="primary"
                    plain
                    @click="downloadFile(scope.row)"
                    >下载查看</el-button> 
                </template>
            </el-table-column>
        </el-table>

        <el-button type="success" @click="newFileDialogVisible = true" style="margin-top:20px">发布作业</el-button>

        <el-dialog
        title="请填写描述"
        :visible.sync="fileDialogVisible"
        width="50%">
        <el-form :model="fileForm" label-width="15%">
                <el-form-item label="文件描述：">
                    <el-input v-model="fileForm.describe" placeholder="请输入文件描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="padding-left:160px"><el-button type="primary" @click="submitUpdate">修改</el-button></div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="请填写描述并选择上传文件"
        :visible.sync="newFileDialogVisible"
        width="60%">
            <el-form :model="fileForm" label-width="25%">
                <el-form-item label="文件描述：">
                    <el-input v-model="fileForm.describe" placeholder="请输入文件描述"></el-input>
                </el-form-item>
                <div style="margin:10px 0 30px 116px;text-align:left">
                    <el-upload
                    :action="'http://localhost:8888/internship/file/uploadFile/'"
                    name="multipartFile" 
                    :auto-upload=false
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="uploadOnSuccess"
                    :limit="1"
                    :data="{fileDescribe:fileForm.describe,type:fileForm.type}"
                    ref="upload"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    选择文件：<el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>   
                </div>
                <el-form-item>
                    <div><el-button type="primary" @click="submitFile">上传提交</el-button></div>
                </el-form-item>
            </el-form>
        </el-dialog>
        </el-main>
  </el-container>
</template>
<script>
export default {
    data(){
        return {
          tableData: [],
          fileDialogVisible : false,
          newFileDialogVisible:false,
          fileId:'',
          fileList: [],
          fileForm:{
              describe:'',
              type:1,
          }
        }
    },
    methods:{
        update(file){
            console.log(file)
            this.fileDialogVisible = true
            this.fileForm.describe = file.fileDescribe
            this.fileId = file.fileId
        },
        uploadOnSuccess(){
            console.log('成功')
            this.newFileDialogVisible = false
            this.getData()
            this.$message({
            type:"success",
            message:'发布成功'
            })
        },
        //下载文件
        downloadFile(file){
            this.axios.post('/file/downloadFile/',{filePath:file.filePath},{
                responseType: 'blob'
            })
            .then((res)=>{
                console.log(res)
                 if (window.navigator.msSaveBlob) {
                    try {
                    const blobObject = new Blob([res.data]);
                    window.navigator.msSaveBlob(blobObject, file.fileName);
                    } catch (e) {
                    console.log(e);
                    }
                } else {
                    const blob = res.data;
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                    const a = document.createElement('a');
                    a.download = file.fileName;
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    }
                }

            })
            .catch()

        },
        deleteFile(file){
            this.axios.get('/file/deleteFile',{params:{fileId:file.fileId}})
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
        submitUpdate(){
            this.axios.post('/file/updateFile',{fileId:this.fileId,fileDescribe:this.fileForm.describe})
            .then((res)=>{
                if(res.data.status == 1){
                    this.$message({
                    type:"success",
                    message:res.data.msg
                    })
                    this.getData()
                    this.fileDialogVisible = false
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
            this.axios.get('/file/getAllWorkFile')
            .then((res)=>{
                this.tableData = res.data.data.fileList
                console.log(res)
            })
            .catch()
        },
        //保存文件
        submitFile(){
            this.$refs.upload.submit();
        },

        //以下是文件上传控制方法
        handleRemove(file, fileList) {},
        handlePreview(file) {
            console.log(file);
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？不可逆操作`);
        },
    },
    created(){
      this.getData()
    }

}
</script>