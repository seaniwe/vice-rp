<template>
  <div id="app">
    <notify ref="notify" />
    <auth ref="auth" />
    <chat ref="chat" />
  </div>
</template>

<script>
import notify from "./systems/notify/notify.vue";
import auth from "./systems/auth/auth.vue";
import chat from "./systems/chat/chat.vue";

export default {
  name: "App",
  components: {
    notify,
    auth,
    chat,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
}

.disable {
  display: none;
}

* {
  user-select: none !important;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

[v-cloak] {
  display: none;
}

.opacity1 {
  opacity: 1;
}
</style>

