<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Основная сетка -->
      <div class="footer-grid">
        <!-- Бренд и описание -->
        <div class="footer-col">
          <div class="footer-brand">
            <div class="footer-logo">NOIR<span>SCÈNE</span></div>
            <p class="footer-desc">
              Пространство, где рождаются легенды. С 1892 года создаём историю театрального искусства.
            </p>
          </div>
          
          <div class="newsletter">
            <h4>РАССЫЛКА</h4>
            <p>Узнавайте о премьерах первыми</p>
            <div class="newsletter-form">
              <input 
                type="email" 
                placeholder="your@email.com"
                class="newsletter-input"
                v-model="email"
              >
              <button class="newsletter-btn" @click="subscribe">
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Навигация -->
        <div class="footer-col">
          <h4>НАВИГАЦИЯ</h4>
          <nav class="footer-nav">
            <a 
              v-for="item in navItems" 
              :key="item.name"
              :href="item.href" 
              class="footer-nav-link"
            >
              {{ item.name }}
            </a>
          </nav>
        </div>

        <!-- Контакты -->
        <div class="footer-col">
          <h4>КОНТАКТЫ</h4>
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-text">
                <span>Москва, Театральная пл., 1</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-text">
                <span>+7 (495) 123-45-67</span>
                <small>Ежедневно 10:00-21:00</small>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">✉️</div>
              <div class="contact-text">
                <span>vip@noirscene.ru</span>
                <small>Премиум обслуживание</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Социальные сети -->
        <div class="footer-col">
          <h4>СОЦИАЛЬНЫЕ СЕТИ</h4>
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="social-link"
              target="_blank"
            >
              <div class="social-icon">{{ social.icon }}</div>
              <span>{{ social.name }}</span>
            </a>
          </div>

          <div class="awards">
            <h4>НАГРАДЫ</h4>
            <div class="awards-list">
              <div class="award">Золотая маска 2024</div>
              <div class="award">Театральная премия</div>
              <div class="award">Культура России</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="footer-divider"></div>

      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>© 2026 NOIRSCÈNE THEATRE. ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
          </div>
          
          <div class="footer-legal">
            <a href="#" class="legal-link">Политика конфиденциальности</a>
            <a href="#" class="legal-link">Правила посещения</a>
            <a href="#" class="legal-link">Договор оферты</a>
          </div>

          <div class="payment-methods">
            <div class="payment-text">Принимаем к оплате:</div>
            <div class="payment-icons">
              <span class="payment-icon">💳</span>
              <span class="payment-icon">📱</span>
              <span class="payment-icon">₿</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Бэкграунд элементы -->
    <div class="footer-bg-elements">
      <div class="bg-element el-1"></div>
      <div class="bg-element el-2"></div>
      <div class="bg-element el-3"></div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const navItems = [
  { name: 'Афиша', href: '#performances' },
  { name: 'Репертуар', href: '#repertoire' },
  { name: 'Труппа', href: '#team' },
  { name: 'О театре', href: '#about' },
  { name: 'Новости', href: '#news' },
  { name: 'Контакты', href: '#contacts' }
]

const socialLinks = [
  { name: 'INSTAGRAM', icon: '📸', url: 'https://instagram.com' },
  { name: 'TELEGRAM', icon: '✈️', url: 'https://telegram.org' },
  { name: 'YOUTUBE', icon: '🎥', url: 'https://youtube.com' },
  { name: 'VK', icon: '👥', url: 'https://vk.com' }
]

const subscribe = () => {
  if (email.value) {
    // Здесь логика подписки
    console.log('Subscribed:', email.value)
    email.value = ''
    // Можно добавить toast уведомление
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
  padding: 4rem 3rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.footer-col {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.9);
  }
}

.footer-brand {
  margin-bottom: 2rem;
}

.footer-logo {
  font-size: 2rem;
  font-weight: 300;
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(45deg, #ff00cc, #3333ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
}

.footer-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 400px;
}

.newsletter {
  p {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
}

.newsletter-form {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.9rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
  }
}

.newsletter-btn {
  background: linear-gradient(45deg, #ff00cc, #3333ff);
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #ff00cc, #3333ff);
    transform: scale(1.05);
  }
  
  span {
    color: white;
    font-weight: bold;
  }
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff00cc;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  gap: 0.75rem;
}

.contact-icon {
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.contact-text {
  display: flex;
  flex-direction: column;
  
  span {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
  
  small {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    color: #ff00cc;
    transform: translateX(5px);
  }
}

.social-icon {
  font-size: 1.2rem;
}

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.award {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
}

.copyright {
  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }
}

.footer-legal {
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.legal-link {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.payment-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.payment-icons {
  display: flex;
  gap: 0.5rem;
}

.payment-icon {
  font-size: 1.2rem;
  opacity: 0.7;
}

// Бэкграунд элементы
.footer-bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.bg-element {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 0, 255, 0.1) 0%, transparent 70%);
  
  &.el-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -100px;
  }
  
  &.el-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: 10%;
  }
  
  &.el-3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    right: 20%;
  }
}
</style>