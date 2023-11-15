<template>
  <div class="predict_page">
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step title="任务日志"></el-step>
        <el-step title="输入数据"></el-step>
        <el-step title="选择算法"></el-step>
        <el-step title="结果"></el-step>
      </el-steps>
    </div>
    <br /><br />

    <div class="content" v-if="active === 0">
      <step0 @step0="handleStep0Run"> </step0>
    </div>
    <div class="content" v-if="active === 1">
      <step1 @step1="handleStep1Run"></step1>
    </div>
    <div class="content" v-if="active === 2">
      <step2 @step2="handleStep2Run"></step2>
    </div>
    <!-- <div class="content" v-if="active === 3"> -->

    <div v-if="active === 3">
      <div ref="contentToCapture">
        <ShowOneData></ShowOneData>
        <br /><br /><br />

        <step3 :pred="pred"></step3>
      </div>
      <br />
      <!-- <el-button type="success" @click="preview(1)" style="margin-left: 47%;margin-top: 20px" round>完成</el-button> -->
      <el-button type="success" @click="captureAndSave()" style="margin-left: 47%;margin-top: 20px"
        round>保存结果</el-button>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
  import step0 from "./step0.vue"
  import step1 from "./step1.vue"
  import step2 from "./step2.vue"
  import step3 from "./step3/step3.vue"
  import ShowOneData from "./step3/components/ShowOneData.vue"
  import html2canvas from 'html2canvas'

  export default {
    name: "predPredict",
    components: {
      step0,
      step1,
      step2,
      step3,
      ShowOneData
    },
    data () {
      return {
        // model: "",
        pred: 1,
        active: 0,
      }
    },
    methods: {
      handleStep0Run () {
        this.active = 1
      },
      handleStep1Run () {
        this.active = 2
      },
      handleStep2Run (pred) {
        // this.model = model;
        console.log("hand pred:", pred)
        this.pred = pred
        this.active = 3
      },
      handleStep3Run () {
        this.active = 1
      },
      preview (type) {
        this.active = type
      },

      async captureAndSave () {
        const contentElement = this.$refs.contentToCapture
        const canvas = await html2canvas(contentElement)

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png')

        // Create a link element to trigger the download
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'captured_page.png'
        link.click()
      },
    },
  }

</script>

<style scoped>
  .predict_page {
    margin-left: 10%;
    margin-right: 10%;
  }
</style>