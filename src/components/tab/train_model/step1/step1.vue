<template>
    <el-container>
        <el-header>
            <h2 margin-left= "25%">请设置选择数据集：</h2>
            <br />
            <div class="tip">
                <p>请选择数据集，并可点击预览查看前十条数据情况</p>
            </div>
            <el-row style="margin-left: 40%;">
                
                <el-col :span="3" :offset="1">
                    选择数据集:
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-select v-model="value" placeholder="请选择" @change="selecter">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                
            </el-row>
            <br/>
            <el-row style="margin-left: 40%;"></el-row>
                
            <el-row style="margin-left: 40%; margin-top: 2%;">
                
                <el-col :span="3" :offset="1">
                    <el-button type="warning" @click="preview()">预览</el-button>
                </el-col>
                
                <el-col :span="3" :offset="1">
                    <el-button type="primary" @click="step1();" style="margin-left: 40%;">下一步</el-button>
                </el-col>
                
            </el-row>
                
        </el-header>
        <br/><br/><br/><br/>
        <el-main v-if="isPreview === 1">
            <Table :table="table"  style="margin-left: 10%; margin-top: 10%;"></Table>
        </el-main>
        
    </el-container>
</template>
<script>
import Table from "./Table.vue"
import {getRequest,postRequest} from '@/api/user'

export default {
    name: "step1",
    components:{
        Table,
    },
    data() {
        return {
            table:null,
            value:null,
            isPreview:0,
            options:[]
        };
    },
    mounted() {
        this.initSelecter();
        this.selecter();
        
    },
    watch:{
        selecter(event){
            console.log('选择器选择的值为',event,this.value);
            this.table = this.value;
            console.log(this.table);
        },
    },
    methods:{
        initSelecter(){
            getRequest("/ten/model/tables").then((res)=>{
                this.options = res.data;
                console.log("train step1 options:", this.options);
            }).catch(error=>{
                console.log(error);
            })
        },
        preview(){
            this.isPreview = (this.isPreview+1)%2;

        },
        step1() {
            if (this.value != null){
                this.$emit('step1');
                this.isPreview = 0;
            }else{
                alert("请选择完数据集再进行操作")
            }
            
        },
        selecter(event){
            console.log('选择器选择的值为',event,this.value);
            this.table = this.value;
            console.log(this.table);
        },
        
        clickPreview(){
            console.log('通过选择器选择的值进行查找',this.value);
        }
        
    }

}

</script>

<style scoped>
#datainput{
  display: flex;
  flex-direction: row;
  margin-left: 40%;
  margin-right: 40%;
}

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