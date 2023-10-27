<template>
    <div id="radar" ref="radar" :style="{ width: '600px', height: '400px' }"></div>
</template>

<script>
import * as echarts from "echarts";
import {getRequest,postRequest} from '@/api/user'

export default {
    name: "Radar",
    data(){
        return {
            personData:[], 
            
        }
    },
    methods: {
        initInfo(){
          // 该病人信息
          getRequest("/ten/data/personData").then((res)=>{
            this.personData = res.data;
            console.log("personData2");
            console.log(this.personData);
            console.log("personData2");

            this.drawLine();
          }).catch(error=>{
            console.log(error);
          })
        },
          

        drawLine() {
            console.log("radar", this.personData);
        // 基于准备好的dom，初始化echarts实例
        let radar = this.$echarts.init(document.getElementById('radar'));
        var option={
            title:{
                text:'健康信息'
            },
            tooltip:{
                trigger:'axis'
            },
            legend: {
                data: ['最低','本人', '最高']
            },
            polar:[{
                indicator:[//雷达图的指示器，用来指定雷达图中的多个变量（维度）,跟data中 value 对应
                        { text: '怀孕次数', max: 20},
                        { text: '血糖', max: 300},// 指示器名称,指示器的最大值，可选，建议设置
                        { text: '血压', max: 200},
                        { text: '皮肤厚度', max: 100},
                        { text: '胰岛素水平', max: 900},
                        { text: '体重指数', max: 90},
                        { text: '糖尿病谱系功能', max: 2.5},
                        
                        { text: '年龄', max: 120}
                    ]}],
            calculable:true,
            series:[
                {
                    name:'本人异常信息',
                    symbol: 'none',//去掉拐点的圈
                    center: ['50%', '50%'],// 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
                    radius:160,// 圆的半径，数组的第一项是内半径，第二项是外半径。
                    itemStyle:{normal:{areaStyle:{type:'default'}}},
                    type:'radar',
                    data:[
                        {value:[0,0,60,11.3,0,18.5, 0, 0], name:'最低'},
                        {value:this.personData, name:'本人'},
                        {value:[2 ,199.8,80,13.7,0,24,2.42, 81], name:'最高'}
                        ]
            }]
        };
        radar.setOption(option);

        }
    },
    
    mounted() {
        this.initInfo();
        
    },
 


}

</script>
