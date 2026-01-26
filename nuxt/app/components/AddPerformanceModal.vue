<template>
  <div class="add-performance">
    <h2>Добавить спектакль</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <form @submit.prevent="addPerformance">
      <input v-model="title" placeholder="Название спектакля" required />
      <textarea v-model="description" placeholder="Описание"></textarea>
      <input type="number" v-model.number="duration" placeholder="Длительность (мин)" />
      <input v-model="age_rating" placeholder="Возрастное ограничение" />
      <input v-model="director" placeholder="Режиссер" />
      <input v-model="poster" placeholder="Ссылка на постер" />
      <select v-model.number="genre_id">
        <option value="">Выберите жанр</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>

      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const title = ref('')
const description = ref('')
const duration = ref<number | null>(null)
const age_rating = ref('')
const director = ref('')
const poster = ref('')
const genre_id = ref<number | null>(null)
const error = ref('')
const success = ref('')
const genres = ref<{ id: number; name: string }[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/api/genres')
    genres.value = await res.json()
  } catch {
    error.value = 'Не удалось загрузить жанры'
  }
})

async function addPerformance() {
  error.value = ''
  success.value = ''

  try {
    await fetch('/api/performances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        duration: duration.value,
        age_rating: age_rating.value,
        director: director.value,
        poster: poster.value,
        genre_id: genre_id.value,
      }),
    })

    success.value = 'Спектакль добавлен'
    title.value = ''
    description.value = ''
    duration.value = null
    age_rating.value = ''
    director.value = ''
    poster.value = ''
    genre_id.value = null
  } catch {
    error.value = 'Ошибка при добавлении спектакля'
  }
}
</script>
<style lang="scss" scoped>
.add-performance {
  background: #1a1a1a;
  border: 2px solid #333;
  padding: 2.5rem;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  animation: slideIn 0.4s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 20px;
    height: 20px;
    background: #fff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 20px;
    height: 20px;
    background: #fff;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #fff;
  }
}

// Форма
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// Группы полей
.form-group {
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    .required {
      color: #f44336;
      margin-left: 2px;
    }
  }
}

// Общие стили для инпутов
input, textarea, select {
  padding: 1rem 1.25rem;
  background: #0a0a0a;
  border: 2px solid #333;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  appearance: none;
  
  &::placeholder {
    color: #636363;
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border-color: #fff;
    background: #000;
    
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      background: #fff;
    }
  }
  
  &:hover {
    border-color: #636363;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Специфичные стили
input[type="text"],
input[type="number"] {
  &[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

textarea {
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 0;
    
    &:hover {
      background: #444;
    }
  }
}

select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%23fff' stroke-width='2' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 1rem) center;
  background-size: 12px;
  padding-right: 3rem;
  
  option {
    background: #1a1a1a;
    color: #fff;
    padding: 1rem;
    font-family: 'Space Grotesk', sans-serif;
    
    &:disabled {
      color: #636363;
    }
  }
}

// Кнопка
button[type="submit"] {
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: #000;
  border: 2px solid #000;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
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
  
  &:hover {
    color: #000;
    
    &::before {
      width: 100%;
      right: auto;
      left: 0;
    }
  }
  
  &:active {
    transform: translateY(2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    
    &::before {
      display: none;
    }
  }
}

// Сообщения
.error, .success {
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: 2px solid;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

.error {
  background: rgba(244, 67, 54, 0.1);
  border-color: #f44336;
  color: #f44336;
  
  &::before {
    content: '⚠';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  padding-left: 2.5rem;
}

.success {
  background: rgba(76, 175, 80, 0.1);
  border-color: #4CAF50;
  color: #4CAF50;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  padding-left: 2.5rem;
}

// Характеристики спектакля
.performance-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border: 1px solid #333;
  
  .detail-label {
    font-size: 0.8rem;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.25rem;
  }
  
  .detail-value {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }
}

// Предпросмотр постера
.poster-preview {
  margin: 1.5rem 0;
  position: relative;
  
  .preview-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .preview-container {
    position: relative;
    min-height: 200px;
    background: #0a0a0a;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
    &.has-poster {
      border-color: #4CAF50;
    }
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
  
  .preview-placeholder {
    color: #636363;
    font-size: 0.9rem;
    text-align: center;
    padding: 2rem;
  }
}

// Валидация
.validation-error {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #f44336;
  animation: slideIn 0.2s ease-out;
}

// Анимации для элементов формы
form > * {
  animation: slideIn 0.3s ease-out;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
  &:nth-child(6) { animation-delay: 0.6s; }
  &:nth-child(7) { animation-delay: 0.7s; }
  &:nth-child(8) { animation-delay: 0.8s; }
}

// Медиа-запросы
@media (max-width: 768px) {
  .add-performance {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  input, textarea, select {
    padding: 0.875rem 1rem;
  }
  
  button[type="submit"] {
    padding: 0.875rem 1.5rem;
  }
  
  .performance-details {
    grid-template-columns: 1fr;
  }
}

// Загрузка
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  .spinner {
    width: 40px;
    height: 40px;
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

// Тень для контейнера
.add-performance {
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}
</style>

