<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        1
      </div>
      <div class="column is-half">
        2
      </div>
    </div>
    <div id="col2" class="columns is-centered">
      <div class="column is-half">
        3
      </div>
      <div class="column is-half">
        4
      </div>  
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {
      user: null,
      otpSending: false,
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
  .column{
    border:solid red 1px;
    margin: 10px;
  }
  .container{
    min-height: 90vh;
    padding-left: 20vw;
    padding-right: 20vw;
    padding-top: 30vh;

  }
  @media screen and (max-width: 768px) {
    .container{
      padding-top: 10px;
    }
    #col2{
      margin-top: 10px;
    }
  }
</style>
