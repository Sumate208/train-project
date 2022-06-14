<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">เบอร์โทรศัพท์</label>
                <div class="control has-icons-left">
                  <input type="text" maxlength="10" placeholder="Ex.08X-XXX-XXXX" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <button id="sent" class="button is-right" @click="sentOtp()" :disabled="otpSending">
                    <span id="countdowntimer" v-show="otpSending"></span>
                    <span v-if="!otpSending && firstCount"><i class="fa-solid fa-arrow-right"></i></span>
                    <span v-show="!otpSending && !firstCount"><i class="fa-solid fa-arrow-rotate-right"></i></span>
                  </button>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">รหัส OTP</label>
                <div class="control has-icons-left">
                  <input type="text" maxlength="6" placeholder="123456" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
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
      mobile: "",
      otp: "",
      otpSending: false,
      firstCount: true,
    };
  },
  methods: {
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
    padding-left: 30vw;
    padding-right: 30vw;
  }
  #sent {
    position: absolute;
    right: 0;
  }
</style>