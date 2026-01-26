<template>
  <div v-if="user" class="admin-panel">
    <h1>Админ-панель</h1>
    <p>Добро пожаловать, {{ user.name }}</p>

    <section class="admin-actions">
      <h2>Продажи билетов</h2>
      <button @click="showAddSale = true">Добавить продажу билета</button>
      <button @click="showUpdatePrice = true">Изменить цену билета</button>

      <h2>Спектакли</h2>
      <button @click="showEditPerformance = true">Изменить тип спектакля</button>

      <h2>Отчеты</h2>
      <button @click="generateAllSales">Все продажи</button>
      <button @click="generateByViewer">По зрителю</button>
      <button @click="generateByPerformance">По спектаклю</button>
      <button @click="generateByCashier">По кассиру</button>

      <h2>Спектакли</h2>
      <button @click="showAddPerformance = true">Добавить спектакль</button>
      <button @click="showEditPerformance = true">Изменить тип спектакля</button>
    </section>

    <!-- Модальные окна / компоненты для действий -->
    <AddSaleModal v-if="showAddSale" @close="showAddSale = false" />
    <AddPerformanceModal v-if="showAddPerformance" @close="showAddPerformance = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import AddSaleModal from "../components/AddSaleModal.vue"
import AddPerformanceModal from "../components/AddPerformanceModal.vue"

const router = useRouter()
const user = ref<{ name: string; role: string } | null>(null)

const showAddSale = ref(false)
const showUpdatePrice = ref(false)
const showEditPerformance = ref(false)
const showAddPerformance = ref(false)

onMounted(() => {
  const stored = localStorage.getItem("user")
  if (!stored) {
    router.push("/login")
    return
  }
  user.value = JSON.parse(stored)
  if (user.value?.role !== "admin") {
    router.push("/")
  }
})

function generateAllSales() {
  alert("Сгенерирован отчет обо всех продажах")
}
function generateByViewer() {
  alert("Сгенерирован отчет по зрителю")
}
function generateByPerformance() {
  alert("Сгенерирован отчет по спектаклю")
}
function generateByCashier() {
  alert("Сгенерирован отчет по кассиру")
}
</script>

<style lang="scss" scoped>
.admin-panel {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Space Grotesk", sans-serif;
  color: #fff;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
  position: relative;
  overflow-x: hidden;

  // Фоновые элементы
  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.02);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    z-index: 0;
  }

  &::after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.02);
    clip-path: polygon(0 100%, 100% 100%, 0 0);
    z-index: 0;
  }
}

.panel-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

// Заголовок
h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: #fff;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.welcome-message {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
  font-weight: 300;
  letter-spacing: 1px;

  .user-name {
    font-weight: 700;
    color: #fff;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

// Основные секции
.admin-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.section-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #333;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: #fff;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    .section-header::after {
      width: 100%;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    width: 15px;
    height: 15px;
    background: #fff;
  }
}

.section-header {
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }
}

// Кнопки действий
.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #000;
  border: 2px solid #000;
  color: #fff;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: #fff;
    transition: width 0.3s ease;
    z-index: 1;
  }

  span {
    position: relative;
    z-index: 2;
  }

  .btn-icon {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
    font-size: 1.1rem;
  }

  &:hover {
    color: #000;

    &::before {
      width: 100%;
      right: auto;
      left: 0;
    }

    .btn-icon {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(2px);
  }

  // Варианты кнопок по категориям
  &.sales {
    border-color: #4caf50;
    &::after {
      content: "💰";
    }
  }

  &.performances {
    border-color: #2196f3;
    &::after {
      content: "🎭";
    }
  }

  &.reports {
    border-color: #ff9800;
    &::after {
      content: "📊";
    }
  }

  // Альтернативный стиль для отчетов
  &.report-btn {
    background: transparent;
    color: #ccc;
    border-color: #333;

    &:hover {
      background: #333;
      color: #fff;

      &::before {
        display: none;
      }
    }
  }
}

// Быстрые действия (верхняя панель)
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.quick-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ccc;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .badge {
    margin-left: auto;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    font-size: 0.8rem;
    font-weight: 700;
  }
}

// Статистика
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.stat-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #333;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #fff;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
    margin: 0.5rem 0;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .stat-change {
    font-size: 0.8rem;
    margin-top: 0.5rem;

    &.positive {
      color: #4caf50;
    }

    &.negative {
      color: #f44336;
    }
  }
}

// Индикатор загрузки для модалок
.modal-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #333;
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Анимации
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.admin-sections {
  animation: fadeIn 0.6s ease-out;
}

.section-card {
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
}

// Адаптивность
@media (max-width: 768px) {
  .admin-panel {
    padding: 1rem;
  }

  .admin-sections {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}

// Темная тема для текстовых элементов
.text-muted {
  color: #888;
  font-size: 0.9rem;
}

.text-danger {
  color: #f44336;
  font-weight: 600;
}

.text-success {
  color: #4caf50;
  font-weight: 600;
}
</style>
