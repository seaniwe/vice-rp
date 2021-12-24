
var auth = {
    data: {
        authCamera: mp.cameras.new('default', new mp.Vector3(-1518.5706, -1085.5245, 55.2788), new mp.Vector3(-10, 0, 90), 40)
    },

    init() {
        mp.gui.cursor.visible = true
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    },

    login: (login, password) => {
        mp.events.callRemote('server:auth.login', login, password)
    },

    register: (login, email, password) => {
        mp.events.callRemote('server:auth.register', login, email, password)
    },

    regResult: () => {
        mp.gui.cursor.visible = false
        cef.execute(`cef.auth.open = false`)
    },

    loginResult: () => {
        auth.destroyCamera()
        mp.gui.cursor.visible = false
        cef.execute(`cef.auth.open = false`)
    },

    destroyCamera: () => {
        auth.data.authCamera.destroy()
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
}

global.auth = auth

mp.events.add({
    'mp.player.init': () => {
        auth.init()
    },

    'client:auth.login': (login, password) => {
        auth.login(login, password)
    },

    'client:auth.register': (login, email, password) => {
        auth.register(login, email, password)
    },

    'client:auth.register-result': () => {
        auth.regResult()
    },

    'client:auth.login-result': () => {
        auth.loginResult()
    }
})