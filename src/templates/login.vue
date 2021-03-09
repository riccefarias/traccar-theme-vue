<template>
  <div class="login">
      <div id="logo"><img width="100%" src="/__img/logo.png"></div>

      <div id="login-form">
        <div>
          <div class="label">Nome de Usuário</div>
          <div class="input"><input v-model="email" type="text" placeholder="seu@email.com"></div>
        </div>
        <div>
          <div class="label">Senha</div>
          <div class="input"><input v-model="password" type="password" placeholder="sua senha"></div>
        </div>
        <div>
          <div class="submit"><input class="btn btn-primary" @click="doLogin()" type="button" value="Entrar"></div>
        </div>


      </div>

  </div>
</template>

<script>
export default{
  data: function(){
    return {
        email: '',
        password: ''
    }
  },
  methods: {
    doLogin: function(){
        this.$traccar.login(this.email,this.password).then((r)=>{
            alert(r.data.name);
        });

    }
  }
}
</script>

<style scoped>
.login{
  background: url('/__img/bg.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.login:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(22,119,203,.3);
}

#logo{
  position: absolute;
  left: 50%;
  top: 20%;
  width: 30%;
  transform: translate(-50%,-50%);
  z-index: 10;
}

#login-form{
  position: absolute;
  left: 50%;
  top: 50%;
  background: white;
  border-radius: 10px;
  z-index: 10;
  width: 30%;
  transform: translate(-50%,-50%);
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
}

.label{
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.input input{
  width: 100%;
  height: 40px;
  border: silver 1px solid;
  border-radius: 5px;
  outline: none;
  padding: 10px;
}

.submit{
  margin-top: 10px;
  float: right;
}
</style>