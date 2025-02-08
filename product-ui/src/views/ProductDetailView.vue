<template>
  <div class="product-detail">
    <div class="product-card" v-if="product">
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
      <button class="back-button" @click="$router.push('/productList')">
        Back to Products
      </button>
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
      product: null
    }
  },
  created() {
    const productId = parseInt(this.$route.params.id)
    this.product = productData.products.find(p => p.id === productId)
  }
}
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.back-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
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
</style> 