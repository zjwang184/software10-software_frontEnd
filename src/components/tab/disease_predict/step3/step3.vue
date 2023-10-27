
<template>
  
  <div class="container">
    
    <div class="left">
      <Radar ></Radar>
    </div> 
    <div  class="right">
      <el-card class="box-card">
        <h2 v-if="pred === 100" style="color:red" align="center">高风险</h2>
        <h2 v-if="pred === 0" style="color:rgb(0, 255, 76)" align="center">低风险</h2>
        <div v-for="item, index in cardItems" :key="index" class="text item">
          <el-card shadow="hover">
            <!-- 血糖：血液中血糖（血糖浓度）的正常范围通常是空腹血糖浓度在70 mg/dL（3.9 mmol/L）到99 mg/dL（5.5 mmol/L）之间，随机血糖浓度在小于140 mg/dL（7.8 mmol/L）的范围内。 -->
            {{ item }}
          </el-card>
        </div>
        
      </el-card>
    </div> 
    
  </div>

</template>

<script>
import Radar from './components/radar.vue'
import {getRequest,postRequest} from '@/api/user'


export default {
  props:{
        pred:{
            type: Number,
            // default: 0
        }
    },
    name:"step3",
    components:{Radar:Radar},
    data(){
      return {
        risk: "高风险", 
        cardItems:[]
      }
    },
    methods:{
      

      getKnowledge(){
        // 获取模型信息
        getRequest("/ten/knowledge/featuresKnowledge", {"disease": "糖尿病"}).then((res)=>{
          console.log(this.pred);
            this.cardItems = res.data;
            console.log(123);
            console.log(this.cardItems);
            console.log(123);
          }).catch(error=>{
            console.log(error);
          })
        },
      
    },
    mounted(){
      this.getKnowledge();
    }


}
</script>

<style scoped>
  .container {
  /* border: 1px solid rgb(231, 229, 229); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #516; */
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  } 
  
  .left {
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    flex: 1;
  }
  .right {

    background-color: rgb(240, 240, 240);
    flex: 1;
    /* border: 1px solid rgb(231, 229, 229); */
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  /* .box-card {
     width: 480px;
  } */

</style>