<template>
	<div class="Login">
		<img width="100%" src="../assets/loginTop.jpg">
		<div class="LoginForm">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

				<el-form-item prop="name">
					<el-input placeholder="用户名" type="text" v-model="ruleForm2.name"></el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input placeholder="密码" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button class="submit" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
					<!--<router-link tag="li" to="/Rigister" class="nav-link">-->
						<!--<a class="list-group-item">还没有账号？马上注册</a>-->
					<!--</router-link>-->
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>
<style>
	body {
		margin: 0;
	}

	#app {
		margin-top: 0;
	}

	.Login {
		width: 100%;
	}

	.LoginForm {
		width: 420px;
		margin: 30px auto;
	}

	.el-form-item__content {
		margin-left: 0 !important;
	}

	.submit {
		width: 100%;
		background: #69d4c5;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #69d4c5;
	}
</style>
<script>
	import axios from 'axios'
	export default {
		name: 'Login',
		data() {

			//			var validateName = (rule, value, callback) => {
			//				if(value === '') {
			//					callback(new Error('请输入用户名'));
			//				} else {
			//
			//					callback();
			//				}
			//			};
			//			var validatePass = (rule, value, callback) => {
			//				if(value === '') {
			//					callback(new Error('请输入密码'));
			//				} else {
			//					callback();
			//				}
			//			};
			return {
				ruleForm2: {
					pass: '',
					name: ''
				},
				rules2: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					pass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},

					],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
            let myDate = Date.parse(new Date())/1000;
            let token = md5(myDate+md5('doyleaf'));
						const loginData = {
              time: myDate,
              token:token,
							username: this.ruleForm2.name,
							password: this.ruleForm2.pass
						};

						//						验证成功,将对应的用户名和密码传给后台
						axios.post('http://www.doylee.cn/api/user/login.html', loginData)
							.then(res => {
								if(res.data.code === 0) {
									alert("登录成功")
									localStorage.setItem('data', JSON.stringify(loginData)); //有此用户时存入data
									this.$router.push('/index')
								} else {
									alert("用户名或密码错误！")
								}
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
