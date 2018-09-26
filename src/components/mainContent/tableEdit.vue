<template>
	<el-form ref="formData" status-icon :rules="rules" :model="formData" class="demo-ruleForm">
		<el-form-item label="客户名称" :label-width="formLabelWidth" prop="name">
			<el-input v-model="formData.name" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="客户标志" :label-width="formLabelWidth" prop="description">
			<el-input v-model="formData.description" auto-complete="off"></el-input>
		</el-form-item>
		<!--<el-form-item label="编辑日期" :label-width="formLabelWidth" prop="add_time">
			<el-input disabled="true" v-model="formData.add_time" auto-complete="off"></el-input>
		</el-form-item>
		-->

	</el-form>
</template>

<script>
	import axios from 'axios'
	export default {
		props: ['form', 'formKey'],
		data() {

			return {
				formLabelWidth: '80px',
				//				key:'',
				formData: Object.assign({}, this.form),
				rules: {
					name: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}],
          description: [{
						required: true,
						message: '请输入客户标志',
						trigger: 'blur'
					}]

				}
			}

		},
		created() {},
		methods: {
			//			表单验证--提交
			validateForm() {
				let flag = false
				this.$refs.formData.validate((valid) => {
					flag = valid;
				})
				return flag

			},
//			//			编辑
//			editSave() {
//				axios.post("http://gxn.com/index/customer/edit_customer", this.formData).then(res => {
//					if(res.data.code == 1) {
//						this.$message({
//							message: res.data.message,
//							type: 'success'
//						});
//					} else {
//						this.$message({
//							message: res.data.message,
//							type: 'error'
//						});
//					}
//
//				})
//			},
			//			新增
//			addSave() {
//				axios.post("http://gxn.com/index/customer/add_customer", this.formData).then(res => {
//
//					if(res.data.code == 1) {
//						this.$message({
//							message: res.data.message,
//							type: 'success'
//						});
//						axios.get('http://gxn.com/index/customer/index')
//						.then((res)=>{
//							this.tableData = res.data.data
//							this.total = res.data.data.length
//							console.log(this.tableData)
//						})
//						.catch(err=>{console.log(err)})
//					} else {
//						this.$message({
//							message: res.data.message,
//							type: 'error'
//						});
//					}
//				})
//			},
			//			//		    取消
			cancle() {
				this.formData = Object.assign({}, this.form)
			},

			//			重置
			resetForm() {
				this.$refs.formData.resetFields();
			},
			clearValidate() {
				this.$refs.formData.clearValidate();
			},
			test() {
				alert("test")
				console.log(this.formData)
			}
		}
	}
</script>

<style>

</style>
