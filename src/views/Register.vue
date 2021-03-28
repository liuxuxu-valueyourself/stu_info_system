<template>
  <div class="login" v-if="state">
    <Mantle @singOut="handleSingOut">
      <div class="title">注册</div>
      <div class="content">
        <label for="name">用户名: </label>
        <a-input id="name" placeholder="请输入用户名" v-model="userName" />
        <label for="pa">密码: </label>
        <a-input-password
          id="pa"
          placeholder="请输入您的密码"
          v-model="userPassword"
        />
        <label for="pa1">请再次确认密码: </label>
        <a-input-password
          id="pa1"
          placeholder="请再次输入您的密码"
          v-model="userPassword1"
        />
        <div class="submit">
          <a-button type="primary" class="clickLogin" @click="register">
            点击注册
          </a-button>
        </div>
        <div class="register" @click="toLogin">已有账号？立即登录-></div>
      </div>
    </Mantle>
  </div>
</template>

<script>
import Mantle from "../components/Mantle.vue";
import { register } from '../api/index.js';
export default {
  components: {
    Mantle,
  },
  data() {
    return {
      state: true,
      userName: "",
      userPassword: "",
      userPassword1: "",
    };
  },
  created() {
    this.state = true;
  },
  methods: {
    handleSingOut(state) {
      this.state = state;
      this.$router.go(-1);
    },
    async register() {
      if (this.userName === "") {
        this.$message.warning("用户名不能为空!");
      } else if (this.userPassword === "" || this.userPassword1 === "") {
        this.$message.warning("密码不能为空!");
      } else if (this.userPassword !== this.userPassword1) {
        this.$message.warning("两次密码不一致哦!");
      } else {
        //进行注册
        let res = await register({
          name:this.userName,
          password:this.userPassword
        });
        if(res.data === 1) {
          this.$message.success("注册成功! 可以登录咯");
          this.$router.go(-1);
        }else {
          this.$message.error("注册失败(注意用户名不能重复)!");
        }
      }
    },
    toLogin() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 26px;
  font-weight: 700;
  padding-left: 20px;
  border-bottom: 1px solid #008c8c;
}
.content {
  margin: 15px 30px;
  label {
    margin-bottom: 10px;
  }
  .submit {
    width: 100%;
    text-align: center;
    margin-top: 35px;
  }
  .register {
    font-size: 12px;
    color: #008c8c;
    cursor: pointer;
  }
}
</style>