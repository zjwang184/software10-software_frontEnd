<template>
  <div>
    <div class="container">
      <div style="font-size: 50px">医学知识引导的多病种疾病风险预测强化学习工具软件</div>
      <div class="size-icon">
        <div v-for="(item, index) in quickEntry" :key="index" class="icon">
          <div class="singleBox" @click="quickLink(index)">
            <img 
              :src="item.img"
              class="imgStyle"
              style="border-radius: 15px; width: 200px; height: 200px;"
            />
            <h3 style="font-size: 30px">{{ item.title }}</h3>
          </div>
        </div>
        <!-- <div class="icon">
          <img src="@/assets/book.png" alt="健康资讯">
          <h3 style="font-size: 30px">健康资讯</h3>
        </div>
        <div class="icon">
          <img src="@/assets/model_intro.png" alt="模型训练">
          <h3 style="font-size: 30px">模型训练</h3>
        </div>

        <div class="icon">
          <img src="@/assets/danLiYuCe.png" alt="风险预测">
          <h3 style="font-size: 30px">风险预测</h3>
        </div>
        <div class="icon">
          <img src="@/assets/batch.png" alt="批量预测">
          <h3 style="font-size: 30px">批量预测</h3>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  data(){
    return {
      quickEntry: [
        {
          title: "首页展示",
          img: require("@/assets/menu.png"),
          router: "/dash",
        },
        {
          title: "医学知识",
          img: require("@/assets/medical_kg.png"),
          router: "/knowledge",
        },
        {
          title: "模型训练",
          img: require("@/assets/danLiYuCe.png"),
          router: "/train",
        },
        {
          title: "风险预测",
          img: require("@/assets/batch.png"),
          router: "/pred",
        },
      ],
    }
  },

  methods:{
    quickLink(index) {
      this.$router.push(this.quickEntry[index].router);
    },
  }
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-flow: column;
}
.size-icon {
  font-size: 80px;
  display: grid;

  grid-template-columns: repeat(2, 300px);
  grid-template-rows: repeat(2, 300px);
  gap: 5px;
  justify-items: center;
  align-items: center;
}
.icon {
  display: grid;
  place-items: center;
  text-align: center;
}
.icon svg-icon {
  max-width: 100%;
  vertical-align: middle;
}
.icon h3 {
  margin-top: 10px;
}
</style>