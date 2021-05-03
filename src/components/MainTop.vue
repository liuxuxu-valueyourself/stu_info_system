<template>
  <!-- 顶部区域 -->
  <div>
    <div
      class="main-top"
      :style="{ background: themeColor.background, color: themeColor.color }"
    >
      <div class="main-top-left">
        <!-- <img src="../assets/touxiang.png" class="touxiang" alt="" /> -->
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

      <!-- <a href="../../bird/index.html" style="color:#ccc;">玩个游戏吧!</a> -->
      <div class="main-top-right">
        <span v-if="$store.state.userName">
          {{ "您好: " + $store.state.userName }}
        </span>
        <span
          v-else
          @click="toLogin"
          class="login"
          :style="{ borderColor: themeColor.color }"
          >点击登录</span
        >
        {{ $store.state.root == true ? "您是管理员!" : "" }}
        <span
          v-if="$store.state.userName"
          @click="loginOut"
          :style="{ borderColor: themeColor.color }"
          style="border: 1px solid; border-radius: 3px"
        >
          退出登录
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      newTime: "",
      xingqi: ""
    };
  },
  computed: {
    ...mapState(["themeColor"])
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "Login"
      });
    },
    loginOut() {
      this.$store.commit("changeName", {
        name: ""
      });
      this.$store.commit("changeRoot", {
        root: false
      });
      localStorage.removeItem("userName");
      localStorage.removeItem("root");
      this.toLogin();
      this.$message.success("退出成功!");
    },
    /**
     * 友好的时间格式
     * @param {*} date
     * @returns 2021-04-13 15:00:00
     */
    getDateString(date) {
      var year = date
        .getFullYear()
        .toString()
        .padStart(4, "0");
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var day = date
        .getDate()
        .toString()
        .padStart(2, "0");

      var hour = date
        .getHours()
        .toString()
        .padStart(2, "0");
      var minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      var second = date
        .getSeconds()
        .toString()
        .padStart(2, "0");

      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  mounted() {
    /**
     * 获取今天是星期几
     */
    let date = new Date();
    let weekNum = date.getDay();
    let weekday = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    this.newTime = weekday[weekNum];
    /**
     * 实时时间
     */
    setInterval(() => {
      const time = this.getDateString(new Date());
      this.xingqi = time;
    }, 100);
  }
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
  width: calc(100% - 200px);
  margin-left: 200px;
  height: 45px;
  border-bottom: 2px solid;
  // color: rgb(204, 204, 204);
  padding-left: 20px;

  // background-image: url(../assets/bg.png),
  //   linear-gradient(to left, rgb(121, 121, 121), rgb(51, 51, 51));
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
