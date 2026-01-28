<script setup>
import { ref } from 'vue'
import { ticketSales } from '@/mocks/ticketSales'

const report = ref([])
const reportTitle = ref('')

const generateAllSales = () => {
  reportTitle.value = 'Отчет обо всех продажах билетов'
  report.value = ticketSales
}

const generateByViewer = () => {
  reportTitle.value = 'Продажи определенного зрителя'
  report.value = ticketSales.filter(
    t => t.viewer.lastName === 'Иванов'
  )
}

const generateByPerformance = () => {
  reportTitle.value = 'Продажи по спектаклю'
  report.value = ticketSales.filter(
    t => t.performance === 'Ревизор'
  )
}

const generateByCashier = () => {
  reportTitle.value = 'Продажи по кассиру'
  report.value = ticketSales.filter(
    t => t.cashier.lastName === 'Петрова'
  )
}
</script>

<template>
  <div>
    <h2>Отчёты</h2>

    <button @click="generateAllSales">Все продажи</button>
    <button @click="generateByViewer">По зрителю</button>
    <button @click="generateByPerformance">По спектаклю</button>
    <button @click="generateByCashier">По кассиру</button>

    <h3 v-if="reportTitle">{{ reportTitle }}</h3>

    <table v-if="report.length">
      <thead>
        <tr>
          <th>Спектакль</th>
          <th>Дата</th>
          <th>Тип</th>
          <th>Зал</th>
          <th>Место</th>
          <th>Зритель</th>
          <th>Кассир</th>
          <th>Цена</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in report" :key="item.id">
          <td>{{ item.performance }}</td>
          <td>{{ item.datetime }}</td>
          <td>{{ item.performanceType }}</td>
          <td>{{ item.hall }}</td>
          <td>{{ item.row }} / {{ item.seat }}</td>
          <td>
            {{ item.viewer.lastName }}
            {{ item.viewer.firstName }}
          </td>
          <td>
            {{ item.cashier.lastName }}
            {{ item.cashier.firstName }}
          </td>
          <td>{{ item.price }} ₽</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
