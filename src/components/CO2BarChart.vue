<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup lang="ts">
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const props = defineProps<{
    labels: string[]
    values: number[]
  }>()
  
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: 'Émissions CO₂ (kg)',
        backgroundColor: '#5fc163',
        data: props.values,
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Historique des émissions CO₂',
      },
    },
  }
  </script>
  