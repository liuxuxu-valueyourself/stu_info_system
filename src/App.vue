<template>
  <div class="app">
    <MainTop />
    <div class="main">
      <div class="main-menu">
        <MainNavigation />
      </div>
      <div
        class="main-content"
        :style="{ color: themeColor.color, background: themeColor.background }"
      >
        <!-- <transition mode="out-in"> -->
        <router-view></router-view>
        <!-- </transition> -->
        <!-- <transition name="router-fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./components/MainNavigation.vue";
import MainTop from "./components/MainTop.vue";
import { mapState } from "vuex";

const userName = localStorage.getItem("userName");
const root = localStorage.getItem("root");

export default {
  components: {
    MainNavigation,
    MainTop
  },
  computed: {
    ...mapState(["themeColor"])
  },
  mounted() {
    if (!userName) {
      this.$router.push({
        name: "Login"
      });
      return;
    }
    if(root && userName) {
      this.$store.commit("changeRoot", {
      root: true
    });
    }
    this.$store.commit("changeName", {
      name: userName
    });
  }
};
</script>
<style scoped lang="scss">
.app {
  overflow: hidden;
}
.main {
  display: flex;
  .main-menu {
    // width: 200px;
  }
  .main-content {
    flex-grow: 1;
  }
}

@media screen and (max-width: 480px) {
  div.main-content {
    width: 100vw;
    position: absolute;
    overflow-x: auto;
    margin-top: 17vw;
  }
  div.main {
    position: fixed;
    top: 10vw;
    width: 100vw;
    height: 10vw;
  }
}
</style>
<style scoped>
/* .v-enter {
  transform: translateY(-750px);
}
.v-enter-active {
  transition: all 0.3s;
}
.v-enter-to {
  transform: translateY(0px);
} */
</style>
