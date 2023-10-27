<template>
  <div>
    <h2 margin-left= "25%">请输入疾病信息，具体如下：</h2>
          <br>
          <div class="tip">
              <p>输入一个人病人的具体详细信息，这里采集的八列数据是因为训练模型时采用的是这八列数据</p>
          </div>


 
    <div id="datainput">
        <h2 margin-left= "25%">请输入疾病信息，具体如下：</h2>
        <br><br><br>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="糖尿病谱系显示患糖尿病概率" prop="diabetesPedigreeFunction">
                <el-input v-model.number="ruleForm.diabetesPedigreeFunction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="怀孕次数" prop="pregnancies" >
                <el-input v-model.number="ruleForm.pregnancies" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="血液中的葡萄糖水平" prop="glucose">
                <el-input v-model.number="ruleForm.glucose" ></el-input>
            </el-form-item>
            <el-form-item label="血压值" prop="bloodPressure">
                <el-input v-model.number="ruleForm.bloodPressure"></el-input>
            </el-form-item>
            <el-form-item label="皮肤厚度" prop="skinThickness">
                <el-input v-model.number="ruleForm.skinThickness" ></el-input>
            </el-form-item>
            <el-form-item label="血液中的胰岛素水平" prop="insulin">
                <el-input v-model.number="ruleForm.insulin"></el-input>
            </el-form-item>
            <el-form-item label="体重指数" prop="bmi">
                <el-input v-model.number="ruleForm.bmi" ></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="step1('ruleForm'); submit();">下一步</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
    </div>
  </div>
</template>


<script>
import {getRequest,postRequest} from '@/api/user'

  export default {
    name: 'step1',
    data() {
      return {
        ruleForm: {
          age: 55,
          pregnancies: 3,
          diabetesPedigreeFunction: 1.5,
          glucose:199,
          bloodPressure:100,
          skinThickness:50,
          insulin:200,
          bmi:31,
        },
        rules: {
            age: [
                { required: true, message: '年龄不能为空'},
                { type: 'number', message: '年龄必须为数字值'}
            ],
            pregnancies: [
                { required: true, message: '从未怀孕可以填0,不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
            diabetesPedigreeFunction:[
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
            glucose: [
                { required: true, message: '不能为空'},
                { type: 'number', message: '年龄必须为数字值'}
            ],
            bloodPressure: [
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
            skinThickness:[
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
            insulin: [
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
            bmi:[
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值', trigger: 'change'}
            ],
        }
      };
    },
    methods: {  
          
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      step1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('step1');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      submit() {
        // alert("提交成功");
        let formData = new FormData();

        // formData.append("ruleForm", JSON.stringify(this.ruleForm))

        // console.log(formData);
        for(let key in this.ruleForm){
            formData.append(key,this.ruleForm[key]);
        //     console.log(key, formData.get(key));
        //     console.log(typeof key, typeof formData.get(key));
        }
        console.log("=======")
        const dictionary = {};
        for (const [key, value] of formData.entries()) {
            dictionary[key] = value;
            console.log(typeof dictionary);
            console.log(dictionary);
        }
        console.log("=======")
        // console.log(formData)
        postRequest("/ten/data/update_person", dictionary)
        // postRequest("/ten/data/update_person2", formData)
      },
    }
  }
</script>

<style scoped>
/* 病种选择页面 */
#datainput{
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-right: 40%;
}
#disGroup{
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.disGroup-item{
  width: 200px;
  margin-bottom: 10px;
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