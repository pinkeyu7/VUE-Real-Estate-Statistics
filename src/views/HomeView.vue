<template>
  <div class="">
    <NavBar />
    <PageTitle title="每月銷售數量表" />
    <div>
      <table>
        <thead>
          <tr>
            <th>月份</th>
            <th>銷售戶數</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in houseData.TransactionMonthArray()" :key="idx">
            <td>{{ item.replace('_', '-') }}</td>
            <td>{{ houseData.TransactionAmount()[idx] }}</td>
          </tr>
          <tr>
            <td>已銷售總戶數</td>
            <td>{{ houseData.TotalHouse() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HouseData } from '../data/houseData'
import PageTitle from './../components/PageTitle.vue'
import NavBar from './../components/NavBar.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    NavBar,
    PageTitle
  },
  setup() {
    // Init
    const houseData = new HouseData()

    return { houseData }
  }
})
</script>

<style scoped>
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
table * {
  position: relative;
}
table td,
table th {
  padding-left: 8px;
}
table th {
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
  font-weight: unset;
}
table thead tr {
  height: 60px;
  background: #000000;
}
table tbody tr {
  height: 50px;
}
table tbody tr:last-child {
  border: 0;
}
table td,
table th {
  text-align: left;
}
table td.l,
table th.l {
  text-align: right;
}
table td.c,
table th.c {
  text-align: center;
}
table td.r,
table th.r {
  text-align: center;
}
tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}
tbody tr {
  font-size: 15px;
  color: gray;
  line-height: 1.2;
  font-weight: unset;
}
tbody tr:hover {
  color: #555;
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
