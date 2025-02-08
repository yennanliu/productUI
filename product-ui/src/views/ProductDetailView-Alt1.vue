<template>
  <div class="product-detail">
    <div class="product-container" v-if="product">
      <div class="product-gallery">
        <div class="main-image">
          <img v-if="product.image" 
               :src="require(`@/assets/data/${product.image}`)" 
               :alt="product.name">
        </div>
      </div>

      <div class="product-info">
        <h1>{{ product.name }}</h1>
        
        <div class="price">
          ${{ product.price }}
        </div>

        <div class="product-description">
          <h2>Features</h2>
          <ul class="features-list">
            <li v-for="(feature, index) in product.features" 
                :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="product-actions">
          <button class="buy-button" @click="goToAmazon">
            Buy Now on Amazon
          </button>
          <button class="back-button" @click="$router.push('/productList')">
            Back to Products
          </button>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      Product not found
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  padding: 60px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  background: white;
  border-radius: 20px;
  padding: 60px;
}

.product-gallery {
  width: 100%;
}

.main-image {
  width: 100%;
  height: 600px; /* Increased height */
  border-radius: 15px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 20px 0;
}

h1 {
  font-size: 4em;
  color: #2B3647; /* Dark navy color from screenshot */
  margin-bottom: 30px;
  font-weight: 800; /* Extra bold weight */
  letter-spacing: -0.02em; /* Slight negative letter spacing */
  line-height: 1.1;
}

.price {
  font-size: 3em; /* Larger price */
  font-weight: bold;
  color: #42b883;
  margin: 40px 0;
}

h2 {
  font-size: 2em;
  color: #2c3e50;
  margin: 40px 0 20px 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 30px 0;
}

.features-list li {
  font-size: 1.5em; /* Larger feature text */
  color: #666;
  margin: 20px 0;
}

.product-actions {
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.buy-button, .back-button {
  padding: 20px 40px;
  border: none;
  border-radius: 10px;
  font-size: 1.3em;
  cursor: pointer;
  transition: transform 0.3s;
}

.buy-button {
  background: #f4a261; /* Amazon-like orange */
  color: white;
}

.back-button {
  background: #42b883;
  color: white;
}

.buy-button:hover, .back-button:hover {
  transform: translateY(-2px);
}

.not-found {
  text-align: center;
  padding: 100px;
  font-size: 1.5em;
  color: #666;
}

@media (max-width: 1200px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 30px;
  }

  .main-image {
    height: 400px;
  }

  h1 {
    font-size: 2.5em;
  }

  .price {
    font-size: 2em;
  }

  .features-list li {
    font-size: 1.2em;
  }
}
</style> 