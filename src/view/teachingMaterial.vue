<template>
    <main>
        <div><h2 style="text-align:center">教学资料上传</h2></div>
        <div style="width:70%;margin-top:40px">
            
            <el-form :model="fileForm" label-width="55%">
                <el-form-item label="文件描述：">
                    <el-input v-model="fileForm.describe" placeholder="请输入文件描述"></el-input>
                </el-form-item>
                
                <div style="margin:10px 0 30px 35px;width:100%">
                    
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
                    <span style="font-size:15px">选择文件：</span><el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>   
                </div>
                <el-form-item>
                    <div><el-button type="success" @click="submitFile">上传提交</el-button></div>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        fileForm:{
          describe:'',
          //文件类型，0为教学资料
          type:0,
        },
      };
    },
    methods: {

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
      uploadOnSuccess(){
        this.fileDialogVisible = false
        this.$message({
          type:"success",
          message:'上传成功'
        })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？不可逆操作`);
      },
    },
    
  }
</script>