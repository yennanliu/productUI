<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Coffee Shop Products</h1>
    <FilterBar 
      :categories="uniqueCategories" 
      @filter="applyFilter" 
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import FilterBar from "./FilterBar.vue";
import { products } from "@/data/products.js";

export default {
  components: { ProductCard, FilterBar },

  data() {
    return {
      products: products,
      filteredProducts: products
    };
  },

  computed: {
    uniqueCategories() {
      return [...new Set(this.products.map(product => product.category))];
    }
  },

  methods: {
    applyFilter(category) {
      this.filteredProducts = category
        ? this.products.filter(product => product.category === category)
        : this.products;
    }
  }
};
</script> 