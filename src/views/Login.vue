<template>
    <a-form-model ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click.prevent="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </template>
  <script>
      import {mapActions} from 'vuex';
  export default {
      created(){
        this.$cookie.removeCookie()
      },
    data() {
      let emailReg=/^[\w-]+@[\w.-]+.com$/;
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'));
        }
        if(emailReg.test(value)){
            return callback();
        }else{
            return callback(new Error('邮箱格式不正确'));
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          password: '',
          email:'',
        },
        rules: {
            password: [{ validator: validatePass, trigger: 'change' }],
            email:[{validator:checkEmail,trigger: 'change'}],
        },
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
      };
    },
    methods: {
        ...mapActions(['changeUser']),
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$api.login(this.loginForm).then((resp)=>{
            this.changeUser(resp);
            this.$router.push({name:'home'});
           }).catch((error)=>{
            this.$message.error(error);
           });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  <style scoped>
      .ant-form{
          width:400px;
          margin:80px auto;
          border:1px solid #eee;
          padding :30px 20px;
      }
  </style>
  