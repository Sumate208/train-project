<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <form class="box">

              <div class="field">
                <label for="" class="label">รหัส OTP</label>
                <div class="control has-icons-left">
                  <input v-model="otp" type="text" maxlength="6" placeholder="123456" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-paper-plane"></i>
                  </span>
                </div>
              </div>
              <!-- <div class="field">
                <form action="/upload" enctype="multipart/form-data" method="POST">
                  Select Image:<input type="file" name="image"/>
                  <input type="submit" value="upload"/>
                </form>
              </div> -->
                <!-- <div class="field">
                    <label class="label">เบอร์โทรศัพท์</label>
                    <div class="control">
                        <input class="input" :class="[v$.link.$invalid ? 'is-danger' : 'is-success']" v-model="state.link">
                        <div class="input-errors" v-for="error of v$.link.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div> 
                    </div>
                     <template v-if="v$.link.$invalid">
                        <p class="help is-danger" v-if="v$.link.required.$invalid">
                            {{ v$.link.required.$message }}
                        </p>                       
                    </template>
                </div> -->

                <div class="field">
                    <button class="button is-success"  @click="cpOtp()">
                    Sent OTP
                    </button>
                </div>
                <div class="field">
                    <button class="button is-success"  @click="checkOTP()">
                    check OTP
                    </button>
                </div>
                <!-- <div class="field">
                    <button class="button is-success"  @click="checkState()">
                    check state
                    </button>
                </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue';
import useValidate from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import { required,helpers} from '@vuelidate/validators'

export default {
  setup () {
    const state = reactive({
        link: 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all',
    })
    const rules = {
      link: {
        required: helpers.withMessage('*ระบุ URL', required), 
      }
    }
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  data() {
    return {
      otp: "",
      otpSending: false,
      firstCount: true,
      ct:null,
    };
  },
  methods: {
    cpOtp(){
      axios
        .get("http://localhost:3000/genotp")
        .then((res) => {
          this.ct = res.data.ctext;
          console.log('OTP: '+res.data.otp)
          console.log('hash: '+res.data.ctext)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
    },
    checkOTP(){
      const data = {
        otp: this.otp,
        ct: this.ct
      }
      axios
        .put("http://localhost:3000/checkotp", data)
        .then((res) => {
          console.log(res.data.msg)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
    },
    checkState(){
      console.log(this.state.link)
    },
    submit() {
      const data = {
          link: this.state.link,
        };
        axios
          .put("http://localhost:3000/testapi", data)
          .then((res) => {
            console.log("URL: "+res.data.link)
            console.log("OTP: "+res.data.otp)
          })
          .catch((err) => {
            console.log(err.response.data)
          });
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
  #sent {
    position: absolute;
    right: 0;
  }
  .select{
    width: 100%;
  }
  select{
    max-height: 30vh;
    width: 100%;
  }
  select .opTitle{
    font-weight: bold;    
  }
</style>