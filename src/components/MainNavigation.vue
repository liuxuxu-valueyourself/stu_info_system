<template>
  <!-- 主导航区域 -->
  <div
    class="menu"
    :style="{ background: themeColor.background, color: themeColor.color }"
  >
    <dl>
      <dt>学生管理</dt>
      <div class="centerDay" style="text-align: center; margin: 20px 0">
        {{ xingqi }}
        {{ newTime }}
      </div>
      <dd
        :class="{ active: item.active }"
        v-for="(item, index) in menuArray"
        :key="index"
        @click="handleMenuClick(index)"
      >
        {{ item.title }}
      </dd>
    </dl>
    <div class="theme">
      <div style="margin-bottom:10px">选择主题颜色：</div>

      <div class="one">
        <button
          @click="changeThemeColor(1)"
          :style="{
            background: themeColor.background,
            borderColor: themeColor.color
          }"
        >
          天蓝
        </button>
        <button
          @click="changeThemeColor(2)"
          :style="{
            background: themeColor.background,
            borderColor: themeColor.color
          }"
        >
          黑金
        </button>
        <button
          @click="changeThemeColor(3)"
          :style="{
            background: themeColor.background,
            borderColor: themeColor.color
          }"
        >
          淡紫
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      show: true,
      marginLeft: -100,
      newTime: "",
      xingqi: "",
      menuArray: [
        {
          title: "学生信息列表",
          active: true,
          index: 0
        },
        {
          title: "新增学生信息",
          active: false,
          index: 1
        },
        {
          title: "图表统计数据",
          active: false,
          index: 2
        }
      ]
    };
  },
  computed: {
    ...mapState(["themeColor"])
  },
  watch: {
    "$route.path": {
      handler() {
        let path = this.$route.path;
        if (path === "/") {
          this.handleMenuClick(0);
        } else if (path === "/AddStudent") {
          this.handleMenuClick(1);
        } else if (path === "/Chart") {
          this.handleMenuClick(2);
        } else if (path === "/Game") {
          this.handleMenuClick(3);
        }
      },
      deep: true // 开启深度侦听
    }
  },
  methods: {
    enter() {
      this.marginLeft = 0;
    },
    leave() {
      this.marginLeft = -100;
    },
    changeThemeColor(e) {
      if (e === 1) {
        // 极致天蓝
        this.$store.commit("changeThemeColor", {
          background: "#dcf0fe",
          color: "#077b7b"
        });
      }
      if (e === 2) {
        // 极致黑金
        this.$store.commit("changeThemeColor", {
          background: "#252525",
          color: "#c7a539"
        });
      }
      if (e === 3) {
        // 极致淡粉
        this.$store.commit("changeThemeColor", {
          background: "#eee0ff",
          color: "#996699"
        });
      }
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
    },
    handleMenuClick(i) {
      if (i === 0) {
        this.$router.push({
          name: "Home"
        });
      } else if (i === 1) {
        this.$router.push({
          name: "AddStudent"
        });
      } else if (i === 2) {
        this.$router.push({
          name: "Chart"
        });
      } else if (i === 3) {
        this.$router.push({
          name: "Game"
        });
      }
      this.menuArray.map(
        (item, index) => (item.active = index === i ? true : false)
      );
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
<style scoped>
.v-enter {
  opacity: 0;
  transform: translateX(-210px);
}
.v-enter-active {
  transition: all 0.3s;
}
.v-enter-to {
  opacity: 1;
  transform: translateX(-110px);
}
</style>
<style scoped lang="scss">
.menu {
  height: 100vh;
  margin-top: -45px;
  border-right: 2px solid;
  // background-image: url(../assets/bg.png),
  //   linear-gradient(to top, rgb(46, 46, 46), rgb(66, 66, 66));
  // color: #ccc;
  width: 200px;
  dt {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding-top: 10px;
  }
  .theme {
    cursor: pointer;
    text-align: center;
    margin-top: 45px;
    .one {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: flex-start;
      align-items: baseline;
      align-content: center;
    }
    button {
      width: 100px;
      height: 35px;
      border: 2px solid;
      cursor: pointer;
      border-radius: 6px;
    }
  }
  dd {
    margin-left: 35px;
    line-height: 35px;
    padding-left: 12px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    margin-bottom: 0px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      background: rgba(247, 247, 247, 0.219);
    }
  }
  dd.active {
    background: rgba(247, 247, 247, 0.38);
    font-weight: 700;
  }
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 480px) {
  div.menu {
    display: block;
    height: 9vh;
    width: 100vw;
    dl {
      display: flex;
      padding-top: 10px;
    }
    dt {
      padding: 5px;
      margin-right: 10vw;
    }
    dd {
      margin-left: 0;
      border-radius: 10px;
      text-align: center;
      padding: 0 5px;
      line-height: 40px;
      margin: 0 3px;
    }
  }
}
</style>
