<template>
  <div class="container homeBody">
    <div class="columns is-centered">
      <div class="column category is-half">
        <button class="button homeButton"></button>
      </div>
      <div class="column category is-half">
        <button class="button homeButton"></button>
      </div>
    </div>
    <div id="col2" class="columns is-centered">
      <div class="column category is-half">
        <button class="button homeButton"></button>
      </div>
      <div class="column category is-half">
        <button class="button homeButton"></button>
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
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = localStorage.getItem('ts-token')
      if (!token) {
        this.$router.push({path: '/signin'})
      }
    },

  }
}
</script>

<style>
  .category{
    padding: 0;
    margin: 10px;
    height: 20vh;
  }
  .homeBody{
    min-height: 90vh;
    padding-left: 20vw;
    padding-right: 20vw;
    padding-top: 20vh;
  }
  .homeButton{
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 0px 10px 0px #000000; 
    box-shadow: 0px 0px 10px 0px #000000;
  }
  @media screen and (max-width: 768px) {
    .homeBody{
      padding-top: 10px;
    }
    #col2{
      margin-top: 10px;
    }
  }
</style>
