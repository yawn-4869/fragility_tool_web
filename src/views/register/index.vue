<template>
    <div class="register-container">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
  
        <div class="title-container">
          <h3 class="title">注册</h3>
        </div>
  
        <el-form-item prop="userAccount">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="userAccount"
            v-model="registerForm.userAccount"
            placeholder="请输入用户名"
            name="userAccount"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
  
        <el-form-item prop="userPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="userPassword"
            v-model="registerForm.userPassword"
            :type="passwordType"
            placeholder="请输入密码"
            name="userPassword"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="checkPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="checkPasswordType"
            ref="checkPassword"
            v-model="registerForm.checkPassword"
            :type="checkPasswordType"
            placeholder="请确认密码"
            name="checkPassword"
            tabindex="3"
            auto-complete="on"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showCheckPwd">
            <svg-icon :icon-class="checkPasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
  
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;background-color: #4ea5f1; border-color: #4ea5f1;" @click.native.prevent="handleRegister">注册</el-button>
  
      <div class="tips">
        <router-link to="/login">已有帐号？跳转登录</router-link>
      </div>
  
      </el-form>
    </div>
  </template>
  
  <script>
  import { validUsername } from '@/utils/validate'
  
  export default {
    name: 'Register',
    data() {
      const validateUsername = (rule, value, callback) => {
        if(value.length < 4) {
          callback(new Error('用户名不少于4个字符'))
        }
        if (!validUsername(value)) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error('密码长度不少于8位'))
        } else {
          callback()
        }
      }
      const validateCheckPassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error('密码长度不少于8位'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          checkPassword: '',
          userAccount: '',
          userPassword: '',
        },
        registerRules: {
          userAccount: [{ required: true, trigger: 'blur', validator: validateUsername }],
          userPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
          checkPassword: [{ required: true, trigger: 'blur', validator: validateCheckPassword }],
        },
        loading: false,
        passwordType: 'password',
        checkPasswordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.uesrPassword.focus()
        })
      },

      showCheckPwd() {
        if (this.checkPasswordType === 'password') {
          this.checkPasswordType = ''
        } else {
          this.checkPasswordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.checkPassword.focus()
        })
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/register', this.registerForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
  </script>
  
  <style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  
  $bg:#d5d5d5;
  $light_gray:#889aa4;
  $cursor: #889aa4;
  
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
      color: $cursor;
    }
  }
  
  /* reset element-ui css */
  .register-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
  
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
  
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  </style>
  
  <style lang="scss" scoped>
  $bg:#eee;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  $light_green:#4ea5f1;
  $dark_green: #0c5da3;
  
  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
  
    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
  
    .tips {
      font-size: 14px;
      color: $light_green;
      margin-bottom: 10px;
  
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
  
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_green;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
  
    .title-container {
      position: relative;
  
      .title {
        font-size: 26px;
        color: $light_green;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_green;
      cursor: pointer;
      user-select: none;
    }
  }
  </style>
  