<template>
	<div>
		<div style="text-align: right;margin-bottom: 10px;">
			<el-button type="primary">新增</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="province" label="省份">
			</el-table-column>
			<el-table-column prop="city" label="市区">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
			<el-table-column prop="zip" label="邮编" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleEdit(scope.row);dialogFormVisible = true" type="text" size="small">编辑</el-button>

					<el-button  @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--可编辑得表单-->
		<el-dialog title="编辑" :visible.sync="dialogFormVisible">
			<edit ref="edit" :form="formData"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import edit from './edit'
	export default {
		data() {
			return {
				tableData: [{
					id:0,
					date: '2016-05-03',
					name: '王小虎111',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					id:1,
					date: '2016-05-02',
					name: '王小虎222',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					id:2,
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					id:3,
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}],
				dialogFormVisible: false,
				formLabelWidth: '120px',
				rowData:'',
				formData:''
				
			}
		},
		components: {
			edit
		},
		methods: {
			handleEdit(row) {
				this.rowData = row
				this.formData=Object.assign({},this.rowData)
//				console.log(this.rowData)
			},
			handleSubmit() {
				this.$refs.edit.save()
			}
		}
	}
</script>

<style>

</style>