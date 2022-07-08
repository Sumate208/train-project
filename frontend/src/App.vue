<template>
  <div id="app">
    <!-- nav bar -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="homButton" @click="$router.push('/')">
          <p class="text-header">Home</p>
        </a>
        <a
          role="button"
          class="navbar-burger"
          :class="{'is-active': navMobile}"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="navMobile = !navMobile"
        >
          <span aria-hidden="false"></span>
          <span aria-hidden="false"></span>
          <span aria-hidden="false"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{'is-active': navMobile}" id="navbarBasicExample">
        <div class="navbar-end">
          <div v-if="user" class="navbar-item">
            <div class="navbar-item">
              <figure class="image is-24x24 my-auto">
                <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <span class="pl-3">{{ user.FIRST_NAME }} {{ user.LAST_NAME }}</span>
            </div>
          </div>
          <div v-if="user" class="navbar-item">
            <a class="nav-item is-tab" @click="logOut()">
              <span class="icon"><i class="fa fa-sign-out"></i></span>
            </a>
          </div>

          <div v-if="!user" class="navbar-item">
            <a class="button is-light" @click="$router.push('/signin')">
              เข้าสู่ระบบ
            </a>
          </div>
          <div v-if="!user" class="navbar-item">
            <a class="button is-primary" @click="$router.push('/signup')">
              <strong>สมัครสมาชิก</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- <router-view :key="$route.fullPath" @auth-change="onAuthChange" /> -->
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" />

  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      user: null,
      navMobile:false,
      dropdown:false
    }
  },
  mounted () {
   this.onAuthChange()
  },
  methods: {
    onAuthChange(){
      const token = localStorage.getItem('ts-token')
      if(token){
        this.getUser()
      }
    },
    getUser(){
      axios.get('/user').then(res=>{
        this.user = res.data
        console.log(res.data)

      }).catch(err => {
        console.log(err.response.data)
      })
    },
    logOut(){
      localStorage.removeItem('ts-token')
      this.user = null;
      this.$router.push({path: '/signin'});
    },
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
nav {
  -webkit-box-shadow: 0px 0px 10px 0px #000000; 
  box-shadow: 0px 0px 10px 0px #000000;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
.navbar{
  padding-left: 50px;
  padding-right: 50px;
}
.navbar-menu{
  animation: fadeIn 1s ease-in both;
}
.text-white{
  color: white
}
.text-header {
  font-size: 30px
}
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translate3d(0, -20%, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}
</style>