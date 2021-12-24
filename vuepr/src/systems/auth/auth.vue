<template>
  <div id="auth" v-cloak v-show="open">
    <div class="logo">
      <img src="./img/logo.svg" alt="" />
    </div>
    <div class="btn-link">
      <div :class="{ active: form == 0 }" @click="form = 0">
        <div>Авторизация</div>
        <div class="line"></div>
      </div>
      <div :class="{ active: form == 1 }" @click="form = 1">
        <div>Регистрация</div>
        <div class="line"></div>
      </div>
    </div>

    <div class="prompt" v-if="showprompt">
      <div>{{ prompt }}</div>
    </div>
    <div class="login" v-show="form == 0">
      <div class="inputField">
        <img src="./img/user.png" alt="" />
        <input
          type="text"
          placeholder="Логин"
          maxlength="16"
          v-model="auth.login"
        />
      </div>
      <div class="inputField">
        <img src="./img/pass.png" alt="" />
        <input
          type="password"
          placeholder="Пароль"
          maxlength="32"
          v-model="auth.password"
        />
      </div>

      <div class="btn" @click="login()">
        <div>Продолжить</div>
      </div>
    </div>

    <div class="register" v-show="form == 1">
      <div class="inputField">
        <img src="./img/user.png" alt="" />
        <input
          type="text"
          placeholder="Придумайте логин"
          maxlength="16"
          v-model="register.login"
        />
      </div>
      <div class="inputField">
        <img src="./img/email.png" alt="" />
        <input
          type="text"
          placeholder="Введите Ваш E-Mail"
          maxlength="32"
          v-model="register.email"
        />
      </div>
      <div class="inputField">
        <img src="./img/pass.png" alt="" />
        <input
          type="password"
          placeholder="Придумайте пароль"
          maxlength="32"
          v-model="register.password"
        />
      </div>
      <div class="inputField">
        <img src="./img/pass.png" alt="" />
        <input
          type="password"
          placeholder="Повторите пароль"
          maxlength="32"
          v-model="register.rpassword"
        />
      </div>

      <div class="btn" @click="reg()">
        <div>Продолжить</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      showprompt: false,
      prompt: "",
      auth: {
        login: "",
        password: "",
      },
      register: {
        login: "",
        email: "",
        password: "",
        rpassword: "",
      },
      form: 0,
    };
  },
  methods: {
    login: function () {
      var login = this.auth.login
      var pass = this.auth.password
      if (!login) {
        this.showprompt = true;
        this.prompt = "Введите логин";
        return;
      }

      if(login.length < 3) {
        this.showprompt = true;
        this.prompt = "Длина логина не может быть меньше 3-х и больше 16-ти символов";
        return;
      }

      if (!pass) {
        this.showprompt = true;
        this.prompt = "Введите пароль";
        return;
      }

      if(pass.length < 4) {
        this.showprompt = true;
        this.prompt = "Длина пароля не может быть меньше 4-х и больше 32-х символов";
        return;
      }
      mp.trigger('client:auth.login', login, pass)
    },

    reg: function () {
      mp.trigger('client:auth.register', this.register.login, this.register.email, this.register.password)
    },
  },
};
</script>

<style lang='scss' scoped>
#auth {
  position: absolute;
  width: 100%;
  height: 100%;
  background: grey;
  font-size: 2vh;
  background: radial-gradient(126.21% 185.16% at -62.71% -76.18%, #FF1368 0%, rgba(196, 196, 196, 0) 100%);

  .logo {
    position: absolute;
    width: max-content;
    height: max-content;
    right: 0vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 13vh;
    }
  }

  .btn-link {
    position: absolute;
    width: 45vh;
    height: 10vh;

    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    color: rgba(242, 238, 231, 0.5);
    font-size: 3vh;
    font-weight: 500;

    .line {
      width: 7vh;
      height: 0.5vh;
      border-radius: 0.5vh;
    }

    .active {
      translate: 0.2s;
      color: #f2eee7;

      .line {
        background: #ff1368;
      }
    }
  }

  .login,
  .register {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vh;
    height: 50vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    .inputField {
      margin-bottom: 3vh;
      input {
        padding: 2vh 5vh;
        font-size: 2vh;
        background: rgba(45, 49, 62, 0.8);
        font-weight: 300;
        color: rgba(242, 238, 231, 1);
      }

      img {
        position: absolute;
        width: 2.5vh;
        height: 2.5vh;

        margin-top: 1.75vh;
        margin-left: 1vh;
      }
    }

    .btn {
      background: rgba(255, 19, 104, 0.9);
      color: #f2eee7;
      font-size: 2.5vh;
      padding: 1.3vh 9vh;
      margin-top: 5vh;

      &:hover {
        translate: 0.2s;
        background: rgba(255, 19, 104, 1);
      }
    }
  }

  .prompt {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    color: #f2eee7;

    width: max-content;
    height: max-content;
    text-align: center;
    padding: 1vh 1vh;
    background: #000;
    border-radius: 0.5vh;
    border-left: solid 0.5vh #ff1368;

    div {
      word-wrap: normal;
    }
  }
}
</style>