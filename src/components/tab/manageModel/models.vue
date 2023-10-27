<template>
    <div>
      <!--===============================  头部按钮   ======================================================================-->
      <div id="top_buttons">
        <div id="model_state">
          <span>疾病名称：</span>
          <el-select v-model="disease_name" placeholder="请选择" @change="handleSelectionChange">
            <el-option
              v-for="item in diseases"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
  
        
        <el-button size="small" @click="searchByDisease(disease_name)" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button size="small" @click="clearFilter" type="primary" icon="el-icon-delete">清除</el-button>
        <el-button id="uploadButton" type="warning" size="middle" @click="uploadFile()">上传<i class="el-icon-upload el-icon--right"></i></el-button>

      </div>
  
      <!--===============================   表格    ========================================================================-->
      <div id="table">
        <el-table
          :data="models"
          style="width: 100%; text-align: center"
          stripe
          :cell-style="{ padding: '8px 0', textAlign: 'center' }"
          row-key="id"
          :header-cell-style="{
            background: '#58AAFF',
            color: '#fff',
            lineHeight: '12px',
            padding: '0px',
            height: '34px',
            textAlign: 'center',
          }"
        >
          <el-table-column label="序号" prop="id" width="80"> </el-table-column>
          <el-table-column label="模型名称" prop="modelName" width="150" show-overflow-tooltip> </el-table-column>
          <el-table-column label="疾病名称" prop="disease" width="150"> </el-table-column>
          <el-table-column label="表名" prop="tableName" width="150" show-overflow-tooltip> </el-table-column>

          <el-table-column label="使用特征列" prop="features" width="150">
          </el-table-column>
          <el-table-column label="创建者" prop="creator" width="150">
          </el-table-column>
          
          <el-table-column label="备注" prop="remark" > 
            <!-- show-overflow-tooltip -->
          </el-table-column>
          
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params.pageNum"
          :page-size="params.pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
  
      <!--===============================     编辑表单   ===================================================================-->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm" ref="dialogFormRef" :rules="rules" label-width="80px">
          <el-form-item label="模型名称" prop="modelName">
            <el-input v-model="dialogForm.modelName"></el-input>
          </el-form-item>
          
          <el-form-item label="疾病名称" prop="disease">
            <el-input v-model="dialogForm.disease"></el-input>
          </el-form-item>
          <el-form-item label="表名" prop="tableName">
            <el-input v-model="dialogForm.tableName"></el-input>
          </el-form-item>
          <el-form-item label="使用特征列" prop="features">
            <el-input v-model="dialogForm.features"></el-input>
          </el-form-item>

          
          <el-form-item label="创建者" prop="creator">
            <el-input v-model="dialogForm.creator"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dialogForm.remark"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('dialogFormRef')" size="small">清空</el-button>
          <el-button type="primary" @click="submitForm('dialogFormRef')" size="small">保存</el-button>
        </div>
      </el-dialog>

      <!--===============================     上传表单   ===================================================================-->
      <el-dialog align="center" title="上传" :visible.sync="uploadVisible">
        <el-form :model="uploadForm" ref="uploadFormRef" :rules="rules2" label-width="80px">
          
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            multiple 
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <!-- 使用 style 属性来设置按钮的样式  -->
            <el-button slot="trigger" size="large" type="primary" style="text-align: right; padding-right: 10px;">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">只能上传py文件</div>
            <br />

          </el-upload>

          <br />
          <el-form-item label="模型名称" prop="uploadModelName">
            <el-input v-model="uploadForm.uploadModelName"></el-input>
          </el-form-item>
          <el-form-item label="疾病名称" prop="uploadDiseaseName">
            <el-input v-model="uploadForm.uploadDiseaseName"></el-input>
          </el-form-item>
          <el-form-item label="表名" prop="uploadTableName">
            <el-input v-model="uploadForm.uploadTableName"></el-input>
          </el-form-item>
          <el-form-item label="特征列名称" prop="uploadFeatures">
            <el-input v-model="uploadForm.uploadFeatures"></el-input>
          </el-form-item>
          
          <el-form-item label="创建者" prop="uploadCreator">
            <el-input v-model="uploadForm.uploadCreator"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="uploadRemark">
            <el-input v-model="uploadForm.uploadRemark"></el-input>
          </el-form-item>
          
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetuploadForm()" size="small">清空</el-button>
          <el-button type="primary" @click="submituploadForm();confirmUpload()" size="small">保存</el-button>
        </div>
      </el-dialog>




    </div>
  </template>
  
<script>
import {getRequest,postRequest2} from '@/api/user'

export default {
    data() {
      return {
        params: {
          pageNum: 1,
          pageSize: 10
        },
        activeName: "first",
        
        
        // 数据集
        models:[],
        diseases:[],
        disease_name: "", 
        id:0,

        /* 上传文件 */
        fileList:[],
        /* 上传设置-显示 */
        // isFileSet:false,
        uploadVisible:false,
        
        uploadForm: {
          uploadModelName: "",
          uploadTableName: "",
          uploadDiseaseName: "",
          uploadCreator:"",
          uploadRemark:"",
          uploadFeatures:""
        },
        rules2: {
          uploadModelName: [
            {
              required: true,
              message: "请输入模型的名称",
              trigger: "blur",
            },
          ],
          uploadTableName: [
            {
              required: true,
              message: "请输入表的名称",
              trigger: "blur",
            },
          ],
          uploadDiseaseName: [
            {
              required: true,
              message: "请输入疾病名称",
              trigger: "blur",
            },
          ],
          uploadCreator: [
            {
              required: true,
              message: "请输入创建者名称",
              trigger: "blur",
            },
          ]
        },
  
        tableData: [],        
        total: 0,
        search: "",
        dialogFormVisible: false,
        dialogForm: {
          danger: "",
          illnessName: "",
        },
        editIndex: -1,
        rules: {
          tableName: [
            {
              required: true,
              message: "请输入表的名称",
              trigger: "blur",
            },
          ],
          disease: [
            {
              required: true,
              message: "请输入疾病名称",
              trigger: "blur",
            },
          ],
          features: [
            {
              required: true,
              message: "请输入特征列名称",
              trigger: "blur",
            },
          ],
          creator: [
            {
              required: true,
              message: "请输入创建者名称",
              trigger: "blur",
            },
          ],
          modelName: [
            {
              required: true,
              message: "请输入模型名称",
              trigger: "blur",
            },
          ]
        },
      };
    },
    mounted() {
      this.getList()
    },
    methods: {
      

      getList() {
        
        getRequest("/ten/models/all").then((res)=>{
          
          this.models = res.data; 
          this.total  = res.data_length;
          
        }).catch(error=>{
          console.log(error);
        })

        getRequest("/ten/models/disease").then((res)=>{
          this.diseases = res.data; 
          
        }).catch(error=>{
          console.log(error);
        })
      },
      searchByDisease(disease_name){
        getRequest("/ten/models/search", {"disease_name" :disease_name}).then((res)=>{
          
          this.models = res.data; 
          this.total = res.data_length;
          
        }).catch(error=>{
          console.log(error);
        })
      },
      handleEdit(index, row) {
        this.dialogForm = Object.assign({}, row);
        this.editIndex = index;
        this.dialogFormVisible = true;
        this.id = row.id;
        console.log(this.id);
        
      },

      /* 指定位置，删除指定数组的一个元素 */
      handleDelete(index, id) {
        console.log("delete", index, id);
        this.models.splice(index, 1);

        getRequest("/ten/models/delete/" + id).then((res)=>{
          
          console.log("删除成功")
          
        }).catch(error=>{
          console.log(error);
        })
      },

      handleSelectionChange() {
        console.log("选中的值为：", this.disease_name);
      },

      /* 清除下拉框选中 */
      clearFilter() {
        this.disease_name = "";        
      },

      resetuploadForm() {        
        this.uploadForm.uploadModelName="";
        this.uploadForm.uploadTableName="";
        this.uploadForm.uploadDiseaseName="";
        this.uploadForm.uploadCreator="";
        this.uploadForm.uploadRemark="";
      },
      submituploadForm() {
        this.$refs.uploadFormRef.validate((valid) => {
          if (valid) {
            getRequest("/ten/models/saveUpload", {   
              "modelName": this.uploadForm.uploadModelName,           
              "tableName" :this.uploadForm.uploadTableName,
              "disease":this.uploadForm.uploadDiseaseName,
              "features":this.uploadForm.uploadFeatures,
              "creator":this.uploadForm.uploadCreator,
              "remark": this.uploadForm.uploadRemark
            }).then((res)=>{
              
                this.models = res.data; 
                this.total = res.data_length;                
              }).catch(error=>{
                console.log(error);
              })
            this.uploadVisible = false;
            this.resetuploadForm();
          } else {
            console.log("submit failed");
          }
        });
      },

      resetForm() {
        this.dialogForm.tableName = "";
        this.dialogForm.disease = "";
        this.dialogForm.features = "";
        this.dialogForm.creator = "";
        this.dialogForm.remark = "";
      },
      submitForm() {
        console.log("editIndex:", this.editIndex);
        console.log("tableData:", this.tableData);
  
        this.$refs.dialogFormRef.validate((valid) => {
          if (valid) {
            if (this.editIndex !== -1) {
              // console.log(this.editIndex, " ========");
              this.models[this.editIndex].tableName = this.dialogForm.tableName;
              this.models[this.editIndex].modelName = this.dialogForm.modelName;
              this.models[this.editIndex].disease = this.dialogForm.disease;
              this.models[this.editIndex].features = this.dialogForm.features;
              this.models[this.editIndex].creator = this.dialogForm.creator;
              this.models[this.editIndex].remark = this.dialogForm.remark;
              
              console.log("submitForm", this.editIndex);
              getRequest("/ten/models/update", {
                "id": this.id,
                "modelName": this.dialogForm.modelName,
                "tableName" :this.dialogForm.tableName,
                "features" :this.dialogForm.features,
                "disease":this.dialogForm.disease,
                "creator":this.dialogForm.creator,
                "remark": this.dialogForm.remark
              }).then((res)=>{
                console.log("submitForm", this.models);
                  this.models = res.data; 
                  this.total = res.data_length;
                  
                }).catch(error=>{
                  console.log(error);
                })

            } else {
              this.models.push({
                tableName: this.dialogForm.tableName,
                disease: this.dialogForm.disease,
                creator: this.dialogForm.creator,
              });
            }
            this.dialogFormVisible = false;
            this.editIndex = -1;
            this.resetForm();
          } else {
            console.log("submit failed");
          }
        });
      },
      handleSizeChange(size) {
        this.params.pageNum = 1;
        this.params.  pageSize = size;
        this.getList();
      },
      handleCurrentChange(val) {
        this.params.pageNum = val;
        this.getList();
      },
      uploadFile(){
        this.uploadVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleChange(file, fileList) { //文件数量改变
					this.fileList = fileList;
      },

      confirmUpload() { //确认上传
          var headers = {
            "Content-Type": "multipart/form-data"
          };
          var param = new FormData();
          console.log(this.fileList);
          this.fileList.forEach((val, index) => {
            console.log(val.raw);
            param.append("file", val.raw);
            console.log(param);
          });

          console.log("params=====", param);
          postRequest2("/ten/models/upload", param, headers).then((res) => {
              this.models = res.data; 
              this.total = res.data_length;
          }).catch(error => {
              console.log(error);
          });

          this.$message({
              message: "上传成功！",
              duration: 1000
          });
      }

    },
  };
  </script>
  
  <style scoped>
  #top_buttons > * {
    display: inline-block;
  }
  
  #model_state {
    margin-right: 40px;
  }
  
  #model_type {
    margin-right: 20px;
  }
  
  #top_right_buttons {
    float: right;
    margin-right: 100px;
  }
  
  #table {
    margin-top: 10px;
  }

  #uploadButton{
    float: right;
    margin-right: 5vw;
    
  }
  </style>
  