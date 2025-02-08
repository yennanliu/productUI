<template>
  <div class="product-list">
    <h1>Our Products</h1>
    
    <!-- Category Filter Tabs -->
    <div class="category-tabs">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Products Grid -->
    <div class="products-masonry">
      <div v-for="product in filteredProducts" 
           :key="product.id" 
           class="product-card"
           :class="{ 'featured': product.featured }"
           @click="goToDetail(product.id)">
        <div class="product-image">
          <img v-if="product.image" :src="require(`@/assets/data/${product.image}`)" :alt="product.name">
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p class="category">{{ product.category }}</p>
          <p class="price">${{ product.price }}</p>
          <ul class="features">
            <li v-for="(feature, index) in product.features.slice(0,2)" 
                :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <button v-if="hasMoreProducts" 
            @click="loadMore" 
            class="load-more">
      Load More Products
    </button>
  </div>
</template>

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'ProductListView',
  data() {
    return {
      products: productData.products,
      selectedCategory: 'All',
      displayLimit: 6
    }
  },
  computed: {
    categories() {
      const cats = ['All', ...new Set(this.products.map(p => p.category))]
      return cats
    },
    filteredProducts() {
      let filtered = this.selectedCategory === 'All' 
        ? this.products 
        : this.products.filter(p => p.category === this.selectedCategory)
      return filtered.slice(0, this.displayLimit)
    },
    hasMoreProducts() {
      return this.displayLimit < this.products.length
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
    },
    loadMore() {
      this.displayLimit += 6
    }
  }
}
</script>

<style scoped>
.product-list {
  padding: 40px 20px;
}

.category-tabs {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  overflow-x: auto;
  padding-bottom: 10px;
}

.category-tabs button {
  padding: 10px 20px;
  border: none;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.category-tabs button.active {
  background: #42b883;
  color: white;
}

.products-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-info {
  padding: 20px;
}

.product-info h2 {
  font-size: 2em;
  color: #2B3647;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 15px;
}

.category {
  color: #42b883;
  font-weight: 500;
  margin: 5px 0;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

.features {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.features li {
  color: #666;
  margin: 5px 0;
}

.load-more {
  display: block;
  margin: 40px auto;
  padding: 15px 30px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background 0.3s;
}

.load-more:hover {
  background: #3aa876;
}

@media (max-width: 768px) {
  .products-masonry {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style> 