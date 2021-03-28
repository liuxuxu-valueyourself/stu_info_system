<template>
  <div class="login" v-if="state">
    <Mantle @singOut="handleSingOut">
      <div class="title">登录</div>
      <div class="content">
        <label for="name">用户名: </label>
        <a-input id="name" placeholder="请输入用户名" v-model="userName" />
        <br /><br />
        <label for="pas">密码: </label>
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
        <div class="register" @click="toRegister">还没有账号？立即注册-></div>
      </div>
    </Mantle>
  </div>
</template>

<script>
import Mantle from "../components/Mantle.vue";
import { login } from "../api/index.js";
export default {
  components: {
    Mantle,
  },
  data() {
    return {
      state: true,
      userName: "",
      userPassword: "",
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
    async login() {
      if (this.userName === "") {
        this.$message.warning("用户名不能为空!");
      } else if (this.userPassword === "") {
        this.$message.warning("密码不能为空!");
      } else {
        //进行登录
        let res = await login({
          name: this.userName,
          password: this.userPassword,
        });
        if (res.data === 0) {
          this.$message.error("用户名或密码错误!");
        } else if (res.data === 1) {
          this.$message.success("登录成功!");
          this.$store.commit("changeName", {
            name: this.userName,
          });
          this.$store.commit("changeRoot", {
            root: true,
          });
          this.handleSingOut(false);
        } else if (res.data === 2) {
          this.$message.success("登录成功!");
          this.$store.commit("changeName", {
            name: this.userName,
          });
          this.$store.commit("changeRoot", {
            root: false,
          });
          this.handleSingOut(false);
        }
      }
    },
    toRegister() {
      this.$router.push({
        name: "Register",
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