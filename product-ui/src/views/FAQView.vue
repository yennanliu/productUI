<template>
  <div class="faq">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-container">
      <div v-for="(item, index) in faqItems" 
           :key="index" 
           class="faq-item"
           :class="{ 'active': item.isOpen }">
        <div class="faq-question" @click="toggleFAQ(index)">
          <h3>{{ item.question }}</h3>
          <i class="fas" :class="item.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>
        <div class="faq-answer" v-show="item.isOpen">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQView',
  data() {
    return {
      faqItems: [
        {
          question: "How do I track my Amazon order?",
          answer: "Once you click 'Buy Now', you'll be redirected to Amazon where you can track your order through your Amazon account.",
          isOpen: false
        },
        {
          question: "What payment methods are accepted?",
          answer: "All payments are processed through Amazon's secure payment system, which accepts major credit cards, debit cards, and Amazon payment methods.",
          isOpen: false
        },
        {
          question: "Do you ship internationally?",
          answer: "International shipping availability depends on Amazon's shipping policies for your region.",
          isOpen: false
        },
        {
          question: "What is your return policy?",
          answer: "All returns are handled through Amazon's return policy, which typically offers a 30-day return window.",
          isOpen: false
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach us through our contact form, email at support@techmart.com, or call us at 1-800-TECH-MART.",
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen
    }
  }
}
</script>

<style scoped>
.faq {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.faq-container {
  margin-top: 30px;
}

.faq-item {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  padding: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  margin: 0;
  color: #2c3e50;
}

.faq-answer {
  padding: 20px;
  background-color: white;
}

.faq-item.active .faq-question {
  background-color: #42b883;
  color: white;
}

.faq-item.active .faq-question h3 {
  color: white;
}

.fas {
  transition: transform 0.3s ease;
}

.faq-item.active .fas {
  transform: rotate(180deg);
}
</style> 