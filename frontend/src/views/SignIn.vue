<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="Username" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icon-right">
                  <input :type="[showPass ? 'text' : 'password']" placeholder="Password" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-lock"></i>
                  </span>
                  <button id="sPassBut" class="button is-right" @click="showPass = !showPass" :disabled="otpSending">
                    <span v-show="!showPass" class="icon is-small">
                        <i class="fa-solid"  :class="[showPass ? 'fa-eye-slash' : 'fa-eye']"></i>
                    </span>
                  </button>
                  
                  
                </div>
              </div>

              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox" v-model="remember">
                    Remember me
                  </label>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  required,
  helpers,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}

export default {
  data() {
    return {
      user: null,
      password: null,
      remember:false,
      showPass: false,
    };
  },
  mounted () {
    // this.inLogin()
    this.loadUsername()
  },
  methods: {
    loadUsername(){
        const rememLs = localStorage.getItem("remember");
        if(rememLs)this.user = rememLs
    },
    sentOtp() {
        
        var timeleft = 10;
        document.getElementById("countdowntimer").textContent = timeleft + "s";
        this.otpSending = true;
        var downloadTimer = setInterval(() => {
          if(timeleft <= 0){
            document.getElementById("countdowntimer").textContent = timeleft + "s";
            clearInterval(downloadTimer);
            this.firstCount = false;
            this.otpSending = false;
          }else{
            document.getElementById("countdowntimer").textContent = timeleft + "s";
          }
          timeleft -= 1;
        }, 1000);
      
    },
    submit() {
        if(this.remember){
            localStorage.setItem("username", this.user_number)
        }
        if(localStorage.getItem("username") && !this.remember){
            localStorage.removeItem("username")
        }
        alert("login ")
    },
  },
  validations: {
    mobile: {
      required: required,
      mobile: mobile,
    },
  },
};
</script>

<style>
  .body{
    padding-top: 20px;
    padding-left: 20vw;
    padding-right: 20vw;
  }
  #sPassBut {
    position: absolute;
    right: 0;
    border: 0px;
    margin: 2px;
    width: 35px;
    height: 35px
  }
</style>