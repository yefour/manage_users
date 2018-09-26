<template>
	<div v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" >
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: left;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="searchName">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleEdit();dialogFormVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="tableData" border height="400px" style="width: 100%;">
			<el-table-column fixed prop="name" label="客户名称">
			</el-table-column>
			<el-table-column prop="description" label="客户标志">
			</el-table-column>
			<el-table-column prop="create_time" label="编辑日期">
			</el-table-column>

			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleEdit(scope.$index,scope.row);dialogFormVisible = true" type="text" size="small">编辑</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px;text-align: right;">
			<el-pagination background layout="total,prev, pager, next" :page-size="7" :total="total" @current-change="handleCurrentChange">
			</el-pagination>

		</div>
		<!--可编辑得表单-->
		<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="handleCancel()">
			<edit ref="edit" :key="key" :form="rowData"></edit>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit();">确 定</el-button>
			</div>
		</el-dialog>
		<!-----------结束--------->
	</div>
</template>

<script>
	import edit from './tableEdit'
	import axios from 'axios'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				tableData: [],
				title: "",
				dialogFormVisible: false,
				dialogFormVisibleAdd: false,
				rowData: '',
				key: '',
				total: 0,
				editConfirm:false,
				loading:true
			}
		},
		components: {
			edit
		},
		created() {

			axios.get('http://www.doylee.cn/api/')
				.then((res) => {
					this.tableData = res.data.data
					this.loading=false
				})
				.catch(err => {
					console.log(err)
				})

        axios.get(' http://www.doylee.cn/api/index/count')
          .then(res=>{
            if(res.data.code==0){
              this.total=res.data.data
            }
          })

		},
		methods: {

			//			编辑、新增
			handleEdit(index, row) {
				if(index || row) {
					this.title = "编辑"
					this.key = index
					this.rowData = row
				} else {
					this.title = "新增"
					this.key = this.tableData.length + 1;
					this.rowData = {
						name: '',
            description: ''
            // create_time: ''
					}
				}

			},
			//提交
			handleSubmit() {

				let bol = this.$refs['edit'].validateForm()
				if(bol) {
					//新增提交
					if(this.key > this.tableData.length) {
            let myDate = Date.parse(new Date())/1000;
            let token = md5(myDate+md5('doyleaf'));
					  let newMessage = Object.assign({},this.$refs.edit.formData);
					  newMessage.time=myDate;
            newMessage.token=token;
            axios.post("http://www.doylee.cn/api/index/put", newMessage).then(res => {
                console.log(res.data.msg)
							if(res.data.code == 0) {
								this.$message({
									message: "提交成功！",
									type: 'success'
								});
								axios.get('http://www.doylee.cn/api/')
									.then((res) => {
										this.tableData = res.data.data
										console.log( res.data.data)
									})
									.catch(err => {
										console.log(err)
									});
                axios.get('http://www.doylee.cn/api/index/count')
                  .then(res=>{
                    console.log(res)
                    if(res.data.code==0){
                      this.total=res.data.data
                      console.log(this.total)
                    }
                  })
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error'
								});
							}
						})
					} else {
//						编辑提交
						this.editConfirm = true
            let ediDate = Date.parse(new Date())/1000;
            let editoken = md5(ediDate+md5('doyleaf'));
						let addMessage=Object.assign({},this.$refs.edit.formData)
            addMessage.time=ediDate;
            addMessage.token=editoken;
						axios.post("http://www.doylee.cn/api/index/post", addMessage).then(res => {
						  console.log(res.data.code)
              console.log(addMessage)
							if(res.data.code == 0) {
								this.$message({
									message:"编辑成功",
									type: 'success'
								});
								this.rowData.name = addMessage.name
								this.rowData.description = addMessage.description
							} else if(res.data.code==1) {
								this.$message({
									message: "签名错误",
									type: 'error'
								});
							}else if(res.data.code==2){
                this.$message({
                  message: "没有接收到",
                  type: 'error'
                });
              }else{
                this.$message({
                  message: "服务器错误",
                  type: 'error'
                });
              }

						})

					}
					this.dialogFormVisible = false
				}
			},
			//			取消
			handleCancel() {
				console.log(this.editConfirm)
				this.$refs.edit.clearValidate()
				if(!this.editConfirm){
					this.$refs.edit.cancle();

				}else{
					this.editConfirm = false
				}

			},

			//			删除
			deleteRow(index, rows) {
				this.$confirm('确认删除本条记录?', '提示', {
					type: 'waring'
				}).then(() => {
				  let delMessag=new Object()
					// let id = {id:rows[index].id}
          let delID=rows[index].id
					console.log(delID)
          let delDate = Date.parse(new Date())/1000;
          let deltoken = md5(delDate+md5('doyleaf'));
          delMessag.id=delID;
          delMessag.time=delDate;
          delMessag.token=deltoken;
					axios.post('http://www.doylee.cn/api/index/delete', delMessag).then(res => {
						console.log(res.data.code)
						if(res.data.code==0){
							this.$message({
								message:"删除成功",
								type: 'success'
							});
							rows.splice(index, 1);
						}else{
							this.$message({
								message:"删除失败",
								type: 'error'
							});
						}

					})
				})
			},
			//			分页
			handleCurrentChange(val) {
			  let page=val
				axios.post('http://www.doylee.cn/api/',{p:page})
					.then((res) => {
					  // console.log(page)
					  // console.log(res.data)
            if(res.data.code==0){
              this.tableData = res.data.data
            }else{
					    this.$message({
                message:"无法加载下一页",
                type:"error"
              })
            }
						// this.tableData = res.data
					})
					.catch(err => {
						console.log(err)
					})
			},
			//			 查询
			searchName() {
				let val = this.filters.name;
				let searchInfo={
				  name:"name",
          value:val
        };
				console.log(searchInfo)
				if(val){
				  axios.get("http://www.doylee.cn/Api/Index/search.html?name=name&&value="+val)
            .then(res=>{
              if(res.data.code===0){
                console.log(res.data.data)
                this.tableData = res.data.data.data
                this.total =  res.data.data.count
              }else {
                this.$message({
                  message:"无查询结果",
                  type:"error"
                })
              }


            })
        }
			}

		}
	}
</script>

<style>

</style>
