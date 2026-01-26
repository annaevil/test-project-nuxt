<template>
  <div class="theater-home">
    <div class="bg-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="line line-4"></div>
    </div>

    <main class="main-content">
      <section class="hero-brutal">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-tag">СЕЗОН 2026</div>
            <h1 class="hero-title">
              <span class="title-word">ТЕАТР</span>
              <span class="title-word accent">КАК</span>
              <span class="title-word">ИСКУССТВО</span>
              <span class="title-word accent">БЫТЬ</span>
            </h1>
            <p class="hero-subtitle">
              Raw-эстетика встречает классику. Голые эмоции без прикрас.
            </p>
            <div class="hero-actions">
              <button class="btn-brutal primary">
                <span class="btn-text">КУПИТЬ БИЛЕТЫ</span>
                <div class="btn-corner"></div>
              </button>
              <button class="btn-brutal secondary">
                <span>СМОТРЕТЬ АФИШУ</span>
              </button>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="brutal-shape shape-1"></div>
            <div class="brutal-shape shape-2"></div>
            <div class="brutal-shape shape-3"></div>
            <div class="performance-preview">
              <div class="preview-item" v-for="show in featuredShows" :key="show.id">
                <div class="preview-number">{{ show.id }}</div>
                <div class="preview-info">
                  <h4>{{ show.title }}</h4>
                  <p>{{ show.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="performances-grid-section">
        <div class="section-header">
          <h2 class="section-title">РЕПЕРТУАР</h2>
          <div class="section-subtitle">РАСПИСАНИЕ СПЕКТАКЛЕЙ</div>
        </div>
        
        <div class="performances-grid">
          <div 
            v-for="performance in performances" 
            :key="performance.id"
            class="performance-card-brutal"
          >
            <div class="card-header">
              <div class="card-date">{{ performance.date }}</div>
              <div class="card-genre">{{ performance.genre }}</div>
            </div>
            <div class="card-image-container">
              <img :src="performance.image" :alt="performance.title" class="card-image" />
              <div class="image-overlay-brutal"></div>
            </div>
            <div class="card-content-brutal">
              <h3 class="card-title-brutal">{{ performance.title }}</h3>
              <p class="card-description-brutal">{{ performance.description }}</p>
              <div class="card-meta">
                <span class="meta-item">⏱ 2ч 30м</span>
                <span class="meta-item">🎭 16+</span>
              </div>
              <div class="card-actions-brutal">
                <button class="card-btn-brutal buy">
                  <span>БРОНИРОВАТЬ</span>
                  <div class="btn-arrow">→</div>
                </button>
                <button class="card-btn-brutal details">
                  <span>О СПЕКТАКЛЕ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="quote-section">
        <div class="quote-container">
          <div class="quote-mark">"</div>
          <blockquote class="quote-text">
            Театр — это искусство отражать жизнь, не приукрашивая её. 
            Голая правда в каждом жесте, каждая эмоция — без фильтров.
          </blockquote>
          <div class="quote-author">— Художественный руководитель</div>
        </div>
      </section>

      <section class="features-section">
        <div class="features-container">
          <div class="feature-item">
            <div class="feature-icon">🎭</div>
            <h3>СЫРОЙ ЭМОЦИИ</h3>
            <p>Эмоции без цензуры и прикрас</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h3>СМЕЛЫЕ РЕШЕНИЯ</h3>
            <p>Экспериментальные постановки</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔊</div>
            <h3>ГОЛОС ПРАВДЫ</h3>
            <p>Искренность выше совершенства</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const performances = [
  {
    id: 1,
    title: "ГАМЛЕТ: RAW VERSION",
    genre: "ЭКСПЕРИМЕНТ",
    date: "15 АПР",
    description: "Шекспир без прикрас. Голые эмоции, минималистичные декорации, максимальная искренность.",
    image: "https://www.classicalmusicnews.ru/wp-content/uploads/2017/08/hamlet.jpg"
  },
  {
    id: 2,
    title: "ФИГАРО: DECONSTRUCTED",
    genre: "ДЕКОНСТРУКЦИЯ",
    date: "18 АПР", 
    description: "Классика, разобранная на атомы. Смех сквозь боль, радость сквозь слёзы.",
    image: "https://theatrecomedy.com/wp-content/uploads/2024/01/dsc_4877sv-1-scaled.jpg"
  },
  {
    id: 3,
    title: "ЛЕБЕДИ: BREAKING POINT",
    genre: "ПСИХОЛОГИЯ",
    date: "22 АПР",
    description: "Танец на грани нервного срыва. Красота, рожденная в муках творчества.",
    image: "https://uuopera.ru/wp-content/uploads/2024/10/lebedinoe-ozero-1920h1080.jpg"
  },
  {
    id: 4,
    title: "РЕВИЗОР: SYSTEM ERROR",
    genre: "САТИРА", 
    date: "25 АПР",
    description: "Абсурд бюрократии в цифровую эпоху. Гоголь глазами поколения Z.",
    image: "https://www.zdravrussia.ru/images/nnews/huge/6614.jpg"
  },
  {
    id: 5,
    title: "ЧАЙКА: UNPLUGGED",
    genre: "КАМЕРНЫЙ",
    date: "28 АПР",
    description: "Чехов без микрофонов и декораций. Только текст и человеческие отношения.",
    image: "https://static3.coolconnections.ru/images/17481/standard/hd/99f0e1f5fb844777bf96afd853311c65d4d78fcb.jpg?1707384986"
  },
  {
    id: 6,
    title: "КАРМЕН: URBAN",
    genre: "УРБАН",
    date: "30 АПР",
    description: "Страсть мегаполиса. Классика в ритме большого города.",
    image: "https://utv.ru/media/og_image/ae532b1818a03bb6d1b6580f12a56e54.jpg"
  }
]

const featuredShows = ref(performances.slice(0, 3))
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

// Фоновые линии
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

// Герой секция в стиле брутализм
.hero-brutal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 2px solid #333;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
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
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1.5rem;
  
  .title-word {
    display: block;
    
    &.accent {
      color: #fff;
      background: #000;
      padding: 0.5rem 1rem;
      display: inline-block;
      border: 2px solid #fff;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #ccc;
  line-height: 1.4;
  margin-bottom: 3rem;
  max-width: 500px;
  font-weight: 300;

  @media (max-width: 1024px) {
    margin: 0 auto 3rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
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
  
  &.primary {
    background: #000;
    color: #fff;
    
    .btn-corner {
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
      
      .btn-corner {
        background: #000;
      }
    }
  }
  
  &.secondary {
    background: transparent;
    color: #636363;
    border-color: #636363;
    
    &:hover {
      background: #636363;
      color: #fff;
    }
  }
}

// Визуальная часть героя
.hero-visual {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 400px;
  }
}

.brutal-shape {
  position: absolute;
  background: #000;
  border: 2px solid #fff;
  
  &.shape-1 {
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  
  &.shape-2 {
    width: 150px;
    height: 150px;
    bottom: 0;
    right: 0;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  
  &.shape-3 {
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

.performance-preview {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border: 2px solid #000;
  color: #000;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #000;
  
  &:last-child {
    border-bottom: none;
  }
}

.preview-number {
  font-size: 2rem;
  font-weight: 700;
  min-width: 40px;
}

.preview-info {
  h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.8rem;
    color: #666;
  }
}

// Сетка представлений
.performances-grid-section {
  padding: 6rem 2rem;
  background: #0a0a0a;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.section-subtitle {
  font-size: 1rem;
  color: #ccc;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.performances-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.performance-card-brutal {
  background: #1a1a1a;
  border: 2px solid #333;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: #fff;
    transform: translateY(-5px);
    
    .card-image {
      transform: scale(1.05);
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
}

.card-date {
  font-weight: 700;
  font-size: 1.1rem;
}

.card-genre {
  background: #000;
  color: #fff;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.card-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay-brutal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, #1a1a1a 100%);
}

.card-content-brutal {
  padding: 1.5rem;
}

.card-title-brutal {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-description-brutal {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  font-size: 0.8rem;
  color: #999;
}

.card-actions-brutal {
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.card-btn-brutal {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #333;
  background: transparent;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  
  &.buy {
    background: #000;
    border-color: #000;
    
    &:hover {
      background: #fff;
      color: #000;
    }
  }
  
  &.details {
    &:hover {
      background: #333;
    }
  }
  
  .btn-arrow {
    transition: transform 0.3s ease;
  }
  
  &:hover .btn-arrow {
    transform: translateX(3px);
  }
}

// Цитата
.quote-section {
  padding: 6rem 2rem;
  background: #000;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
}

.quote-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.quote-mark {
  font-size: 4rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1;
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}

.quote-author {
  font-size: 1rem;
  color: #ccc;
  font-style: italic;
}

// Особенности
.features-section {
  padding: 6rem 2rem;
  background: #0a0a0a;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  border: 2px solid #333;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #fff;
    transform: translateY(-5px);
  }
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.feature-item p {
  color: #ccc;
  line-height: 1.5;
}
</style>