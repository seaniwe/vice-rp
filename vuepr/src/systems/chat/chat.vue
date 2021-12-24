<template>
    <div v-cloak v-show="chatShow" id="chat">
        <div class="messages">
            <div v-for="item in messages" :key='item' class="message"><span v-html="item"></span></div>
        </div> 	
		<input ref="focusInput" v-show="open" class="inputMsg" v-model="message" type="text" maxlength="120" placeholder="Введите сообщение ...">
    </div>
</template>

<script>

export default({
    data() {
        return {
            open: false,
            chatShow: true,
            message: "",
            messages: [],
            historyMessages: [],
            historyCount: 0,
            activeCommand:false, 
        }
    },
    mounted() {
          var $this = this;
          $(document).keyup(function (key) {
                //console.log(key.keyCode)
                if (key.keyCode === 27 && $this.open == true) {
                      $this.closeChat();
                } else if (key.keyCode === 13 && $this.open == true) {
                      $this.sendMessage();
                }
                else if (key.keyCode === 38 && $this.open == true) {
                      if ($this.historyCount == 0) return;
                      $this.message = $this.historyMessages[--$this.historyCount];
                }
                else if (key.keyCode === 40 && $this.open == true) {
                      $this.message = $this.historyCount == $this.historyMessages.length ? "" : $this.historyMessages[++$this.historyCount];
                }
          });
      },
    watch: {
          historyMessages() {
                this.historyCount = this.historyMessages.length;
          },
          message(val){
                var firstSymbol = val.substr(0, 1);
                if(firstSymbol=='/'){
                      this.activeCommand = '/';
                      var first = val.match(/^\S+/);
                      if(first)for(var cmd of this.commands){
                            if(first[0] == cmd.cmd) this.activeCommand = first;
                      }
                } else this.activeCommand = false;
          },
          messages() {
                setTimeout(() => {
                      $(".messages").scrollTop($(".messages")[0].scrollHeight);
                      this.opacity = 1
                }, 10);
          }
    },
    methods: {
          openChat() {
                this.open = true;
                this.opacity = 1
                clearTimeout(this.timereOpacity)
                setTimeout(() => {
                    this.$refs.focusInput.focus();
                }, 10)
                this.opacityChat()
          },

          show() {
                this.showChat = true
          },
          closeChat() {
                this.open = false;
                this.message = "";
                this.historyCount = this.historyMessages.length;
                mp.trigger('chatCloseClient');
                
          },
          replaceToCommand(command){
                var first = this.message.match(/^\S+/);
                if(first)for(var cmd of this.commands){
                      if(first[0] == cmd.cmd) this.message = this.message.replace(/^\S+ /, '');
                }
                if(command!='')command+=' ';
                this.message = `${command}${this.message}`;
          },
          sendMessage() {
                var message = this.message;
                if (/^[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_ ]+$/.test(message) && /[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_]/.test(message)) {                           
                      if (message.length > 120) {
                          message = message.slice(0, 120);
                        };
                      if (message[0] == '/') {
                            mp.invoke("command", message.replace("/", ""));
                      } else {
                            mp.trigger('chatMessage.client', message.replace(/<\/?[^>]+>/g, ''));
                      }
                      this.historyMessages.push(message);
                }
                this.closeChat();
          },
          opacityChat() {
                if (!this.open) this.opacity = .5;
          },
          acceptMessage(message) {
                var newMessage = '';
                for (let i = 0; i<message.length; i++) {
                      var colorCheck = `${message[i]}${message[i+ 1]}`;
                      
                      if (colorCheck === "!{") {
                            var sub = message.slice(i+2, -1);
                            var color='';
                            for(var val of sub){
                                  if(val == '}') break;
                                  else color+=val;
                            }
                            i+=2+color.length;
                            newMessage += `<span style='color: ${color}'>`

                      }else if(colorCheck === "}"){
                            newMessage += '</span>';
                      } 
                      else newMessage += message[i];
                }

                this.messages.push(newMessage);
          }
          
    },
})
</script>


<style lang='scss' scoped>
#chat {
	.messages {
		font-family: "mainFont";
		position: absolute;
		top: 2vh;
		margin-left: 1vh;
		padding-left: 1vh;
		height: 31vh;
		max-width: 75vh;
		color: #cacaca;
		line-height: 2.5vh;
		font-size: 1.55vh;
		overflow-y: scroll;
		overflow-x: hidden;
		word-wrap: normal;
		overflow-wrap: break-word;
		text-shadow: -0 -1px 0 #000000, 0 -1px 0 #000000, -0 1px 0 #000000, 0 1px 0 #000000, -1px -0 0 #000000, 1px -0 0 #000000, -1px 0 0 #000000, 1px 0 0 #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000;
	}
	.inputMsg {
		font-family: "lite";
		position: absolute;
		margin-left: 1.5vh;
		top: 33.5vh;
		width: 45vh;
		outline: none;
		background: transparent;
		border: none;
		color: #dedede;
		display: inline-block;
		padding: 1vh 1.5vh;
		background: rgba(0, 0, 0, 0.8);
		height: 1.8vh;
		border-radius: 2px;
		font-size: 1.4;
	}
}
::-webkit-scrollbar {
	opacity: 0;
}

</style>