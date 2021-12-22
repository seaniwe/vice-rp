const { Account } = require('../db/models')

var authorization = {
    auth: (player, login, password) => {

    },

    register: async(player, login, password) => {
        db.Account.create({
            login,
            password,
            password,
            password,
            password,
            password, 
        })
    }
}

mp.events.add({
    'server:auth': (player, login, password) => {

    },

    'server:register.start': (player, login, password) => {
        authorization.register(player, login, password)
    }
})