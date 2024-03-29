mp.gui.chat.show(false); //Disables default RageMP Chat
mp.gui.chat.activate(false);

// Hud chat
cef.markAsChat();

mp.chat = {

    visible: function (flag) {
        cef.execute(`cef.chat.chatShow = ${flag}`)
    },

    open: function () {
        if (mp.game.ui.isPauseMenuActive()) return
        mp.events.add('render', () => {
            mp.game.controls.disableControlAction(1, 200, true); // ESC
            mp.game.controls.disableControlAction(0, 200, true); // ESC
        })
        cef.execute(`cef.chat.openChat()`)
        mp.gui.cursor.visible = true;
    },

    close: function () {
        mp.events.add('render', () => {
            mp.game.controls.enableControlAction(1, 200, true);
            mp.game.controls.enableControlAction(0, 200, true);
        })
        cef.execute(`cef.chat.closeChat()`)
        mp.gui.cursor.visible = false;
    },

    push: function (message) {
        cef.execute(`cef.chat.acceptMessage('${message}');`);
    }
}

mp.keys.bind(0x54, true, mp.chat.open)
mp.chat.visible = true
mp.keys.bind(0x1B, true, function () {
    mp.chat.close()
})


mp.events.add('chatCloseClient', () => {
    mp.gui.cursor.visible = false;
})

mp.events.add('getMessage.client', (message) => {
    cef.execute(`cef.chat.acceptMessage('${message}');`);
})

// Отправка сообщения в радиусе игрока
mp.events.add('chatMessage.client', (message) => {
    mp.gui.cursor.visible = false;
    mp.events.callRemote('playerSay.server', message);
})