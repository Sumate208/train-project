<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Profile</p>
      </div>
    </section>

    <!-- <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <label class="label">First Name</label>
        <div class="control">
          <input
            v-model="$v.first_name.$model"
            :class="{ 'is-danger': $v.first_name.$error }"
            class="input"
            type="text"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.first_name.$error">
          <p class="help is-danger" v-if="!$v.first_name.required">
            This field is required
          </p>
        </template>
      </div>
      <div class="column is-one-quarter">
        <label class="label">Last Name</label>
        <div class="control">
          <input
                v-model="$v.last_name.$model"
                :class="{ 'is-danger': $v.last_name.$error }"
                class="input"
                type="text"
                v-bind:disabled="!edit"
              />
        </div>
        <template v-if="$v.last_name.$error">
          <p class="help is-danger" v-if="!$v.last_name.required">
            This field is required
          </p>
        </template>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-one-quarter">
        <label class="label">Email</label>
        <div class="control">
          <input
          v-model="$v.email.$model"
          :class="{ 'is-danger': $v.email.$error }"
          class="input"
          type="text"
          v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.email.$error">
          <p class="help is-danger" v-if="!$v.email.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
        </template>
      </div>

      <div class="column is-one-quarter">
        <label class="label">Mobile</label>
        <div class="control">
          <input
            v-model="$v.mobile.$model"
            :class="{ 'is-danger': $v.mobile.$error }"
            class="input"
            type="text"
            v-bind:disabled="!edit"
          />
        </div>
        <template v-if="$v.mobile.$error">
          <p class="help is-danger" v-if="!$v.mobile.required">
            This field is required
          </p>
          <p class="help is-danger" v-if="!$v.mobile.mobile">
            Invalid Mobile Number
          </p>
        </template>
      </div>
    </div>
    
    <div class="columns is-mobile is-centered ">
      <div class="column is-half">
        <div class="field is-grouped">
          <div class="control" v-if="!edit">
            <button @click="edit = !edit" class="button is-link" >Edit Profile</button>
          </div>
          <div class="control" v-if="edit">
            <button @click="openModal()" class="button is-success" >Save Change</button>
          </div>
          <div class="control">
            <button @click="$router.go(-1)" class="button is-link is-light">Back</button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- ModalConfirm -->
    <div class="modal" :class="{'is-active':modal_confirm}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Profile</p>
          <button class="delete" aria-label="close" @click="cancel()"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure to update profile?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateProfile()">Confirm</button>
          <button class="button" @click="cancel()">Cancel</button>
        </footer>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue';
import useValidate from '@vuelidate/core'
import { required,helpers,sameAs} from '@vuelidate/validators'

export default {
  name:'ProfilePage',
  setup () {
    const state = reactive({
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    })
    const rules = {
      password: { 
        required: helpers.withMessage('*กรุณากรอกรหัสผ่าน(รหัสผ่านปัจจุบัน)', required),
      },
      newPassword: { 
        required: helpers.withMessage('*กรุณากรอกรหัสผ่านใหม่(รหัสผ่านใหม่ที่ต้องการเปลี่ยนไปใช้)', required),
      },
      confirmNewPassword: { 
        required: helpers.withMessage('*กรุณากรอกรหัสผ่านใหม่อีกครั้ง', required),
        sameAs: helpers.withMessage('*รหัสผ่านใหม่ไม่ตรงกัน', sameAs("newPassword")),
      },
    }
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  data() {
    return {
        edit: false,
        modal_confirm: false,
    };
  },
  methods: {
    cancel(){
      this.modal_confirm = !this.modal_confirm
    },
    openModal(){
      if (!this.$v.$invalid) {
        this.modal_confirm = true;
      }
    },
    updateProfile(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
        token: localStorage.getItem("token"),
        password: this.state.password,
        newPassword: this.state.newPassword,
        confirmNewPassword: this.state.confirmNewPassword,
      }
      
      axios.post('http://localhost:3000/change-password', data)
        .then(res => {
          this.$parent.$data.user = res.data.user
          this.edit = false;
          this.modal_confirm = false;
          alert(res.data.msg);
        })
        .catch(error => {
          this.error = error.response.data
          console.log(error.response.data)
        })
      }
    }
  },
};
</script>
<style>
.container{
  min-height: 95vh;
}
</style>