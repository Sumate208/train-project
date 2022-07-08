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
                  <input type="text" v-model="state.username" placeholder="Username" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icon-right">
                  <input :type="[showPass ? 'text' : 'password']" v-model="state.password" placeholder="Password" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-lock"></i>
                  </span>
                  <button id="sPassBut" class="button is-right" @click="showPass = !showPass" :disabled="otpSending">
                    <span v-if="!showPass" class="icon is-small">
                        <i class="fa-solid fa-eye"></i>
                    </span>
                    <span v-if="showPass" class="icon is-small">
                        <i class="fa-solid fa-eye-slash"></i>
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
                <button @click="submit()" class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL -->
  <div class="modal" :class="{'is-active':modalAlert}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Alert</p>
        <button class="delete" aria-label="close" @click="modalAlert = false"></button>
      </header>
      <section class="modal-card-body">
        {{ mAlertText }}
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="modalAlert = false">OK</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue';
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'

export default {
  emits:["auth-change"],
  setup () {
    const state = reactive({
      username:"",
      password: "",
    })
    const rules = {
      username: {
        required: helpers.withMessage('*กรุณากรอก Username', required),
      },
      password: { 
        required: helpers.withMessage('*กรุณากรอก Password', required),
      },
    }
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  data() {
    return {
      remember:false,
      showPass: false,
      error:"",
      mAlertText:"",
      modalAlert:false,
    };
  },
  mounted () {
    // this.inLogin()
    this.loadUsername()
  },
  methods: {
    loadUsername(){
        const rememLs = localStorage.getItem("username");
        if(rememLs){
          this.state.username = rememLs;
          this.remember = true;
        }
    },
    submit() {
        const data = {
          username: this.state.username,
          password: this.state.password,
        }
        axios.post("http://localhost:3000/signin", data)
        .then(res => {
          
          this.mAlertText = "เข้าสู่ระบบ";
          this.modalAlert = true;
          if(this.remember){
            localStorage.setItem("username", this.state.username)
          }
          if(localStorage.getItem("username") && !this.remember){
            localStorage.removeItem("username")
          }
          const token = res.data.token;
          localStorage.setItem('ts-token', token);
          this.$emit('auth-change', "Hello");
          this.$router.push({path: '/'});
        })
        .catch(err => {
          this.mAlertText = err.response.data;
          this.modalAlert = true;
        })
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
    border: hidden;
    outline: none;
    box-shadow: none;
    margin: 2px;
    width: 35px;
    height: 35px
  }
  .modal-card-foot{
    justify-content: end;
  }
</style>