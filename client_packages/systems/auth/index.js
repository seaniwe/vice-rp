
var auth = {
    init() {
        mp.gui.cursor.visible = true
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
    }
}

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
    }
})