<template id="notify">
  <div id="notifications">
    <transition-group name="notif" tag="div">
      <div
        :class="[notif.type, 'notif-box']"
        v-for="notif in messages"
        :key="notif.hash"
      >
        <!-- <img src="img/info.svg" /> -->
        <img :src="'img/' + notif.img + '.svg'" />
        <div v-cloak class="message">
          <div class="header" v-if="notif.header">{{ notif.header }}</div>
          {{ notif.text }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        /*{ type: "warning", header: "header", text: "text message", hash: 12 },
        { type: "info", header: "header", text: "text message", hash: 142 },
        { type: "success", header: "header", text: "text message", hash: 123 },
        {
          type: "error",
          header: "Бизнес",
          text: "Вы не оплатили налог 100$",
          hash: 122,
        },*/
      ],
      showTime: 7000,
      maxCount: 5,
      count: 0,
    };
  },
  methods: {
    push(type, text, header) {
      if (header == "undefined" || header == "null") header = null;
      this.messages.push({
        type: type,
        img: type.split(" ").length > 1 ? type.split(" ")[1] : type,
        header: header,
        text: text,
        hash: ++this.count,
        timer: null,
      });

      if (this.messages.length > this.maxCount) {
        let message = this.messages.shift();
        clearTimeout(message.timer);
      }
      var self = this;
      this.messages[this.messages.length - 1].timer = setTimeout(() => {
        self.messages.shift();
        /*clearTimeout(message.timer);*/
      }, this.showTime);
    },
    info(text, header) {
      this.push(`info`, text, header);
    },
    warning(text, header) {
      this.push(`warning`, text, header);
    },
    success(text, header) {
      this.push(`success`, text, header);
    },
    error(text, header) {
      this.push(`error`, text, header);
    },
    addCash(text, header) {
      this.push(`add cash`, text, header);
    },
    removeCash(text, header) {
      this.push(`remove cash`, text, header);
    },
    addMoney(text, header) {
      this.push(`add money`, text, header);
    },
    removeMoney(text, header) {
      this.push(`remove money`, text, header);
    },
  },
  mounted() {
    this.info("Логин занят", "Регистрация");
  },
};
</script>


<style scoped>
#notifications {
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: Ubuntu;
  justify-content: flex-end;
  /*height: 60%;*/
  left: 2.7vh;
  width: 60vh;
  min-width: 15vh;
  position: absolute;
  bottom: 21.5%;
  word-wrap: break-word;
}

#notifications .notif-box {
  /*background: linear-gradient(to right, #000a, #0000);*/
  display: flex;
  margin-bottom: 0.8vh;
  border-radius: 1.5vh;
  width: 30vh;
  position: absolute;
  top: -100%;
}

#notifications .notif-box:nth-last-child(-n + 8) {
  /*maxCount+1*/
  position: relative !important;
}

#notifications > div img {
  margin: 0 2vh 0 1.5vh;
  width: 1.6vh;
}

#notifications > div .header {
  font-weight: bold;
  font-size: 1.3vh;
  margin-left: -0.6vh;
  margin-bottom: 0.3vh;
}

#notifications > div .message {
  font-weight: 400;
  font-size: 1.3vh;
  padding: 1.5vh 0;
  padding-right: 1vh;
}

#notifications .cash.remove,
#notifications .money.remove,
#notifications .error {
  background: #2b2b2b;
  border-left: 5px solid #c22;
}

#notifications .info {
  background: #2b2b2b;
  border-left: 5px solid #23c;
}

#notifications .success {
  background: #2b2b2b;
  border-left: 5px solid #3c2;
}

#notifications .warning {
  background: #2b2b2b;
  border-left: 5px solid #c82;
}

#notifications .money.add {
  background: #2b2b2b;
  border-left: 5px solid #c82;
}

#notifications .cash.add {
  background: #2b2b2b;
  border-left: 5px solid #c82;
}

.notif-enter-active {
  transition: all 0.25s;
  margin-left: 0;
}
.notif-enter {
  margin-left: 100%;
}

.notif-leave-active {
  transition: all 0.5s;
  margin-left: -100%;
}

.notif-leave {
  margin-left: 0;
}
</style>