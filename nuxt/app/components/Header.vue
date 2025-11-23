<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <nav class="nav">
      <div class="nav-brand">
        <div class="logo-glow">
          <h1 class="logo">NOIR<span class="logo-accent">SCÈNE</span></h1>
        </div>
      </div>
      
      <!-- Десктопное меню -->
      <ul class="nav-links">
        <li v-for="item in navItems" :key="item.name">
          <a 
            :href="item.href" 
            class="nav-link"
            :class="{ active: activeSection === item.name }"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>

      <!-- Мобильное меню -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <div class="menu-icon" :class="{ open: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="nav-actions">
        <button class="btn-account">
          <div class="btn-sparkle"></div>
          КАБИНЕТ
        </button>
      </div>
    </nav>

    <!-- Мобильное меню -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <a 
          v-for="item in navItems" 
          :key="item.name"
          :href="item.href" 
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('АФИША')

const navItems = [
  { name: 'АФИША', href: '#performances' },
  { name: 'ТЕАТР', href: '#theater' },
  { name: 'ТРУППА', href: '#team' },
  { name: 'КОНТАКТЫ', href: '#contacts' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(10, 10, 10, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
}

.logo-glow {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(120, 0, 255, 0.4) 0%, transparent 70%);
    filter: blur(20px);
    z-index: -1;
  }
}

.logo {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 3px;
  color: #fff;
  
  .logo-accent {
    background: linear-gradient(45deg, #ff00cc, #3333ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 3rem;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff00cc, #3333ff);
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
  
  &:hover,
  &.active {
    color: #ff00cc;
  }
}

.nav-actions {
  @media (max-width: 768px) {
    display: none;
  }
}

.btn-account {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  .btn-sparkle {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: #ff00cc;
    border-radius: 50%;
    filter: blur(1px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    
    .btn-sparkle {
      opacity: 1;
    }
  }
}

// Мобильное меню
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
}

.menu-icon {
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    
    &:nth-child(1) {
      top: 0px;
    }
    
    &:nth-child(2) {
      top: 8px;
    }
    
    &:nth-child(3) {
      top: 16px;
    }
  }
  
  &.open {
    span {
      &:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
        left: -60px;
      }
      
      &:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
      }
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 100%);
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(20px);
  transition: transform 0.3s ease;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;

  &.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
}

.mobile-menu-content {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.3s ease;

  &:hover {
    color: #ff00cc;
  }
}
</style>