<template>
  <div class="about">
    <div class="about-header">
      <h1>About TechMart</h1>
      <p class="tagline">Innovating the way you shop for technology</p>
    </div>

    <div class="about-content">
      <section class="company-intro">
        <h2>Who We Are</h2>
        <p>Founded in 2024, TechMart has grown from a small startup to one of the leading e-commerce platforms for technology products. We believe in making cutting-edge technology accessible to everyone while providing exceptional customer service.</p>
      </section>

      <section class="mission-vision">
        <div class="mission">
          <h2>Our Mission</h2>
          <p>To provide high-quality tech products at competitive prices while ensuring an outstanding shopping experience for our customers.</p>
        </div>
        <div class="vision">
          <h2>Our Vision</h2>
          <p>To become the most trusted destination for technology purchases, where innovation meets customer satisfaction.</p>
        </div>
      </section>

      <section class="values">
        <h2>Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <i class="fas fa-star"></i>
            <h3>Quality First</h3>
            <p>We never compromise on the quality of our products</p>
          </div>
          <div class="value-card">
            <i class="fas fa-heart"></i>
            <h3>Customer Focus</h3>
            <p>Your satisfaction is our top priority</p>
          </div>
          <div class="value-card">
            <i class="fas fa-shield-alt"></i>
            <h3>Trust & Security</h3>
            <p>Safe and secure shopping experience</p>
          </div>
          <div class="value-card">
            <i class="fas fa-sync"></i>
            <h3>Innovation</h3>
            <p>Always staying ahead with latest tech trends</p>
          </div>
        </div>
      </section>

      <section class="team">
        <h2>Our Team</h2>
        <p>Led by technology enthusiasts and e-commerce experts, our team is dedicated to bringing you the best shopping experience possible.</p>
      </section>

      <section class="contact-info">
        <h2>Get in Touch</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>support@techmart.com</p>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>1-800-TECH-MART</p>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>123 Tech Street<br>Silicon Valley, CA 94025</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
}

.about-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(rgba(66, 184, 131, 0.9), rgba(66, 184, 131, 0.8));
  color: white;
  margin-bottom: 40px;
}

.tagline {
  font-size: 1.2em;
  margin-top: 10px;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 50px;
}

.company-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
}

.mission-vision {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.mission, .vision {
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.value-card {
  text-align: center;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.value-card i {
  font-size: 2em;
  color: #42b883;
  margin-bottom: 15px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.contact-item {
  text-align: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.contact-item i {
  font-size: 2em;
  color: #42b883;
  margin-bottom: 15px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
  color: #34495e;
}

@media (max-width: 768px) {
  .about-header {
    padding: 30px 20px;
  }

  h1 {
    font-size: 2em;
  }

  .values-grid, .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
