<template>
  <!-- <Page :now="now" :allData="allData" @nowChange="Change" /> -->
  <div class="page">
    <a
      href=""
      class="page-item first"
      :class="{
        disabled: now === 1
      }"
      @click.prevent="handleClick(1)"
      >首页</a
    >
    <a
      href=""
      class="page-item last"
      :class="{
        disabled: now === 1
      }"
      @click.prevent="handleClick(now - 1)"
      >上一页</a
    >

    <a
      href=""
      class="page-item"
      v-for="item in number"
      :key="item"
      :class="{
        active: item === now
      }"
      @click.prevent="handleClick(item)"
    >
      {{ item }}
    </a>

    <a
      href=""
      class="page-item next"
      :class="{
        disabled: now === allPage
      }"
      @click.prevent="handleClick(now + 1)"
      >下一页</a
    >
    <a
      href=""
      class="page-item end"
      :class="{
        disabled: now === allPage
      }"
      @click.prevent="handleClick(allPage)"
      >尾页</a
    >
    <span> {{ now }} </span>
    /
    <span> {{ allPage }} </span>
  </div>
</template>

<script>
export default {
  props: {
    now: {
      //当前页数
      type: Number,
      default: 1
    },
    allData: {
      //总数据量
      type: Number,
      default: 0
    },
    capacity: {
      //一页显示的数量
      type: Number,
      default: 6
    },
    PageCount: {
      //总页数
      type: Number,
      default: 10
    }
  },
  computed: {
    allPage() {
      return Math.ceil(this.allData / this.PageCount);
    },
    minNumber() {
      let min = this.now - this.capacity / 2;
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    maxNumber() {
      let max = this.minNumber + this.capacity - 1;
      if (max > this.allPage) {
        max = this.allPage;
      }
      return max;
    },
    number() {
      let arr = [];
      for (let i = this.minNumber; i <= this.maxNumber; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    handleClick(n) {
      if (n < 1) {
        n = 1;
      }
      if (n > this.allPage) {
        n = allPage;
      }
      this.$emit("nowChange", n);
    }
  }
};
</script>

<style scoped>
.page {
  text-align: center;
  margin: 20px 0;
}
.page .page-item {
  display: inline-block;
  padding: 5px 7px;
  border: 1px solid #ccc;
  margin: 8px;
  cursor: pointer;
  color: rgb(96, 96, 224);
}
.page .page-item.disabled {
  color: #ccc;
  cursor: not-allowed;
}
.page .page-item.active {
  color: #008c8c;
  border: 1px solid #008c8c;
  cursor: auto;
}
</style>
