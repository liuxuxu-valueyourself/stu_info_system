<template>
  <div class="login" v-if="state">
    <div class="name">学生信息管理系统</div>
    <Mantle @singOut="handleSingOut">
      <div class="title" style="color: #000">登录</div>
      <div class="content">
        <label for="name" style="color: #000">用户名: </label>
        <a-input id="name" placeholder="请输入用户名" v-model="userName" />
        <br /><br />
        <label for="pas" style="color: #000">密码: </label>
        <a-input-password
          id="pas"
          placeholder="请输入您的密码"
          v-model="userPassword"
        />
        <div class="submit">
          <a-button type="primary" class="clickLogin" @click="login">
            点击登录
          </a-button>
        </div>
        <div class="register" @click="toRegister" style="color: #000">
          还没有账号？立即注册->
        </div>
      </div>
    </Mantle>
  </div>
</template>

<script>
import Mantle from "../components/Mantle.vue";
import { login } from "../api/index.js"; // 引入api接口模块
export default {
  components: {
    Mantle
  },
  data() {
    return {
      state: true,
      userName: "",
      userPassword: ""
    };
  },
  created() {
    this.state = true;
  },
  methods: {
    handleSingOut(state) {
      // 退出
      this.state = state;
      this.$router.go(-1); // 控制路由 返回上一页
    },
    async login() {
      // async 异步函数 登录
      if (this.userName === "") {
        this.$message.warning("用户名不能为空!");
      } else if (this.userPassword === "") {
        this.$message.warning("密码不能为空!");
      } else {
        //进行登录
        let res = await login({
          // 调用login api接口，将数据发送到后台
          name: this.userName,
          password: this.userPassword
        });
        if (res.data === 0) {
          // 判断数据空值是否存在该用户信息 如果有判断是否为超级管理员
          this.$message.error("用户名或密码错误!");
        } else if (res.data === 1) {
          this.$message.success("登录成功!");
          this.$store.commit("changeName", {
            // 保存到vuex中共享数据
            name: this.userName
          });
          this.$store.commit("changeRoot", {
            root: true
          });
          // this.handleSingOut(false);
          this.$router.push({
            name: "Home"
          });
          localStorage.setItem("userName", this.userName);
        } else if (res.data === 2) {
          this.$message.success("登录成功!");
          this.$store.commit("changeName", {
            name: this.userName
          });
          this.$store.commit("changeRoot", {
            root: false
          });
          // this.handleSingOut(false);
          this.$router.push({
            name: "Home"
          });
          localStorage.setItem("userName", this.userName);
        }
      }
    },
    toRegister() {
      this.$router.push({
        // 控制路由 跳转到注册界面
        name: "Register"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  position: fixed;
  z-index: 1;
  left: calc(50% - 150px);
  width: 300px;
  text-align: center;
  margin-top: 20px;
  font-size: 30px;
  letter-spacing: 6px;
  text-shadow: 0px 1px 1px #ccc;
}
.title {
  font-size: 26px;
  font-weight: 700;
  padding: 10px 20px;
  border-bottom: 1px solid #008c8c;
}
.content {
  margin: 15px 30px;
  label {
    margin-bottom: 10px;
    display: inline-block;
  }
  .submit {
    width: 100%;
    text-align: center;
    margin-top: 25px;
  }
  .register {
    font-size: 12px;
    color: #008c8c;
    cursor: pointer;
    display: inline-block;
  }
}
</style>
