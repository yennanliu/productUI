<template>
  <div class="search-page">
    <div class="search-container">
      <div class="search-header">
        <h1>Search Products</h1>
        <div class="search-controls">
          <div class="search-input">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by name, ID, or features..."
              @input="performSearch"
            >
          </div>
          <div class="filter-section">
            <select v-model="selectedCategory" @change="performSearch">
              <option value="">All Categories</option>
              <option v-for="category in categories" 
                      :key="category" 
                      :value="category">
                {{ category }}
              </option>
            </select>
            <div class="price-filter">
              <input 
                type="number" 
                v-model.number="minPrice" 
                placeholder="Min Price"
                @input="performSearch"
              >
              <input 
                type="number" 
                v-model.number="maxPrice" 
                placeholder="Max Price"
                @input="performSearch"
              >
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchResults.length" class="search-results">
        <div v-for="product in searchResults" 
             :key="product.id" 
             class="product-card"
             @click="goToDetail(product.id)">
          <h2>{{ product.name }}</h2>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-id">ID: {{ product.id }}</p>
          <p class="price">${{ product.price }}</p>
          <ul class="features">
            <li v-for="(feature, index) in product.features" 
                :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="no-results">
        No products found matching your criteria
      </div>
    </div>
  </div>
</template>

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'SearchView',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      minPrice: '',
      maxPrice: '',
      allProducts: productData.products
    }
  },
  computed: {
    categories() {
      return [...new Set(this.allProducts.map(product => product.category))]
    },
    searchResults() {
      return this.allProducts.filter(product => {
        // Check search query
        const searchLower = this.searchQuery.toLowerCase()
        const matchesSearch = !this.searchQuery || 
          product.name.toLowerCase().includes(searchLower) ||
          product.id.toString().includes(searchLower) ||
          product.features.some(feature => 
            feature.toLowerCase().includes(searchLower)
          )

        // Check category
        const matchesCategory = !this.selectedCategory || 
          product.category === this.selectedCategory

        // Check price range
        const matchesMinPrice = !this.minPrice || 
          product.price >= this.minPrice
        const matchesMaxPrice = !this.maxPrice || 
          product.price <= this.maxPrice

        return matchesSearch && matchesCategory && 
               matchesMinPrice && matchesMaxPrice
      })
    }
  },
  methods: {
    performSearch() {
      // Method stub for future implementation of debounced search
    },
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
    }
  }
}
</script>

<style scoped>
.search-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: 30px;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.search-input input {
  width: 100%;
  padding: 12px;
  border: 2px solid #42b883;
  border-radius: 4px;
  font-size: 1.1em;
}

.filter-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-section select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.price-filter {
  display: flex;
  gap: 10px;
}

.price-filter input {
  width: 120px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
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

.product-category {
  color: #42b883;
  font-weight: bold;
  margin: 5px 0;
}

.product-id {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.price {
  font-size: 1.2em;
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

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }
  
  .price-filter {
    width: 100%;
  }
  
  .price-filter input {
    flex: 1;
  }
}
</style> 