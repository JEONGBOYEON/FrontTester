<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="user.name"
            />
          </div>
          <div class="form-group">
            <label for="id">id</label>
            <input
              type="text"
              class="form-control"
              name="id"
              v-model="user.id"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="user.password"
            />
          </div>
          <div class="form-group">
            <label for="phonenumber">number</label>
            <input
              type="number"
              class="form-control"
              name="phonenumber"
              v-model="user.phonenumber"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
        v-if="message"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user'

export default {
  name: 'register',
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  data() {
    return {
      user: new User('', '', '',''),
      submitted: false,
      successful: false,
      message: ''
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    handleRegister() {  
      this.message = ''
      this.submitted = true
      //this.$validator.validate().then(valid => {
        //if (valid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message
              this.successful = true
            },
            error => {
              this.message = error.message
              this.successful = false
            }
          ).then(
            this.$router.push('/Login')
          )
          alert("회원가입 성공!");
        //}
      //})


      // axios.post('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/users',{
      //     "NAME":document.querySelector("#name").value,
      //     "ID":document.querySelector("#id").value,
      //     "PASSWORD":document.querySelector("#password").value,
      //     "PHONENUMBER":document.querySelector("#phonenumber").value,
      //        })
      //     .then(function(response){
      //           alert(response);
      //           console.log(response); // 객체 형태로 반환. 파싱작업 불필요
      //       });
      //       console.log("submit");
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>