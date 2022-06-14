<template>
  <div class="container">
    <div class="body">
    
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
