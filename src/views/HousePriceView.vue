<template>
  <div class="">
    <NavBar />
    <PageTitle title="房屋單價表" />
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(item, idx) in houseData.Buildings()" :key="idx">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(buildingFloor, idx) in houseData.BuildingMap()" :key="idx">
          <template v-for="(house, hid) in buildingFloor" :key="hid">
            <td
              v-if="house.valid"
              v-bind:style="{
                backgroundColor:
                  colors[houseData.TransactionMonthArray().indexOf(house.transactionYearMonth)]
              }"
            >
              {{ formatDateToYYYYMMDD(house.transactionDate) }}
              <br />
              {{ numberPaddingWith10000(house.unitPrice) }}
            </td>
            <template v-else>
              <td v-if="hid == 0">{{ houseData.TotalFloor() - idx }}F</td>
              <td v-else></td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { HouseData } from '../data/houseData'
import { ColorData } from '../data/colorData'
import PageTitle from './../components/PageTitle.vue'
import NavBar from './../components/NavBar.vue'

export default defineComponent({
  name: 'HousePriceView',
  components: {
    NavBar,
    PageTitle
  },
  setup() {
    // Init
    const houseData = new HouseData()
    const colorData = new ColorData(houseData.TransactionAmount().length, 'DDDDFF', '6666FF')

    const colors = ref<string[]>(colorData.Colors())

    houseData.BuildingMap()

    function numberPaddingWith10000(input: number): number {
      return Math.round(input / 100) / 100
    }

    function formatDateToYYYYMMDD(date: Date): string {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}/${month}/${day}`
    }

    return { houseData, colors, numberPaddingWith10000, formatDateToYYYYMMDD }
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
/* tbody tr:nth-child(even) {
  background-color: #f5f5f5;
} */
tbody tr {
  font-size: 15px;
  /* color: gray; */
  line-height: 1.2;
  font-weight: unset;
}
tbody td:hover {
  color: #555;
  /* background-color: #f5f5f5; */
  cursor: pointer;
}
</style>
