<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Добавить продажу билета</h2>
      <form @submit.prevent="submitSale">
        <label>
          Спектакль:
          <select v-model="sessionId">
            <option v-for="s in sessions" :key="s.id" :value="s.id">
              {{ s.title }} — {{ new Date(s.datetime).toLocaleString() }}
            </option>
          </select>
        </label>
        <label>
          Цена билета:
          <input type="number" v-model.number="price" min="0" />
        </label>

        <div class="buttons">
          <button type="submit">Добавить</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sessions = ref<any[]>([])
const users = ref<any[]>([])
const sessionId = ref<number | null>(null)
const userId = ref<number | null>(null)
const price = ref<number>(0)
const error = ref('')

const emit = defineEmits<{
  (e: 'close'): void
}>()

onMounted(async () => {
  try {
    sessions.value = await $fetch('/api/performances')
    users.value = await $fetch('/api/users')
  } catch (e: any) {
    error.value = 'Ошибка загрузки данных'
  }
})

async function submitSale() {
  if (!sessionId.value || !userId.value || price.value <= 0) {
    error.value = 'Заполните все поля'
    return
  }

  try {
    await $fetch('/api/sales/add', {
      method: 'POST',
      body: {
        sessionId: sessionId.value,
        userId: userId.value,
        price: price.value
      }
    })
    alert('Продажа добавлена!')
    emit('close') 
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка при добавлении'
  }
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(45deg, transparent 65%, rgba(255, 255, 255, 0.02) 65%, rgba(255, 255, 255, 0.02) 75%, transparent 75%),
      linear-gradient(-45deg, transparent 65%, rgba(255, 255, 255, 0.02) 65%, rgba(255, 255, 255, 0.02) 75%, transparent 75%);
    background-size: 40px 40px;
    pointer-events: none;
  }
}

.modal {
  background: #0a0a0a;
  border: 2px solid #fff;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  animation: modalAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
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

@keyframes modalAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal h2 {
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

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  
  &::before {
    content: '↘';
    position: absolute;
    right: 0;
    top: 0;
    color: #636363;
    font-size: 0.8rem;
  }
}

select, input[type="number"] {

  padding: 1rem 1.25rem;
  background: #1a1a1a;
  border: 2px solid #333;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;
  
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
  
  option {
    background: #1a1a1a;
    color: #fff;
    padding: 1rem;
    font-family: 'Space Grotesk', sans-serif;
  }
}

select {
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%23fff' stroke-width='2' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 1rem) center;
  background-size: 12px;
  padding-right: 3rem;
}

input[type="number"] {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &::placeholder {
    color: #636363;
  }
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
}

button {
  flex: 1;
  padding: 1rem 2rem;
  border: 2px solid;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
  
  &[type="submit"] {
    background: #000;
    color: #fff;
    border-color: #000;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1;
    }
    
    span {
      position: relative;
      z-index: 2;
    }
    
    &:hover {
      color: #000;
      
      &::before {
        transform: translateX(0);
      }
    }
    
    &:active {
      transform: translateY(2px);
    }
  }
  
  &[type="button"] {
    background: transparent;
    color: #ccc;
    border-color: #333;
    
    &:hover {
      background: #333;
      color: #fff;
    }
    
    &:active {
      transform: translateY(2px);
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
}

.error {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 76, 76, 0.1);
  border: 2px solid #ff4c4c;
  color: #ff4c4c;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  
  &::before {
    content: '⚠';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  padding-left: 2.5rem;
}

.modal-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  font-size: 0.8rem;
  color: #636363;
  text-align: center;
}

form > * {
  animation: slideIn 0.4s ease-out;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 1rem;
  }
  
  .modal {
    padding: 1.5rem;
    max-width: 100%;
  }
  
  .modal h2 {
    font-size: 1.5rem;
  }
  
  select, input[type="number"] {
    padding: 0.875rem 1rem;
  }
  
  button {
    padding: 0.875rem 1.5rem;
  }
}

.modal {
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}
</style>


