
var player = mp.players.local;
var cef = mp.browsers.new('package://cef/index.html');
// var cef = mp.browsers.new('http://localhost:8080');
mp.gui.cursor.visible = true


// Системы
require('./systems/auth/index.js')




let browserLoaded = false
let initDone = false;

mp.events.add('render', () =>{
    if(browserLoaded != true) {
        mp.game.graphics.drawText("Сервер загружаеться, подождите ...", [0.5, 0.5], {
            font: 0,
            color: [237, 28, 91, 200],
            scale: [0.5, 0.5],
            outline: true
        });
    }
})

mp.events.add('browserDomReady', (cef) => {
    if(initDone == false) {
       mp.events.callRemote('player.joined');
    }
    browserLoaded = true
})

// Отключить вращение камеры и переключение на первое лицо
setInterval(() => {
    mp.game.invoke('0x9E4CFFF989258472');
    mp.game.invoke('0xF4F2C0D4EE209E20');
}, 25000);

