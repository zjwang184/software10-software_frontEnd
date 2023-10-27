<template>
    <div id="pie" ref="pie" ></div>
    
</template>

<script>
import * as echarts from "echarts";

export default {
    props:{
        perform:{
            type: Number,
            // default: ()=> []
        }, 
    },
    name: "Pie",
    data(){
        return {

        }
    },
    methods: {
        initPie() {
            console.log("pie"+this.perform);
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
                        data: [
                            { value: 100-this.perform, name: '错误率' },
                            { value: this.perform, name: '准确度' },                            
                        ]
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


        

    },
    watch:{
        
    },
    
    mounted() {
        this.initPie();
        
    },
    
    updated(){
        this.initPie()
    }
 


}

</script>
