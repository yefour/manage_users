<template>
	<div>
		<div style="text-align: right;margin-bottom: 10px;">
			<!--<el-button type="primary" @click="dialogFormVisibleAdd = true">新增</el-button>-->
			<el-button type="primary" @click="handleEdit();dialogFormVisible = true">新增</el-button>
			<!--新增表单-->
			<el-dialog title="新增" :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd" style="text-align: center;" @close="restFrom()">
				<edit ref="edit"></edit>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
					<el-button type="primary" @click="addSubmit();">确 定</el-button>
				</div>
			</el-dialog>
			<!--结束-->
		</div>
		<el-table :data="tableData" border height="400px" style="width: 100%;">
			<el-table-column fixed prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="province" label="省份">
			</el-table-column>
			<el-table-column prop="city" label="市区">
			</el-table-column>
			<el-table-column prop="address" label="地址" width="300">
			</el-table-column>
			<el-table-column prop="zip" label="邮编">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleEdit(scope.$index,scope.row);dialogFormVisible = true" type="text" size="small">编辑</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--可编辑得表单-->
		<el-dialog title="编辑" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
			<edit ref="edit" :key="key" :form="rowData"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel();dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit();">确 定</el-button>
			</div>
		</el-dialog>
		<!-----------结束--------->
	</div>
</template>

<script>
	import edit from './tableEdit'
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {

					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {

					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {

					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {

					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}],
				dialogFormVisible: false,
				dialogFormVisibleAdd: false,
				rowData: '',
				key: '',
//				emptyData:{
//					date: '',
//					name: '',
//					province: '',
//					city: '',
//					address: '',
//					zip: ''
//				}
			}	
		},
		components: {
			edit
		},
		methods: {
			//			新增--提交
//			addSubmit() {
//				let bol=this.$refs['edit'].validateForm()
//				console.log("新增")
//				console.log(this.$refs.edit.formData)
//				if(bol){
//					let newMessage=Object.assign({},this.$refs.edit.formData)
//					this.tableData.push(newMessage)
//					this.dialogFormVisibleAdd = false
//					this.$refs.edit.clearValidate()
//				}else{}
//			},
			//			新增--弹框消失(包括确定、取消、关闭)
//			restFrom(){
//				this.$refs.edit.clearValidate()
//				this.$refs.edit.cancle()
////				this.$refs.edit.resetForm()
//			},
			//			编辑、新增
			handleEdit(index, row) {
        if(index||row){
          this.key = index
          this.rowData = row
        }else{
          this.key = this.tableData.length+1;
         this.rowData = {date: '',name: '',province: '',city: '',address: '',zip: ''}

				}
			},
			//			编辑--提交
			handleSubmit() {
				let bol=this.$refs['edit'].validateForm()
				console.log("开始")
				console.log(this.rowData)
				if(bol){
					this.rowData.name = this.$refs.edit.formData.name
					this.rowData.date = this.$refs.edit.formData.date
					this.rowData.province = this.$refs.edit.formData.province
					this.rowData.city = this.$refs.edit.formData.city
					this.rowData.address = this.$refs.edit.formData.address
					this.rowData.zip = this.$refs.edit.formData.zip
				if(this.key>this.tableData.length){
						this.tableData.push(this.rowData)
					}
					console.log("编辑")
					console.log(this.rowData)
					this.$refs.edit.save()

					this.$refs.edit.clearValidate()
					this.dialogFormVisible = false
				}	
			},
			//			编辑--取消
			handleCancel() {
				this.$refs.edit.clearValidate()
				this.$refs.edit.cancle()
			},
			//			删除
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
			

		}
	}
</script>

<style>

</style>
