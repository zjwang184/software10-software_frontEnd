<template>

<div>
    <h2 margin-left= "25%">请选择使用何种模型进行预测：</h2>
    <br>
    <div class="tip">
        <p>这里可查看系统的强化学习模型信息，选择一个你认为适合的模型进行预测</p>
    </div>

    <!-- v-loading="loading" -->
    <el-table
      :data="tableData"
      
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="模型id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="模型名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="预测疾病">
              <span>{{ props.row.disease }}</span>
            </el-form-item>
            <el-form-item label="数据表">
              <span>{{ props.row.dataTable }}</span>
            </el-form-item>
            <el-form-item label="奖励类型">
              <span>{{ props.row.rewardType }}</span>
            </el-form-item>
            <el-form-item label="表现性能">
              <span>{{ props.row.performance }}%</span>
            </el-form-item>
            
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="模型id"
        prop="id">
      </el-table-column>
      <el-table-column
        label="模型名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="模型性能"
        prop="performance">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleRun(scope.$index, scope.row)">运行</el-button>
            
        </template>
        </el-table-column>

    </el-table>
</div>
  </template>
  
  <style>
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  </style>
  
  <script>
  import {getRequest,postRequest,trainPostRequest} from '@/api/user'
    export default {
      data() {
        return {
          pred: 0,
          loading: false,
          tableData: [],
          percentage: 0
        }
      },
      mounted(){
        this.initInfo();
      },
      methods:{
        initInfo(){
          // 获取模型信息
          getRequest("/ten/model/infos").then((res)=>{
            this.tableData = res.data;
            console.log(123);
            console.log(this.tableData);
            console.log(123);
          }).catch(error=>{
            console.log(error);
          })},
        handleRun(index, row) {
         
          /* 进度条[start] */
          const loading = this.$loading({
            lock: true,
            text: '进度：[' + this.percentage + '%]',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });

          const intervalId = setInterval(() => {
            if (this.percentage < 99) {
              this.percentage += 1;
              loading.setText('进度：[' + this.percentage + '%]');
            } else {
              clearInterval(intervalId);            
            }
          }, Math.random() * 50 + 15); // Adjust the interval duration as needed
          /* 进度条[end] 关闭在下方 */

          this.loading = true;
            // alert(index, row);
            var alg = "doctor";
            if (row == 0){
              alg = "doctor";
            }else{
              alg="model";
            }  

            trainPostRequest("/runtime_bus/dqn_pred/"+alg).then((res)=>{
                    // console.log("res", res);
                    // console.log(res.data)
                    this.pred = res.model;
                    this.percentage = 100;
                    loading.setText('进度：[' + this.percentage + '%]');
                    loading.close();/* 进度条关闭 */
                    console.log("pred:", this.pred);
                    this.$emit('step2', this.pred);
                }).catch(error=>{
                    console.log(error);
                })

            

        },
      }
    }
  </script>

<style scoped>
.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    /* margin-left: 10%;
    margin-right: 10%; */
}

</style>