<template>
  <div class="product-list">
    <h1>Our Products</h1>
    <div class="products-grid">
      <div v-for="product in paginatedProducts" 
           :key="product.id" 
           class="product-card"
           @click="goToDetail(product.id)">
        <h2>{{ product.name }}</h2>
        <p class="price">${{ product.price }}</p>
        <ul class="features">
          <li v-for="(feature, index) in product.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>

    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="currentPage--"
        class="page-button"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
        class="page-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'ProductListView',
  data: function() {
    return {
      products: productData.products,
      currentPage: 1,
      itemsPerPage: 6
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.products.slice(start, end)
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
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
  margin-bottom: 30px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
}

.page-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.page-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.page-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.page-info {
  color: #666;
  font-size: 1.1em;
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