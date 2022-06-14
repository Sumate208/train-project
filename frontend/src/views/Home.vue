<template>
  <div class="container column is-10">
    <div class="section">
      <div class="card">
        <div class="card-header"><p class="card-header-title">Header</p></div>
        <div class="card-content"><div class="content">Content</div></div>
      </div>
      <br />
      
      <div class="card">
        <div class="card-header"><p id="time" class="card-header-title"></p></div>
        <div class="card-content"><button class="button" @click="start()">start</button></div>
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
    start() {
      this.otpSending = true;
      var timeleft = 10;
      var downloadTimer = setInterval(() => {
          if(timeleft <= 0){
            document.getElementById("time").textContent = timeleft + " s";
            clearInterval(downloadTimer);
            this.otpSending = false;
          }else{
            document.getElementById("time").textContent = timeleft + " s";
          }
          timeleft -= 1;
        }, 1000);
    }
  }
}
</script>

<style>

</style>
