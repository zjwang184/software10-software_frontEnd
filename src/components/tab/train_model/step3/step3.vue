
<template>
  
  <div >
    <h2>请选择用于训练的策略函数</h2>
    <br>
   
    <div class="tip">
        <p>选择用于训练的策略函数，不同策略函数代表不同强化学习模型</p>
    </div>
    <el-row style="margin-left: 40%;">
                
      <el-radio v-model="RL" label="DQN" border size="medium" >DQN</el-radio>
      <el-radio v-model="RL" label="DDQN" border size="medium" disabled>DDQN</el-radio>
     
    </el-row>
    <br /> <br />

    <el-row style="margin-left: 35%;">
                
      <el-col :span="3" :offset="1">
        <el-button type="warning" @click="() => $emit('preview', 2)">上一步</el-button>
          
      </el-col>

      <el-col :span="3" :offset="1">
          <el-button type="primary" @click="train(); " style="margin-left: 20%;">训练</el-button>
      </el-col>
      
  </el-row>
    

  </div>

</template>

<script>
import {getRequest,postRequest, trainPostRequest} from '@/api/user'
import { number } from 'echarts';

export default {
    name:"step2",
    props:{
        isChange:{
            type: Boolean,
            default: true
        },
        is_trained:{
            type: Boolean,
            
        }
    },
    data() {
      return {
        // isChange: true,

        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,

        RL: "DQN",
        model: '1',
        perform: 0,
        vloading: false,
        percentage: 0,
        
      }
    },
   
    methods: {
      formatTooltip(val) {
        return val / 100;
      },
      init(){
          this.$refs.disGroup.$el.querySelector('input').focus()
      },
     

      train(){
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
        }, Math.random()*300 + 200); // Adjust the interval duration as needed
        

        this.vloading = true;  
        console.log("step3", this.isChange);
        if (this.isChange == true){
          trainPostRequest("/runtime_bus/dqn"+"/doctor" ).then((res)=>{
                loading.close();
                this.perform = res.rate;
                console.log("perform:", this.perform);
                this.step3(this.perform * 100);
                if (this.is_trained){
                  this.vloading = false;
                }
                // this.vloading = false;
            }).catch(error=>{
                console.log(error);
            })
        }else{
          trainPostRequest("/runtime_bus/dqn"+"/model" ).then((res)=>{
                this.perform = res.rate;
                console.log("perform:", this.perform);
                this.step3(this.perform * 100);
                if (this.is_trained){
                  this.vloading = false;
                }
                // this.vloading = false;
            }).catch(error=>{
                console.log(error);
            })
        } 
           
        
      },
      step3(perform){
        console.log("step3", perform);
        this.$emit("step3", perform);
      }
      },
      preview(){
        this.$emit("preview");
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