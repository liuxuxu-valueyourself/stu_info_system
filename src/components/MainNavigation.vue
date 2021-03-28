<template>
  <!-- 主导航区域 -->
  <div class="menu">
    <dl>
      <dt>学生管理</dt>
      <dd
        :class="{ active: item.active }"
        v-for="(item, index) in menuArray"
        :key="index"
        @click="handleMenuClick(index)"
      >
        {{ item.title }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuArray: [
        {
          title: "学生列表",
          active: true,
          index: 0,
        },
        {
          title: "新增学生",
          active: false,
          index: 1,
        },
        {
          title: "图表统计",
          active: false,
          index: 2,
        },
      ],
    };
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
        }
      },
      deep: true, // 开启深度侦听
    },
  },
  methods: {
    handleMenuClick(i) {
      if (i === 0) {
        this.$router.push({
          name: "Home",
        });
      } else if (i === 1) {
        this.$router.push({
          name: "AddStudent",
        });
      } else if (i === 2) {
        this.$router.push({
          name: "Chart",
        });
      }
      this.menuArray.map(
        (item, index) => (item.active = index === i ? true : false)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  height: calc(100vh - 45px);
  background-image: url(../assets/bg.png),
    linear-gradient(to top, rgb(46, 46, 46), rgb(66, 66, 66));
  color: #ccc;
  width: 200px;
  dt {
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
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
    background: rgb(158, 158, 158);
    color: #4b4a4a;
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