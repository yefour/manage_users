<template>

	<div class="index" style="height: 100%;">
		<el-container style="height: 100%;">
			<!--纵向导航-->
			<el-aside width="">
				<el-menu id="leftNav" style="height:100%;" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" :collapse="isCollapse" active-text-color="#ffd04b" >
					<div style="height: 0;width: 200px;"></div>
					<router-link to="/mainContent/users.vue" tag="h3" id="Logo" style="color: #fefefe;font-weight: 500;cursor: pointer;">KMU</router-link>
					<router-link tag="li" to="/mainContent/users">
						<el-menu-item index="1">
							<i class="el-icon-menu"></i>
							<span slot="title">用户管理</span>
						</el-menu-item>
					</router-link>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<router-link to="/HelloWorld"><el-menu-item index="1-1">选项1</el-menu-item></router-link>

						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<router-link to="/option2"><el-menu-item index="1-2">选项2</el-menu-item></router-link>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container id="rightNav">
				<el-header style="background:#535c63;text-align:left;line-height:60px;">
					<el-radio-group v-model="isCollapse" @change="onRadioChange">
					  <el-radio-button id="fold" :label="label"><i class="el-icon-menu"></i></el-radio-button>
					</el-radio-group>
					<el-button type="text" @click="loginOut" style="float: right;color: #ededed;font-size: 13px;margin-top: 10px;">退出登录</el-button>
				</el-header>
				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>

</template>
<style>
	html{
		height: 100%;
	}
	body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		height: 100%;
	}
	#leftNav{

	}
	#rightNav{

	}

</style>
<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				isCollapse: false,
				label:true
			};
		},
		beforeRouteEnter:(to,from,next)=>{

			if(localStorage.getItem('data')!=""){
				next()   //直接进入index
			}else{
				alert("请先登录")
				next('Login') // 未登录时直接进入login
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			onRadioChange(val){
				this.label=!this.label
			},
			loginOut(){
				 this.$confirm('确认退出？','退出管理平台',{
				 	 confirmButtonText: '确定',
  					 cancelButtonText: '取消'
				 }).then(()=>{
					localStorage.setItem('data',""); //退出时清空用户信息
					this.$router.push('/Login')
				 })
			}
		}
	}
</script>

<style>

</style>
