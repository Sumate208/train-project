<template>
  <div id="app">
    <!-- nav bar -->
    <!--
    <nav class="navbar has-background-warning-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="homButton" @click="$router.push('/')">
          <p class="text-white text-header">Home</p>
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="false"></span>
          <span aria-hidden="false"></span>
          <span aria-hidden="false"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbarBasicExample">
        <div class="navbar-end">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <figure class="image is-24x24 my-auto">
                <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
              <span class="pl-3">{{ user.first_name }} {{ user.last_name }}</span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logOut()">Log out</a>
            </div>
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
    -->

    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            Website
          </a>
        </div>
        <label for="menu-toggle" class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" id="menu-toggle" class="is-hidden"/>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-home"></i></span> Home
          </a>
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-table"></i></span> Links
          </a>
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-info"></i></span> About
          </a>
          
          <a class="nav-item is-tab is-active">
            <span class="icon"><i class="fa fa-user"></i></span>
          </a>
          <a class="nav-item is-tab">
            <span class="icon"><i class="fa fa-sign-out"></i></span>
          </a>
        </div>
      </div>
    </nav>

    <section class="main-content columns is-fullheight">
      
      <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p class="menu-label is-hidden-touch">Navigation</p>
        <ul class="menu-list">
          <li>
            <a href="#" class="">
              <span class="icon"><i class="fa fa-home"></i></span> Home
            </a>
          </li>
          <li>
            <a href="#" class="is-active">
              <span class="icon"><i class="fa fa-table"></i></span> Links
            </a>

            <ul>
              <li>
                <a href="#">
                  <span class="icon is-small"><i class="fa fa-link"></i></span> Link1
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon is-small"><i class="fa fa-link"></i></span> Link2
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="">
              <span class="icon"><i class="fa fa-info"></i></span> About
            </a>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <div class="section">

          <div class="card">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
          <div class="card is-hidden1">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
          <div class="card is-hidden1">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
          <div class="card is-hidden1">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
          <div class="card is-hidden1">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
          <div class="card is-hidden1">
            <div class="card-header"><p class="card-header-title">Header</p></div>
            <div class="card-content"><div class="content">Content</div></div>
          </div>
          <br />
          
        </div>
      </div>
      
    </section>

    <footer class="footer is-hidden">
      <div class="container">
        <div class="content has-text-centered">
          <p>Hello</p>
        </div>
      </div>
    </footer>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        first_name:'fName',
        last_name:'last',
      },
      dropdown:false
    }
  },
  mounted () {
   
  },
  methods: {
    logOut(){
      this.user=''
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
.text-white{
  color: white
}
.text-header {
  font-size: 30px
}
@media screen and (max-width: 768px) {
  #menu-toggle:checked + .nav-menu {
    display: block;
  }
  .text-header {
    font-size: 20px
  }
}
</style>