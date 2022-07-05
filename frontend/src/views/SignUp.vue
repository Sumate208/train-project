<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <form action="" class="box">
              
              <div class="field">              
                <label for="" class="label">ชื่อ</label>
                <div class="control">
                  <input v-model="state.first_name" type="text" placeholder="ชื่อจริง" class="input" :class="[v$.first_name.$invalid ? 'is-danger' : 'is-success']">
                </div>
                <template v-if="v$.first_name.$invalid">
                  <p class="help is-danger" v-if="v$.first_name.required.$invalid">
                    {{ v$.first_name.required.$message }}
                  </p>
                </template>
              </div>

              <div class="field">
                <label class="label">นามสกุล</label>
                <div class="control">
                  <input v-model="state.last_name" type="text" placeholder="นามสกุล" class="input" :class="[v$.last_name.$invalid ? 'is-danger' : 'is-success']">
                </div>
                <template v-if="v$.last_name.$invalid">
                  <p class="help is-danger" v-if="v$.last_name.required.$invalid">
                    {{ v$.last_name.required.$message }}
                  </p>
                </template>
              </div>

              <div class="field">
                <label for="" class="label">รหัสบัตรประชาชน</label>
                <div class="control has-icons-left">
                  <input v-model="state.id_card" type="text" maxlength="13" placeholder="รหัสบัตรประชาชน 13 หลัก" class="input" :class="[v$.id_card.$invalid ? 'is-danger' : 'is-success']">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
                <template v-if="v$.id_card.$invalid">
                  <p class="help is-danger" v-if="v$.id_card.required.$invalid">
                    {{ v$.id_card.required.$message }}
                  </p>
                  <p class="help is-danger" v-if="v$.id_card.id_card.$invalid">
                    {{ v$.id_card.id_card.$message }}
                  </p>
                </template>
              </div>

              <div class="field">
                <label class="label">หน่วยงาน</label>
                <div class="control">
                  <div class="select" :class="[v$.agency.$invalid ? 'is-danger' : 'is-success']">
                    <select v-model="state.agency">
                      <option value="" disabled selected>เลือกสังกัดหน่วยงาน</option>
                      <optgroup label="ด้านบริหาร">
                        <option value="สำนักงานเลขานุการกรม">สำนักงานเลขานุการกรม</option>
                        <option value="กองบริหารทรัพยากรบุคคล">กองบริหารทรัพยากรบุคคล</option>
                        <option value="กลุ่มงานตรวจราชการ">กลุ่มงานตรวจราชการ</option>
                        <option value="กลุ่มงานตรวจสอบภายใน">กลุ่มงานตรวจสอบภายใน</option>
                        <option value="กลุ่มพัฒนาระบบบริหาร">กลุ่มพัฒนาระบบบริหาร</option>
                        <option value="กงอกฏหมาย">กงอกฏหมาย</option>
                        <option value="กองบริหารการคลัง">กองบริหารการคลัง</option>
                        <option value="กองยุทธศาสตร์และแผนงาน">กองยุทธศาสตร์และแผนงาน</option>
                        <option value="ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร">ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร</option>
                      </optgroup>
                      <optgroup label="ด้านที่ราชพัสดุ">
                        <option value="กองบริหารที่ราชพัสดุภูมิภาค">กองบริหารที่ราชพัสดุภูมิภาค</option>
                        <option value="กองเทคโนโลยีการสำรวจและฐานข้อมูลที่ราชพัสดุ">กองเทคโนโลยีการสำรวจและฐานข้อมูลที่ราชพัสดุ</option>
                        <option value="กองบริหารจัดการกรรมสิทธิ์ที่ราชพัสดุ">กองบริหารจัดการกรรมสิทธิ์ที่ราชพัสดุ</option>
                        <option value="กองพัฒนาธุรกิจและศักยภาพที่ราชพัสดุ">กองพัฒนาธุรกิจและศักยภาพที่ราชพัสดุ</option>
                        <option value="กองพัฒนาและบำรุงรักษาอาคารราชพัสดุ">กองพัฒนาและบำรุงรักษาอาคารราชพัสดุ</option>
                        <option value="กองบริหารที่ราชพัสดุกรุงเทพมหานคร">กองบริหารที่ราชพัสดุกรุงเทพมหานคร</option>
                        <option value="สำนักงานธนารักษ์พื้นที่">สำนักงานธนารักษ์พื้นที่</option>
                      </optgroup>
                      <optgroup label="ด้านการประเมินราคาทรัพย์สิน">
                        <option value="กองประเมินราคาทรัพย์สิน">กองประเมินราคาทรัพย์สิน</option>
                        <option value="กองมาตรฐานการประเมินทรัพย์สิน">กองมาตรฐานการประเมินทรัพย์สิน</option>
                      </optgroup>
                      <optgroup label="บริหารเงินตราและทรัพย์สินอันมีค่าของแผนดิน">
                        <option value="กองกษาปย์">กองกษาปย์</option>
                        <option value="กองส่งเสริมและพัฒนาทรัพย์สินมีค่าของรัฐ">กองส่งเสริมและพัฒนาทรัพย์สินมีค่าของรัฐ</option>
                        <option value="กองบริหารเงินตรา">กองบริหารเงินตรา</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <template v-if="v$.agency.$invalid">
                  <p class="help is-danger" v-if="v$.agency.required.$invalid">
                    {{ v$.agency.required.$message }}
                  </p>
                </template>
              </div>

              <div class="field">
                <label for="" class="label">เบอร์โทรศัพท์</label>
                <div class="control has-icons-left">
                  <input v-model="state.mobile" type="text" maxlength="10" placeholder="Ex.08X-XXX-XXXX" class="input" :class="[v$.mobile.$invalid ? 'is-danger' : 'is-success']">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <button id="sent" class="button is-right is-info" @click="sentOtp()" :disabled="otpSending || v$.mobile.$invalid">
                    <span id="countdowntimer" v-show="otpSending"></span>
                    <span v-if="!otpSending && firstCount"><i class="fa-solid fa-arrow-right"></i></span>
                    <span v-show="!otpSending && !firstCount"><i class="fa-solid fa-arrow-rotate-right"></i></span>
                  </button>
                </div>
                <template v-if="v$.mobile.$invalid">
                  <p class="help is-danger" v-if="v$.mobile.required.$invalid">
                    {{ v$.mobile.required.$message }}
                  </p>
                  <p class="help is-danger" v-if="v$.mobile.mobile.$invalid">
                    {{ v$.mobile.mobile.$message }}
                  </p>
                </template>
              </div>

              <div class="field">
                <label for="" class="label">รหัส OTP</label>
                <div class="control has-icons-left">
                  <input v-model="state.otp" type="text" maxlength="6" placeholder="ตัวอย่าง: 1a3sd8" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-paper-plane"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button class="button is-success" :disabled="v$.$invalid" @click="submit()">
                  Sign Up
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

const mobile = (value) => {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}
const id_card = (value) => {
  return !helpers.req(value) || !!value.match(/[0-9]{13}/);
}

export default {
  setup () {
    const state = reactive({
      first_name: "",
      last_name: "",
      id_card:"",
      agency: "",
      mobile: "",
      otp: ""
    })
    const rules = {
      first_name: {
        required: helpers.withMessage('กรุณากรอกชื่อจริง', required),
      },
      last_name: {
        required: helpers.withMessage('*กรุณากรอกนามสกุล', required),
      },
      id_card: {
        required: helpers.withMessage('*กรุณากรอกรหัสบัตรประชาชน', required),
        id_card: helpers.withMessage('*รหัสบัตรประชาชนไม่ถูกต้อง', id_card),
      },
      agency: {
        required: helpers.withMessage('*เลือกหน่วยงาน', required),
      },
      mobile: { 
        required: helpers.withMessage('*กรุณากรอกเบอร์โทรศัพท์', required),
        mobile: helpers.withMessage('*เบอร์โทรศัพท์ไม่ถูกต้อง', mobile)
      },
      otp: { 
        required: helpers.withMessage('*กรุณากรอกรหัส OTP 6 หลัก', required),
      },
    }
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  data() {
    return {
      otpSending: false,
      firstCount: true,
      modalAlert: false,
      mAlertText:'',
    };
  },
  methods: {
    sentOtp() {
      if(!this.v$.mobile.$invalid){
        var timeleft = 5;
        document.getElementById("countdowntimer").textContent = timeleft + "s";
        this.otpSending = true;
        const data = {
          mobile:this.state.mobile
        }
        axios
        .post("http://localhost:3000/sentotp", data)
        .then((res) => {
          console.log(res.data)
          this.mAlertText = res.data.msg;
          this.modalAlert = true;
        })
        .catch((err) => {
          console.log(err.response.data)
        });

        var cooldownTimer = setInterval(() => {
          if(timeleft <= 0){
            document.getElementById("countdowntimer").textContent = timeleft + "s";
            clearInterval(cooldownTimer);
            this.firstCount = false;
            this.otpSending = false;
          }else{
            document.getElementById("countdowntimer").textContent = timeleft + "s";
          }
          timeleft -= 1;
        }, 1000);
      }
    },
    submit() {
      // if(!this.v$.$invalid){
      //  const data = {
      //     first_name: this.first_name,
      //     last_name: this.last_name,
      //     id_card: this.id_card,
      //     agency: this.agency,
      //     mobile: this.mobile,

      //   };
      //   axios
      //     .post("http://localhost:3000/signup", data)
      //     .then((res) => {
      //       alert(res.data.msg);
      //       this.$router.push({path: '/signin'})
      //     })
      //     .catch((err) => {
      //       alert(err.response.data.details.message)
      //     }); 
      // }
      console.log(this.first_name)
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