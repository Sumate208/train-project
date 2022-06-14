<template>
  <div class="container column is-10">
    <div class="section">
      <div class="card">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card is-hidden1">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card is-hidden1">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card is-hidden1">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card is-hidden1">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card is-hidden1">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    // this.inLogin()
  },
  methods: {
    inLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({path: '/signin'})
      }
    },
  }
}
</script>

<style>
.body{
  height:100%;
  border: 1px solid black
}
</style>
