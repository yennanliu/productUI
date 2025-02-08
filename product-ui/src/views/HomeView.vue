<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to TechMart</h1>
        <p>Discover the latest in technology and innovation</p>
        <router-link to="/productList" class="cta-button">Shop Now</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-card">
        <i class="fas fa-shipping-fast"></i>
        <h3>Fast Shipping</h3>
        <p>Free delivery on orders over $50</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-lock"></i>
        <h3>Secure Payment</h3>
        <p>100% secure payment processing</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-headset"></i>
        <h3>24/7 Support</h3>
        <p>Dedicated support team</p>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="categories">
      <h2>Popular Categories</h2>
      <div class="category-grid">
        <div class="category-card" @click="$router.push('/productList')">
          <h3>Electronics</h3>
          <p>Latest gadgets and devices</p>
        </div>
        <div class="category-card" @click="$router.push('/productList')">
          <h3>Smart Home</h3>
          <p>Connected living solutions</p>
        </div>
        <div class="category-card" @click="$router.push('/productList')">
          <h3>Accessories</h3>
          <p>Essential add-ons</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
      <h2>Stay Updated</h2>
      <p>Subscribe to our newsletter for the latest products and deals</p>
      <div class="newsletter-form">
        <input type="email" placeholder="Enter your email" v-model="email">
        <button @click="subscribe">Subscribe</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribe() {
      if (this.email) {
        alert('Thank you for subscribing!')
        this.email = ''
      }
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(rgba(66, 184, 131, 0.8), rgba(66, 184, 131, 0.9)),
              url('https://via.placeholder.com/1920x1080') center/cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content {
  padding: 20px;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.5em;
  margin-bottom: 30px;
}

.cta-button {
  background-color: white;
  color: #42b883;
  padding: 15px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.cta-button:hover {
  background-color: #42b883;
  color: white;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 50px 20px;
  background-color: #f5f5f5;
}

.feature-card {
  text-align: center;
  padding: 30px;
}

.feature-card i {
  font-size: 2.5em;
  color: #42b883;
  margin-bottom: 20px;
}

.categories {
  padding: 50px 20px;
}

.categories h2 {
  text-align: center;
  margin-bottom: 30px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.category-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.newsletter {
  background-color: #42b883;
  color: white;
  padding: 50px 20px;
  text-align: center;
}

.newsletter-form {
  max-width: 500px;
  margin: 30px auto;
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

.newsletter-form button {
  padding: 10px 20px;
  background-color: white;
  color: #42b883;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.newsletter-form button:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2em;
  }
  
  .hero p {
    font-size: 1.2em;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form button {
    width: 100%;
  }
}
</style>
