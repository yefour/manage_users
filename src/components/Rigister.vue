<template>
	<div class="Rigister">
		<img width="100%" src="../assets/loginTop.jpg">
		<div class="RigisterForm">
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

			<el-form-item prop="name">
				<el-input placeholder="用户名" type="text" v-model="ruleForm2.name"></el-input>
			</el-form-item>
			<el-form-item prop="pass">
				<el-input placeholder="密码" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input placeholder="确认密码" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="submit" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
				<!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
			</el-form-item>
		</el-form>
		</div>
	</div>
</template>
<style>
	
	.RigisterForm {
		width: 420px;
		margin: 30px auto;
	}
	
	.el-form-item__content {
		margin-left: 0 !important;
	}
	
	.submit {
		width: 100%;
	}
</style>
<script>
	import axios from "axios"
	export default {
		name: 'Rigister',
		data() {

			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名'));
				} else {

					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					name: '',
					checkPass: ''

				},
				rules2: {
					name: [{
						validator: validateName,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
						const formData = {
							name: this.formName,
							pass: this.validatePass,

						}
						axios.post('/user.json', formData).then(res => {
							//数据已经传到https://wd8041554674gwfcto.wilddogio.com/下得user中，提交成功跳转
							this.$router.push("/Login")
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>

</style>