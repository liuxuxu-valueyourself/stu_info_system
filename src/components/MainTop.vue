<template>
  <!-- 顶部区域 -->
  <div>
    <div class="main-top">
      <div class="main-top-left">
        <img src="../assets/touxiang.png" class="touxiang" alt="" />
        <!-- 推荐h1 -->
        <div class="item" style="margin-left: 40px">学</div>
        <div class="item">生</div>
        <div class="item">信</div>
        <div class="item">息</div>
        <div class="item">管</div>
        <div class="item">理</div>
        <div class="item">系</div>
        <div class="item">统</div>
      </div>
      <div class="main-top-right">
        <span v-if="$store.state.userName">
          {{ "您好: " + $store.state.userName }}
        </span>
        <span v-else @click="toLogin" class="login">点击登录</span>
        {{ $store.state.root == true ? "您是管理员!" : "" }}
        <span v-if="$store.state.userName" @click="loginOut"> 退出登录 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    loginOut() {
      this.$store.commit("changeName", {
        name: "",
      });
      this.$store.commit("changeRoot", {
        root: false,
      });
      this.$message.success("退出成功!");
    },
  },
};
</script>

<style scoped lang="scss">
.main-top {
  .main-top-left {
    display: flex;
  }
  .main-top-right {
    margin-right: 10vw;
    .login {
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 2px 3px;
    }
    span {
      margin: 0 10px;
      cursor: pointer;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 100vw;
  height: 45px;
  color: rgb(204, 204, 204);
  padding-left: 20px;
  background-image: url(../assets/bg.png),
    linear-gradient(to left, rgb(121, 121, 121), rgb(51, 51, 51));
  .touxiang {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: fixed;
    top: 12px;
  }
  .item {
    margin: 0 3px;
    padding-top: 5px;
    text-shadow: 2px 3px 3px rgb(241, 241, 241);
    animation: dump 2s infinite linear;
    &:nth-child(1) {
      margin-left: 30px;
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      animation-delay: 0.7s;
    }
    &:nth-child(5) {
      animation-delay: 0.9s;
    }
    &:nth-child(6) {
      animation-delay: 1.1s;
    }
    &:nth-child(7) {
      animation-delay: 1.3s;
    }
    &:nth-child(8) {
      animation-delay: 1.5s;
    }
    &:nth-child(9) {
      animation-delay: 1.7s;
    }
  }
}
@keyframes dump {
  0% {
    margin-top: 0px;
  }
  50% {
    margin-top: -10px;
  }
  100% {
    margin-top: 0px;
  }
}

@media screen and (max-width: 480px) {
  div.main-top {
    position: fixed;
    width: 100vw;
    height: 10vw;
    .main-top-right {
      display: contents;
    }
  }

}
</style>