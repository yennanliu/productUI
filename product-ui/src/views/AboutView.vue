<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="about-content">
      <p>Welcome to our application! We are dedicated to providing the best possible experience for our users.</p>
      <section class="mission">
        <h2>Our Mission</h2>
        <p>To create innovative solutions that make a difference in people's lives.</p>
      </section>
      <section class="contact">
        <h2 class="contact-heading">Get in Touch</h2>
        <p>Have questions? Feel free to reach out to us at contact@example.com</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.mission, .contact {
  margin-top: 30px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

p {
  line-height: 1.6;
  color: #34495e;
}

.contact-heading {
  color: #42b883; /* Vue.js green color */
}
</style>
