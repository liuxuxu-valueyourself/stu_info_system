<template>
  <div class="chart">
    <div class="address">
      <h3>地址分布</h3>
      <ve-pie :data="chartData1"></ve-pie>
    </div>
    <div class="sex">
      <h3>男女比例</h3>
      <ve-pie :data="chartData2"></ve-pie>
    </div>
    <div class="age">
      <h3>年龄分布柱状图</h3>
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </div>
  </div>
</template>

<script>
import { getData } from "../api/index.js";
export default {
  data() {
    this.chartSettings = {
      metrics: ["人数"],
      dataOrder: {
        label: "人数",
        order: "desc"
      }
    };
    return {
      // 年龄比例
      chartData: {
        columns: ["age", "人数"],
        rows: [
          { age: "18", 人数: 1393 },
          { age: "19", 人数: 3530 },
          { age: "20", 人数: 2923 },
          { age: "21", 人数: 1723 },
          { age: "22", 人数: 3792 },
          { age: "23", 人数: 4593 }
        ]
      },
      // 地址分布
      chartData1: {
        columns: ["address", "num"],
        rows: [
          // { 'address': "南京", 'num': 1393 },
          // { 'address': "南京", 'num': 1393 },
          // { 'address': "南京", 'num': 1393 }, // 根据请求来的数据 生成该对象格式 进行渲染
        ]
      },
      // 男女比例
      chartData2: {
        columns: ["sex", "num"],
        rows: [
          { sex: "男", num: 1393 },
          { sex: "女", num: 3530 }
        ]
      }
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      let res = await getData();
      // address: "南京"
      // age: "21"
      // email: "1515511@qq.com"
      // id: "51616"
      // name: "刘xx"
      // phone: "15051155299"
      // sex: "1"
      // time: "2021-02-03 05:48:39"

      // { 'address': "南京", 'num': 1393 },
      // { 'address': "北京", 'num': 1393 },
      // { 'address': "桃林", 'num': 1393 },
      let data1 = []; // 住址
      let data2 = []; // 男女生
      let data3 = []; // 年龄
      res.data.map(item => {
        let hasAddress = false;
        let hasSex = false;
        let hasAge = false;
        data1.map(item2 => {
          // 住址1
          if (item.address === item2.address) {
            hasAddress = true;
            item2.num++;
          }
        });
        if (!hasAddress) {
          data1.push({
            address: item.address,
            num: 1
          });
        }

        data2.map(item2 => {
          // 性别2
          if (item.sex == item2.sex) {
            hasSex = true;
            item2.num++;
          }
        });
        if (!hasSex) {
          data2.push({
            sex: item.sex,
            num: 1
          });
        }
        // 年龄3
        data3.map(item2 => {
          if (item.age == item2.age) {
            hasAge = true;
            item2["人数"]++;
          }
        });
        if (!hasAge) {
          data3.push({
            age: item.age,
            人数: 1
          });
        }
      });
      this.chartData1.rows = data1;
      data2.forEach(item => {
        if (item.sex == 0) {
          item.sex = "男";
        } else {
          item.sex = "女";
        }
      });
      this.chartData2.rows = data2;
      data3.forEach(item => (item.age = item.age + "岁"));
      this.chartData.rows = data3;
    }
  }
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  justify-content: space-around;
  margin-top: 66px;
  .address {
    width: 300px;
  }
  .sex {
    width: 300px;
  }
  .age {
    width: 300px;
  }
  h3 {
    text-align: center;
    font-size: 20px;
    color: #008c8c;
  }
}
@media screen and (max-width: 480px) {
  div.chart {
    margin-top: 10px;
    display: block;
    height: 88vh;
  }
  div.chart > div {
    width: 100vw !important;
  }
}
</style>
