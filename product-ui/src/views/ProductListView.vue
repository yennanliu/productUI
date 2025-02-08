<template>
  <div class="product-list">
    <h1>Our Products</h1>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2>{{ product.name }}</h2>
        <p class="price">${{ product.price }}</p>
        <ul class="features">
          <li v-for="(feature, index) in product.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListView',
  data: function() {
    return {
      products: [
        {
          id: 1,
          name: 'Premium Widget',
          price: 99.99,
          features: ['Durable', 'Eco-friendly', 'Easy to use']
        },
        {
          id: 2,
          name: 'Super Gadget',
          price: 149.99,
          features: ['Wireless', 'Long battery life', 'Compact design']
        },
        {
          id: 3,
          name: 'Mega Tool',
          price: 79.99,
          features: ['Versatile', 'Lightweight', 'Professional grade']
        }
      ]
    }
  }
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price {
  font-size: 1.5em;
  color: #42b883;
  font-weight: bold;
  margin: 10px 0;
}

.features {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin: 5px 0;
  color: #666;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin: 0;
}
</style> 