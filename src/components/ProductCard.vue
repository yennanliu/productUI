<template>
  <div class="bg-white rounded-lg shadow p-4">
    <img :src="'/images/' + product.image" :alt="product.name" class="w-full h-48 object-cover rounded">
    <h3 class="text-xl font-bold mt-2">{{ product.name }}</h3>
    <p class="text-gray-600">{{ product.description }}</p>
    <div class="mt-2">
      <span class="text-blue-600 font-bold">${{ product.price }}</span>
      <span class="ml-2 text-gray-500">{{ product.category }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script> 