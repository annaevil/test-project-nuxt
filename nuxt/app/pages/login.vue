<template>
  <div class="theater-home">
    <div class="main-content">
      <form class="hero-brutal hero-container" @submit.prevent="login">
        <div>
          <span class="hero-tag">Авторизация</span>
          <input v-model="email" type="email" placeholder="Email" class="input-brutal" />
          <input v-model="password" type="password" placeholder="Пароль" class="input-brutal" />
          <button type="submit" class="btn-brutal primary">Войти</button>
          <div v-if="error" style="color: #ff4c4c; margin-top: 1rem;">{{ error }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    localStorage.setItem('user', JSON.stringify(res))

    if (res.role === 'admin') {
      router.push('/admin')  
    } else {
      router.push('/')       
    }
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка авторизации'
  }
}

</script>

<style lang="scss" scoped>
.theater-home {
  min-height: 100vh;
  background: 
    linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  overflow-x: hidden;
  position: relative;
}

.bg-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.line {
  position: absolute;
  background: rgba(255, 255, 255, 0.03);
  
  &.line-1 {
    top: 20%;
    left: 10%;
    width: 1px;
    height: 60%;
  }
  
  &.line-2 {
    top: 10%;
    right: 20%;
    width: 1px;
    height: 80%;
  }
  
  &.line-3 {
    top: 30%;
    left: 30%;
    width: 40%;
    height: 1px;
  }
  
  &.line-4 {
    bottom: 20%;
    right: 10%;
    width: 50%;
    height: 1px;
  }
}

.main-content {
  position: relative;
  z-index: 1;
}

.hero-brutal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  border-bottom: 2px solid #333;

  &.hero-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
  }
}

.hero-tag {
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  align-self: flex-start;
}

.input-brutal {
  padding: 1rem 1.25rem;
  background: #1a1a1a;
  border: 2px solid #333;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  margin: 0;
  min-width: 0;
  
  &::placeholder {
    color: #636363;
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border-color: #fff;
    background: #000;
    
    &::before {
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
  
  &[type="password"] {
    letter-spacing: 2px;
  }
  
  &[type="email"] {
    text-transform: lowercase;
  }
}

.btn-brutal {
  padding: 1rem 2rem;
  border: 2px solid #000;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  width: 100%;
  margin-top: 0.5rem;
  
  &.primary {
    background: #000;
    color: #fff;
    
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      width: 12px;
      height: 12px;
      background: #fff;
      transition: all 0.3s ease;
    }
    
    &:hover {
      background: #fff;
      color: #000;
      
      &::after {
        background: #000;
      }
    }
    
    &:active {
      transform: translateY(2px);
    }
  }
  
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    
    &.primary {
      background: #333;
      border-color: #333;
      
      &::after {
        background: #636363;
      }
    }
  }
}

.error-message {
  color: #ff4c4c;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 76, 76, 0.1);
  border: 2px solid #ff4c4c;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  
  &::before {
    content: '⚠';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
  }
  
  padding-left: 2.5rem;
}

.login-visual {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 300px;
    margin-top: 2rem;
  }
}

.brutal-shape {
  position: absolute;
  background: #000;
  border: 2px solid #fff;
  
  &.shape-1 {
    width: 150px;
    height: 150px;
    top: 50px;
    left: 50px;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  
  &.shape-2 {
    width: 120px;
    height: 120px;
    bottom: 50px;
    right: 50px;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  
  &.shape-3 {
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
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

.hero-brutal > div {
  animation: slideIn 0.6s ease-out;
}

.input-brutal, .btn-brutal {
  animation: slideIn 0.6s ease-out;
  
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
}

@media (max-width: 768px) {
  .hero-brutal {
    padding: 0 1rem;
    
    &.hero-container {
      gap: 2rem;
    }
  }
  
  .input-brutal {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }
  
  .btn-brutal {
    padding: 0.875rem 1.5rem;
    font-size: 0.85rem;
  }
  
  .hero-tag {
    align-self: center;
  }
}

.input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #0a0a0a;
  padding: 0 8px;
  font-size: 0.8rem;
  color: #ccc;
  font-weight: 500;
  letter-spacing: 1px;
  z-index: 1;
}

.input-with-icon {
  position: relative;
  
  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #636363;
    font-size: 1.2rem;
  }
  
  .input-brutal {
    padding-left: 3rem;
  }
}
</style>
