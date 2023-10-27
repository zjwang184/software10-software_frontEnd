
<template>  
  <div >   
    <h2 margin-left= "25%">请设置奖励函数，具体如下（默认值由模型得到）：</h2>
          <br />
    <div class="tip">
        <p>在这里各个字段的默认值是由xgboost预测疾病时得到的各特征危险程度的比例值</p>
        <br />
        <p>医生可以根据自身的经验为不同重要特征设置不同程度奖励，引导强化学习</p>
     </div> 
     

    <!-- <el-row v-for="(item, index) in newRunData" :key="index">
      <el-col :span="4"><span class="demonstration">{{ item.riskFactor }}</span></el-col>
      <el-col :span="16"><el-slider v-model="item.rate" :format-tooltip="formatTooltip" @change="updateRate(1, value1)"></el-slider></el-col>      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ item.rate }}%</el-col>
    </el-row> -->

    <!-- <el-row >
      <el-col :span="4"><span class="demonstration">2小时血浆葡萄糖浓度</span></el-col>
      <el-col :span="16"><el-slider v-model="value2" :format-tooltip="formatTooltip" @change="updateRate(2, value2)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value2 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">舒张压(mm Hg)</span></el-col>
      <el-col :span="16"><el-slider v-model="value3" :format-tooltip="formatTooltip" @change="updateRate(3, value3)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value3 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">三头肌皮肤褶皱厚度(mm)</span></el-col>
      <el-col :span="16"><el-slider v-model="value4" :format-tooltip="formatTooltip" @change="updateRate(4, value4)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value4 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">2小时血清胰岛素</span></el-col>
      <el-col :span="16"><el-slider v-model="value5" :format-tooltip="formatTooltip" @change="updateRate(5, value5)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value5 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">体重指数</span></el-col>
      <el-col :span="16"><el-slider v-model="value6" :format-tooltip="formatTooltip" @change="updateRate(6, value6)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value6 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">糖尿病谱系显示患糖尿病概率</span></el-col>
      <el-col :span="16"><el-slider v-model="value7" :format-tooltip="formatTooltip" @change="updateRate(7, value7)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value7 }}%</el-col>
    </el-row>

    <el-row >
      <el-col :span="4"><span class="demonstration">年龄</span></el-col>
      <el-col :span="16"><el-slider v-model="value8" :format-tooltip="formatTooltip" @change="updateRate(8, value8)"></el-slider></el-col>
      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ value8 }}%</el-col>
    </el-row> -->
    <el-row v-for="(item, index) in newRunData" :key="index">
      <el-col :span="4">        <span class="demonstration">{{ item.riskFactor }}</span>      </el-col>
      <el-col :span="16">
        <!-- 使用v-model绑定item.rate -->
        <el-slider v-model="newRunData[index].rate" :format-tooltip="formatTooltip" @change="updateRate(index + 1, item.rate)"></el-slider>
      </el-col>      
      <el-col :span="4"> &nbsp;  &nbsp; &nbsp;{{ item.rate }}%</el-col>
    </el-row>
    
    <el-row style="margin-left: 35%;">
                
        <el-col :span="3" :offset="1">
            <el-button type="warning" @click="() => $emit('preview', 1)">上一步</el-button>
            
        </el-col>

        <el-col :span="3" :offset="1">
            <el-button type="primary" @click="step2();" style="margin-left: 40%;">下一步</el-button>
        </el-col>
        
    </el-row>
    
  </div>

</template>

<script>

import {getRequest,postRequest} from '@/api/user'

export default {
    name:"step2",
    data() {
      return {
        newRunData:[],
        diseaseData:[],
        perform: [],
        isChange:false,

        value1: 9,
        value2: 24,
        value3: 9,
        value4: 10,
        value5: 10,
        value6: 15,
        value7: 10,
        value8: 14,
      }
    },
    mounted(){
      this.initModelRate();
    },
    methods: {
      initModelRate(){
            getRequest("/ten/knowledge/rates").then((res)=>{
                this.newRunData = res.data;
                console.log("train step2 newRunData:", this.newRunData);
                this.newRunData = JSON.parse(JSON.stringify(this.newRunData));
               
                for (const key in this.newRunData) {
                  
                  console.log("rate key ===========", this.newRunData[key]["rate"]);
                  this.newRunData[key]["rate"] = Number(this.newRunData[key]["rate"]);                    
                  
                }
                // const _data = Object.entries(this.newRunData);
                // _data.forEach((item, index) => {
                //   this.diseaseData.push({value: item[1], name: item[0], id: index + 1, swapped: false})
                // })

                // console.log("train step2 data:", this.diseaseData);
            }).catch(error=>{
                console.log(error);
            })
        },
      
      formatTooltip(val) {
        return val / 100;
      },
      
      step2(isChange){
        console.log(isChange)
        this.$emit("step2", isChange);
      },
      updateRate(row, updatedValue){
        console.log(row);
        this.isChange=true;
        
        let formData = new FormData();

        // formData.append("ruleForm", JSON.stringify(this.ruleForm))

        // console.log(formData);
        formData.append("id", row);
        formData.append("doctorRate", updatedValue / 100);
        //     console.log(key, formData.get(key));
        //     console.log(typeof key, typeof formData.get(key));
        
        
        const dictionary = {};
        for (const [key, value] of formData.entries()) {
            dictionary[key] = value;
            console.log(typeof dictionary);
            console.log(dictionary);
        }
        // console.log("=======")
        // console.log(formData)
        postRequest("/ten/knowledge/updateDoctorRate", dictionary)
        // postRequest("/ten/data/update_person2", formData)
      
        console.log("===", row, updatedValue / 100);
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
