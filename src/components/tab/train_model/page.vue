<template>
    <div class="predict_page" >
        <div class="step">
            <el-steps :active="active" finish-status="success">
                <el-step title="选择数据集"></el-step>
                <el-step title="设计奖励"></el-step>
                <el-step title="策略函数选择"></el-step>
                <el-step title="训练结果"></el-step>
            </el-steps>
        </div>
        <br /><br />

        <div class="content" v-if="active === 1">
            <step1 @step1="handleStep1Run"  ></step1>
        </div>
        <div class="content" v-if="active === 2">
          <step2 @step2="handleStep2Run" @preview="handleReturnPre"></step2>
        </div>
        <!-- <div class="content" v-if="active === 3"> -->

          <div  v-if="active === 3">               
            
            <step3 @step3="handleStep3Run" @preview="handleReturnPre" 
                  :isChange="isChange"
                  :is_trained="is_trained"></step3>  
            
            <br />
            
          </div>
          <div  v-if="active === 4">   
            <div  ref="contentToCapture">             
              <train :perform="perform" ></train>             
            </div>           
            <br />
            <el-button type="success" @click="captureAndSave()" style="margin-left: 47%;margin-top: 20px" round>保存结果</el-button>
          
          </div>
          

        <!-- </div> -->
    </div>
</template>

<script>
import step1 from "./step1/step1.vue";
import step2 from "./step2.vue";
import step3 from "./step3/step3.vue";
import train from "./step3/train.vue";
import html2canvas from 'html2canvas';

export default {
  name: "predPredict",
  components: {
    step1,
    step2,
    step3,
    train,
  },
  data() {
    return {
      active: 1,  
      is_trained: false,
      
      isChange: true,
      perform:50
    };
  },
  methods:{
    handleStep1Run() {    
        this.active = 2;          
    },
    handleStep2Run(isChange) {  
        this.isChange = isChange; 
        this.active = 3;          
    },
    handleStep3Run(perform) {    
        // this.active = 1;  
        console.log("hand3 perform", perform)
        this.perform=perform;
        this.is_trained=true;
        this.active = 4;       
    },
    
    handleReturnPre(type) {
      this.active = type;
    },

    async captureAndSave() {
      const contentElement = this.$refs.contentToCapture;
      const canvas = await html2canvas(contentElement);

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'captured_page.png';
      link.click();
    },
  },
}

</script>

<style scoped>
  .predict_page{
    margin-left: 10%;
    margin-right: 10%;
  }


</style>