<template>
  <div>
    <div id="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="150">
        </el-table-column>
        <el-table-column prop="diseaseName" label="疾病名称" width="120">
        </el-table-column>
        <el-table-column prop="tableName" label="表格名称" width="120">
        </el-table-column>
        <el-table-column prop="modelName" label="模型名称" width="120">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">运行</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row.id)" type="danger" size="small">删除</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--===============================     编辑表单   ===================================================================-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" ref="dialogFormRef" :rules="rules" label-width="80px">
        <el-form-item prop="taskName" label="任务名称">
          <el-input v-model="dialogForm.taskName"></el-input>
        </el-form-item>

        <el-form-item prop="diseaseName" label="疾病名称">
          <el-input v-model="dialogForm.diseaseName"></el-input>
        </el-form-item>
        <el-form-item prop="tableName" label="表格名称">
          <el-input v-model="dialogForm.tableName"></el-input>
        </el-form-item>
        <el-form-item prop="modelName" label="模型名称">
          <el-input v-model="dialogForm.modelName"></el-input>
        </el-form-item>
        <el-form-item prop="remarks" label="备注">
          <el-input v-model="dialogForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('dialogFormRef')" size="small">清空</el-button>
        <el-button type="primary" @click="submitForm('dialogFormRef')" size="small">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import { getRequest, postRequest } from '@/api/user'

  export default {
    name: 'step0',
    data () {
      return {
        tableData: [],
        total: 0,
        search: "",
        dialogFormVisible: false,
        dialogForm: {
          filesInfo: [],
          taskName: "",
          diseaseName: "",
          tableName: "",
          modelName: "",
          remarks: "",
        },
        //tasks: [],
        editIndex: -1,
        rules: {
          taskName: [
            {
              required: true,
              message: "任务名称不能为空",
              trigger: "change",
            },
          ],
          diseaseName: [
            {
              required: true,
              message: "疾病名称不能为空",
              trigger: "change",
            },
          ],
          tableName: [
            {
              required: true,
              message: "表格名称不能为空",
              trigger: "change",
            },
          ],
          modelName: [
            {
              required: true,
              message: "模型名称不能为空",
              trigger: "change",
            },
          ],

        },

      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      handleClick (row) {
        console.log(row)
        this.$emit('step0')
      },
      getList () {

        getRequest("/ten/tasks/infos").then((res) => {

          this.tableData = res.data
          this.total = res.data_length

        }).catch(error => {
          console.log(error)
        })


      },
      handleDelete (index, id) {
        console.log("delete", index, id)


        getRequest("/ten/tasks/delete/" + id).then((res) => {

          console.log("删除成功")
          this.tableData.splice(index, 1)
        }).catch(error => {
          console.log(error)
        })
      },
      handleEdit (index, row) {
        this.dialogForm = Object.assign({}, row)
        this.editIndex = index
        this.dialogFormVisible = true
        this.id = row.id
        console.log(this.id)
        console.log(this.dialogForm)

      },
      resetForm () {
        this.dialogForm.taskName = "1"
        this.dialogForm.diseaseName = ""
        this.dialogForm.tableName = ""
        this.dialogForm.modelName = ""
        this.dialogForm.remarks = ""
      },
      submitForm () {
        console.log("editIndex:", this.editIndex)
        console.log("tableData:", this.tableData)
        console.log("this.dialogForm", this.dialogForm)

        this.$refs.dialogFormRef.validate((valid) => {
          if (valid) {
            if (this.editIndex !== -1) {
              // console.log(this.editIndex, " ========");
              this.tableData[this.editIndex].taskName = this.dialogForm.taskName
              this.tableData[this.editIndex].diseaseName = this.dialogForm.diseaseName
              this.tableData[this.editIndex].tableName = this.dialogForm.tableName
              this.tableData[this.editIndex].modelName = this.dialogForm.modelName
              this.tableData[this.editIndex].remarks = this.dialogForm.remarks


              console.log("submitForm", this.editIndex)
              getRequest("/ten/tasks/update", {
                "id": this.id,
                "taskName": this.dialogForm.taskName,
                "diseaseName": this.dialogForm.diseaseName,
                "tableName": this.dialogForm.tableName,
                "modelName": this.dialogForm.modelName,
                "remarks": this.dialogForm.remarks
              }).then((res) => {
                console.log("submitForm", this.dialogForm)
                this.tableData = res.data
                this.total = res.data_length

              }).catch(error => {
                console.log(error)
              })

            } else {
              this.tableData.push({
                taskName: this.dialogForm.taskName,
                diseaseName: this.dialogForm.diseaseName,
                tableName: this.dialogForm.tableName,
              })
            }
            this.dialogFormVisible = false
            this.editIndex = -1
            //this.resetForm()
          } else {
            console.log("submit failed")
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>