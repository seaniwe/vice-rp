<template>
  <div id="creator" v-show="open">
    <audio ref='audio' :src="srcAudio" preload="auto"></audio>
    <div class="first-info" v-if="form == 0">
      <div class="inputField">
        <input
          type="text"
          placeholder="Придумайте имя"
          v-model="charter.name"
        />
      </div>
      <div class="inputField">
        <input
          type="text"
          placeholder="Придумайте фамилию"
          v-model="charter.surname"
        />
      </div>
      <div class="inputField">
        <input
          type="text"
          placeholder="Введите возраст"
          v-model="charter.age"
        />
      </div>

      <div class="btn" @click="submit(0)">
        <div>Продолжить</div>
      </div>
    </div>

    <div class="custom" v-show="form == 1">
      <div class="nav-menu">
        <div class="nav" v-for="item in nav" :key="item.id">{{ item.name }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            open: true,
            form: 1,
            charter: {
                name: '',
                surname: '',
                age: '',
            },
            nav: [{id: 10, name: 'Родители'}, {id: 11, name: 'Лицо'}, {id: 12, name: 'Волосы'}]
        }
    },

    methods: {
        submit: function(args) {
            switch (args) {
                case 0: {
                    if(this.charter.name.length < 2) return mp.trigger('notifications.push.warning', 'Длина имени не может быть меньше 2-х символов')
                    if(this.charter.surname.length < 2) return mp.trigger('notifications.push.warning', 'Длина фамилии не может быть меньше 2-х символов')
                    if(parseInt(this.charter.age) < 18) return mp.trigger('notifications.push.warning', 'Возраст персонажа не может быть меньше 18-ти лет')
                  
                }
            }
        },

        playAudio: function() {
          let audio = new Audio('audio/song.mp3')
          audio.autoplay = true
          audio.muted = false
          audio.volume = 1
        }
    },

    mounted() {
      // this.playAudio()
    }
}
</script>


<style lang='scss' scoped>
#creator {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: radial-gradient(126.21% 185.16% at -62.71% -76.18%, #FF1368 0%, rgba(196, 196, 196, 0) 100%);
  background: gray;

  .first-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 40vh;
    height: 40vh;

    .inputField {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 2vh;
      input {
        font-size: 1.8vh;
        padding: 2vh 5vh;
        text-align: center;
        background: rgba(45, 49, 62, 0.8);
        color: rgba(242, 238, 231, 0.8);
      }
    }

    .btn {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -80%);
      div {
        font-size: 2.5vh;
        color: rgba(242, 238, 231, 0.8);
        background: rgba(255, 19, 104, 0.9);
        padding: 1vh 8vh;

        &:hover {
          background: rgba(218, 29, 98, 0.9);
        }
      }
    }
  }

  .custom {
    position: absolute;
    width: 100%;
    height: 100%;

    .nav-menu {
      position: absolute;
      left: 50%;
      margin-top: 2vh;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 50vh;

      .nav {
        font-size: 2.5vh;
        font-weight: 700;
        color: rgba(242, 238, 231, 0.8);
      }
    }
  }
}
</style>