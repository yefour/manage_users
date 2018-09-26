<template>
  <div>
    <el-form ref="formData" :model="form">
				<el-form-item label="日期" :label-width="formLabelWidth">
					<el-input v-model="form.date" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="省份" :label-width="formLabelWidth">
					<el-input v-model="form.province" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="市区" :label-width="formLabelWidth">
					<el-input v-model="form.city" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮编" :label-width="formLabelWidth">
					<el-input v-model="form.zip" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: function () {
        return {
        }
      },
      required: true
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
//    formData:Object.assign({},this.form)
    }
  },
  methods: {
    save () {
    	
//  	console.log(this.formData)
    	console.log(this.form)
      // 请求接口即可
    }
  }
}
</script>

