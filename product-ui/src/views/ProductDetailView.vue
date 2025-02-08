<template>
  <div class="product-detail">
    <div class="product-card" v-if="product">
      <div class="product-image">
        <img v-if="product.image" :src="require(`@/assets/data/${product.image}`)" :alt="product.name">
        <div v-else class="no-image">No image available</div>
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price">${{ product.price }}</p>
        <div class="features-section">
          <h2>Features</h2>
          <ul class="features">
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="button-group">
          <button class="buy-now-button" @click="goToAmazon">
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

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'ProductDetailView',
  data: function() {
    return {
      product: null,
      amazonUrl: 'https://www.amazon.com/stores/page/F3691F18-FD51-4154-843D-C8DC8BB9598A?channel=amazonVehicleShowroom'
    }
  },
  created() {
    const productId = parseInt(this.$route.params.id)
    this.product = productData.products.find(p => p.id === productId)
  },
  methods: {
    goToAmazon() {
      window.open(this.amazonUrl, '_blank')
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.product-image {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 2em;
  color: #42b883;
  font-weight: bold;
  margin: 20px 0;
}

.features-section {
  margin: 20px 0;
}

.features {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin: 10px 0;
  color: #666;
  font-size: 1.1em;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: auto;
}

.buy-now-button {
  background-color: #ff9900; /* Amazon's orange color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  flex: 1;
}

.buy-now-button:hover {
  background-color: #ff8400;
}

.back-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  flex: 1;
}

.back-button:hover {
  background-color: #3aa876;
}

.not-found {
  text-align: center;
  color: #666;
  font-size: 1.2em;
  margin-top: 50px;
}

h1 {
  color: #2c3e50;
  margin: 0;
}

h2 {
  color: #2c3e50;
}

@media (max-width: 768px) {
  .product-card {
    grid-template-columns: 1fr;
  }
}

.no-image {
  background-color: #f5f5f5;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
}
</style> 