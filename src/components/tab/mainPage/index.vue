<template>
  <div>
    <div class="topBigDiv">
      <div class="left">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>快捷入口</span>
          </div>
          <div class="quickEntryBox">
            <div v-for="(item, index) in quickEntry" :key="index">
              <div class="singleBox" @click="quickLink(index)">
                <img
                  :src="item.img"
                  class="imgStyle"
                  style="border-radius: 15px"
                />
                <div style="text-align: center">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right">
        <el-card class="card" :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统模型信息</span>
          </div>
          <el-table :data="modelInfos" stripe style="width: 100%" height="22.5vh">
            <el-table-column prop="id" label="序号" width="140"></el-table-column>
            <el-table-column prop="name" label="模型名称" width="150"></el-table-column>
            <el-table-column prop="disease" label="预测疾病" ></el-table-column>
            <el-table-column prop="dataTable" label="数据表"></el-table-column>
            <el-table-column prop="rewardType" label="奖励类型"> </el-table-column>
            <el-table-column prop="performance" label="表现性能"> </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>

    <div class="bottomBigDiv">
      <div class="left" >
        <el-card :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px',height:'48vh'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>知识界面</span>
          </div>
          <el-table :data="features" stripe style="width: 100%"   max-height="400">
            <el-table-column prop="diseaseName" label="相关疾病" width="80px"></el-table-column>
            <el-table-column prop="tableName" label="表名" width="110px"></el-table-column>
            <el-table-column prop="knowledgeType" label="知识类型" width="120px"></el-table-column>
            <el-table-column prop="riskFactorsCn" label="知识项"></el-table-column>
            <el-table-column prop="exceptionExplain" label="知识描述"> </el-table-column>
            
          </el-table>
        </el-card>
      </div>
            

      <div class="right">
        <el-card :body-style="{padding:'0',paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',height:'45.9vh',overflow:'hidden'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>各模型性能</span>
          </div>
          <div>
              <el-row>
                  <el-col :span="6">
                      <!-- 数据集: -->
                      <el-select v-model="value1" placeholder="请选择数据集" @change="selecterOne">
                          <el-option
                          v-for="item in modelTables"
                          :key="item.key"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="6" :offset="3">
                      <!-- 奖励方式:  -->
                      <el-select v-model="value2" placeholder="请选择奖励方式" @change="selecterTwo">
                        <el-option
                          v-for="item in modelRewardType"
                          :key="item.key"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="6" :offset="3">
                    <!-- 模型名称:  -->
                    <el-select v-model="value3" placeholder="请选择模型名称" @change="selecterThree">
                        <el-option
                          v-for="item in modelName"
                          :key="item.key"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                  </el-col>
              </el-row>
              <div style="width:400px;height:400px; margin-top:20px; margin-left: 20%;">
                <div id="pie" ref="pie" ></div>

                <!-- <Pie  :data="pieArray"></Pie> -->
                <!-- <div id="pie" ref="pie" ></div> -->
                <!-- <Pie v-if="piedoctor" :data="pieArray"></Pie> -->
                <!-- <PieChart 
                v-if="!pieLoading" 
                v-loading="pieLoading" 
                element-loading-text="正在获取结果"
                :data="rateCount" 
                :title="'患病风险统计'"></PieChart> -->
              </div>
          </div>
          
          
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import PieChart from '@/components/user/PieChart.vue'
import Pie from './PieChart.vue'
import {getRequest,postRequest} from '@/api/user'
import * as echarts from "echarts";
export default {
  name: "index",
  components:{PieChart: PieChart,Pie:Pie},
  data() {
    return {
      modelInfos:[],
      modelTables:[],
      modelRewardType:[],
      modelName:[],
      performance:100,
      pieArray:[],
      features:[],
      piemodel:false,
      piedoctor:true,

      currentDatabase:"",
      currentDataset:"",
      modelInfo:[],
      databaseInfo:[],
      datasetInfo:[],
      predictResult:[],
      rateCount:[],
      pieLoading: false,
      quickEntry: [
        {
          title: "知识界面",
          img: require("../../../assets/JKZX.png"),
          router: "/knowledge",
        },
        {
          title: "数据管理",
          img: require("../../../assets/datas.png"),
          router: "/datasets",
        },
        {
          title: "模型管理",
          img: require("../../../assets/models.jpg"),
          router: "/models",
        },
        {
          title: "模型训练",
          img: require("../../../assets/mutipile.png"),
          router: "/train",
        },
        {
          title: "风险预测",
          img: require("../../../assets/dataManage.png"),
          router: "/pred",
        },
        // {
        //   title: "批量预测",
        //   img: require("../../assets/batchPredict.png"),
        //   router: "/Batch",
        // },
      ],


      value1:'kaggle_diabetes',
      
      value2:'异常指标+医生',
              
      value3:'DQN',
                
    };
  },
  
  mounted() {
    
    this.initInfo();
    this.getPieArray();
  },

  methods: {
    initPie() {
          console.log("pie"+this.performance);
          // 基于准备好的dom，初始化echarts实例
          // let pie = this.$echarts.init(document.getElementById('pie'));
          var chartDom = this.$refs.pie;
          var pie = echarts.init(chartDom);
          var option = {
                  tooltip: {
                      trigger: 'item'
                  },
                  legend: {
                      top: '5%',
                      left: 'center'
                  },
                  series: [
                      {
                      name: '模型表现性能',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      itemStyle: {
                          borderRadius: 10,
                          borderColor: '#fff',
                          borderWidth: 2
                      },
                      label: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          label: {
                          show: true,
                          fontSize: 40,
                          fontWeight: 'bold'
                          }
                      },
                      labelLine: {
                          show: false
                      },
                      data: [{
                        name: "准确度",
                        value: this.performance,
                      },{
                        name: "错误率",
                        value: 100 - this.performance,
                      }]
                      }
                  ]
                  };
              option && pie.setOption(option);
              // setInterval(function() {
              //         // 读取数据库文件,更新配置
              //         console.log("pie interval:", this.data);                
                      
              //         option.series[0].data = this.data;
              //         pie.setOption(option,true);
                      
              //     }, 500);

      },
    initInfo(){
      // 所有模型信息
      // 获取模型信息
      getRequest("/ten/model/infos").then((res)=>{
        this.modelInfos = res.data;
      }).catch(error=>{
        console.log(error);
      })                  
                  // 获取模型数据表信息
                  getRequest("/ten/model/tables").then((res)=>{
                    this.modelTables = res.data;
                  }).catch(error=>{
                    console.log(error);
                  })

                  // 获取模型奖励类型信息
                  getRequest("/ten/model/reward").then((res)=>{
                    this.modelRewardType = res.data;
                  }).catch(error=>{
                    console.log(error);
                  })


                  // 获取模型名称信息
                  getRequest("/ten/model/name").then((res)=>{
                    this.modelName = res.data;
                  }).catch(error=>{
                    console.log(error);
                  })

      // 获取模型表现性能信息
      getRequest("/ten/model/show/"+this.value1+"/"+this.value2+"/"+this.value3).then((res)=>{
        this.performance = res.data;
        // console.log("performance");
        // console.log(this.performance);
        // console.log("performance");
      }).catch(error=>{
        console.log(error);
      })

      // 获取异常值特征知识信息
      getRequest("/ten/knowledge/e_features").then((res)=>{
        this.features = res.data; 
      }).catch(error=>{
        console.log(error);
      })

      // // 获取数据库信息
      // getRequest("/DataManager/database").then((res)=>{
      //   this.databaseInfo = res;
      //   if(this.databaseInfo[0].databasename){
      //     this.currentDatabase = this.databaseInfo[0].databasename;
      //     this.getDataByBase(this.databaseInfo[0].databasename);
      //   }
      // }).catch(error=>{
      //   console.log(error);
      // })
    },

    
    getPieArray(){
      getRequest("/ten/model/show/"+this.value1+"/"+this.value2+"/"+this.value3).then((res)=>{
        this.performance = res.data;
        this.initPie();
      }).catch(error=>{
        console.log(error);
      })
    },
    

    quickLink(index) {
      this.$router.push(this.quickEntry[index].router);
    },

    selecterOne(event){
      console.log('选择器一选择的值为',event,this.value1);
      this.getPieArray();
			},
    selecterTwo(event){
      console.log('选择器二选择的值为',event,this.value2);
      console.log("value2", this.value2)
      this.getPieArray();
    },
    selecterThree(event){
      console.log('选择器三选择的值为',event,this.value3);
      this.getPieArray();
    },
  },
};
</script>

<style scoped>
.topBigDiv {
  box-sizing: border-box;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topBigDiv .left {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .right {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .left .quickEntryBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  margin-top: 38px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.topBigDiv .left .quickEntryBox .singleBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
.topBigDiv .left .quickEntryBox .imgStyle {
  width: 90%;
  height: 90%;
}
.bottomBigDiv {
  box-sizing: border-box;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.bottomBigDiv .left {
  box-sizing: border-box;
  height: 100%;
  width: 49%;
  overflow: hidden;
}
.bottomBigDiv .mid {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .right {
  box-sizing: border-box;
  height: 100%;
  width: 49%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 40;
}
.card {
  padding: 0;
  height: 100%;
}
</style>
