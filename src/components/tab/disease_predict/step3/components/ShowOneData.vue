<template>
    <div class="row-bolck" align="center">
      <el-table 
          :data="personData"
          style="width: 100%; font-size:medium"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="pregnancies"
            label="怀孕次数"
            width="170">
          </el-table-column>
          <el-table-column
            prop="glucose"
            label="血糖"
            width="170">
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="舒张压"
            width="170">
          </el-table-column>
          <!-- <el-table-column
            prop="skinThickness"
            label="皮肤厚度"
            width="170">
          </el-table-column> -->
          <el-table-column
            prop="insulin"
            label="胰岛素水平"
            width="170">
          </el-table-column>
          <el-table-column
            prop="bmi"
            label="体重指数"
            width="170">
          </el-table-column>
          <!-- <el-table-column
            prop="diabetesPedigreeFunction"
            label="糖尿病谱系功能"
            width="170">
          </el-table-column> -->
          <el-table-column
            prop="age"
            label="年龄"
            width="170">
          </el-table-column>
          
        </el-table>
    </div>
  </template>
  
  <script>
import {getRequest,postRequest} from '@/api/user'
  export default {    
    
      name:"ShowOneData",
     
      data(){
        return {   
          personData:[],
        }
      },
      methods:{
        initInfo(){
          // 该病人信息
          getRequest("/ten/data/person").then((res)=>{
            this.personData = res.data;
            console.log("personData");
            console.log(this.personData);
            console.log("personData");
          }).catch(error=>{
            console.log(error);
          })},
          tableRowClassName({row, rowIndex}) {
              if (rowIndex === 1) {
                return 'warning-row';
              } else if (rowIndex === 3) {
                return 'success-row';
              }
              return '';
            },
      },   
      mounted(){
        this.initInfo();
      } 
  
  }
  </script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
  