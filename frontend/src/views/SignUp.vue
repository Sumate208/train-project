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
                  <input v-model="first_name" type="text" placeholder="ชื่อ" class="input">
                </div>
                <!-- <template v-if="$v.first_name.$errors">
                  <p class="help is-danger" v-if="!$v.first_name.required">
                    *ระบุชื่อจริง
                  </p>
                </template> -->
              </div>

              <div class="field">
                <label class="label">นามสกุล</label>
                <div class="control">
                  <input v-model="last_name" type="text" maxlength="10" placeholder="นามสกุล" class="input">
                </div>
                <!-- <template v-if="$v.last_name.$errors">
                  <p class="help is-danger" v-if="!$v.last_name.required">
                    *ระบุนามสกุล
                  </p>
                </template> -->
              </div>

              <div class="field">
                <label for="" class="label">รหัสบัตรประชาชน</label>
                <div class="control has-icons-left">
                  <input v-model="user_number" type="text" placeholder="Ex.1111111111111" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
                <!-- <template v-if="$v.user_number.$errors">
                  <p class="help is-danger" v-if="!$v.user_number.required">
                    *กรอกรหัสบัตรประชาชน
                  </p>
                  <p class="help is-danger" v-if="!$v.user_number.user_number">
                    *รหัสบัตรประชาชนไม่ถูกต้อง
                  </p>
                </template> -->
              </div>

              <div class="field">
                <label class="label">หน่วยงาน</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option class="opTitle" disabled selected>เลือกสังกัดหน่วยงาน</option>
                      <optgroup class="opTitle" label="ด้านบริหาร">
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
                      <optgroup class="opTitle" label="ด้านที่ราชพัสดุ">
                        <option value="กองบริหารที่ราชพัสดุภูมิภาค">กองบริหารที่ราชพัสดุภูมิภาค</option>
                        <option value="กองเทคโนโลยีการสำรวจและฐานข้อมูลที่ราชพัสดุ">กองเทคโนโลยีการสำรวจและฐานข้อมูลที่ราชพัสดุ</option>
                        <option value="กองบริหารจัดการกรรมสิทธิ์ที่ราชพัสดุ">กองบริหารจัดการกรรมสิทธิ์ที่ราชพัสดุ</option>
                        <option value="กองพัฒนาธุรกิจและศักยภาพที่ราชพัสดุ">กองพัฒนาธุรกิจและศักยภาพที่ราชพัสดุ</option>
                        <option value="กองพัฒนาและบำรุงรักษาอาคารราชพัสดุ">กองพัฒนาและบำรุงรักษาอาคารราชพัสดุ</option>
                        <option value="กองบริหารที่ราชพัสดุกรุงเทพมหานคร">กองบริหารที่ราชพัสดุกรุงเทพมหานคร</option>
                        <option value="สำนักงานธนารักษ์พื้นที่">สำนักงานธนารักษ์พื้นที่</option>
                      </optgroup>
                      <optgroup class="opTitle" label="ด้านการประเมินราคาทรัพย์สิน">
                        <option value="กองประเมินราคาทรัพย์สิน">กองประเมินราคาทรัพย์สิน</option>
                        <option value="กองมาตรฐานการประเมินทรัพย์สิน">กองมาตรฐานการประเมินทรัพย์สิน</option>
                      </optgroup>
                      <optgroup class="opTitle" label="บริหารเงินตราและทรัพย์สินอันมีค่าของแผนดิน">
                        <option value="กองกษาปย์">กองกษาปย์</option>
                        <option value="กองส่งเสริมและพัฒนาทรัพย์สินมีค่าของรัฐ">กองส่งเสริมและพัฒนาทรัพย์สินมีค่าของรัฐ</option>
                        <option value="กองบริหารเงินตรา">กองบริหารเงินตรา</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <!-- <template v-if="$v.user_number.$errors">
                  <p class="help is-danger" v-if="!$v.user_number.required">
                    *กรอกรหัสบัตรประชาชน
                  </p>
                  <p class="help is-danger" v-if="!$v.user_number.user_number">
                    *รหัสบัตรประชาชนไม่ถูกต้อง
                  </p>
                </template> -->
              </div>

              <div class="field">
                <label for="" class="label">เบอร์โทรศัพท์</label>
                <div class="control has-icons-left">
                  <input v-model="mobile" type="text" maxlength="10" placeholder="Ex.08X-XXX-XXXX" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                  <button id="sent" class="button is-right is-info" @click="sentOtp()" :disabled="otpSending">
                    <span id="countdowntimer" v-show="otpSending"></span>
                    <span v-if="!otpSending && firstCount"><i class="fa-solid fa-arrow-right"></i></span>
                    <span v-show="!otpSending && !firstCount"><i class="fa-solid fa-arrow-rotate-right"></i></span>
                  </button>
                </div>
                <!-- <template v-if="$v.mobile.$errors">
                  <p class="help is-danger" v-if="!$v.mobile.required">
                    *ระบุเบอร์โทรศัพท์
                  </p>
                  <p class="help is-danger" v-if="!$v.mobile.mobile">
                    *เบอร์โทรศัพท์ไม่ถูกต้อง
                  </p>
                </template> -->
              </div>

              <div class="field">
                <label for="" class="label">รหัส OTP</label>
                <div class="control has-icons-left">
                  <input v-model="otp" type="text" maxlength="6" placeholder="123456" class="input">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-paper-plane"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button class="button is-success" @click="submit()">
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
// import useVuelidate from '@vuelidate/core'
// import {
//   required,
//   helpers,
// } from '@vuelidate/validators'

// const mobile = (value) => {
//   return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
// }
// const user_number = (value) => {
//   return !helpers.req(value) || !!value.match(/[0-9]{13}/);
// }

export default {
  // setup () {return { v$: useVuelidate() }},
  data() {
    return {
      first_name: "",
      last_name: "",
      user_number: "",
      mobile: "",
      otp: "",
      otpSending: false,
      firstCount: true,
    };
  },
  methods: {
    sentOtp() {
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
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
      // }
    },
    submit() {
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      //   alert("Successfully signup")
      // }
      alert("Successfully Register")
    },
  },
  // validations () {
  //   return {
  //     first_name: {
  //       required: required,
  //     },
  //     last_name: {
  //       required: required,
  //     },
  //     user_number: {
  //       required: required,
  //       user_number: user_number,
  //     },
  //     mobile: {
  //       required: required,
  //       mobile: mobile,
  //     }, 
  //   }
  // }
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