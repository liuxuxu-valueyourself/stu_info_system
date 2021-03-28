<template>
  <!-- 登录框 -->
  <div class="mantle">
    <div class="center">
      <slot></slot>
      <div class="close">
        <a-icon type="close-circle" style="font-size:30px;"
          @click="signOut"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    signOut() {
      this.$emit('singOut',false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .mantle {
    width: 100vw;
    height: 100vh;
    background: rgba(78, 78, 78, 0.76);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .center {
      width: 400px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      .close {
        cursor: pointer;
        position: absolute;
        top:-15px;
        right: -15px;
      }
    }
  }
  @media screen and (max-width: 480px) {
  div.center {
    width: 80% !important;    
  }
}
</style>