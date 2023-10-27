<template>
    <div class="demo-image__placeholder">
  <div class="block" style="font-size: 14px;">
    <h2>损失和奖励</h2>
    <br />
    <div class="tip">
        <p>第一幅图横轴为迭代次数，纵轴为损失</p>

        <br />
        <p>第二幅图横轴为迭代次数，纵轴为奖励</p>
        
        <br />
        <p> 若随着迭代次数的增加，损失降低，奖励升高则代表模型收敛。反之，则说明模型收敛不好可能是迭代次数的问题，也有可能是奖励设计的问题</p>
     </div> 
    <el-image :src="src" style="margin-left: 15%;"></el-image>
    <!-- <h4></h4> -->
  </div>
  <br /><br />

  <h2>模型表现</h2>
    <br />
    <div class="tip">
        <p>以饼图的形式表示模型的预测准确性</p>
     </div>

  <div class="block" style="width: 600px; height:400px">
    
    <Pie :perform="perform" style="margin-left: 40%;"></Pie>
  </div>
</div>


</template>


<script>
import Pie from "./PieChart.vue";

  export default {
    name:"train",
    props:{
      perform:{
            type: Number,
            // default: 0
        }
    },
    components:{
        Pie
    },
    data() {
      return {
        src: require("@/assets/lossreward.png"),
      }
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