const { Account } = require('../db/models')
var hash = require('md5')
global.Account = Account
// function test(login) {
//     Account.create({
//         login,
//         password: 'seaniwe'
//     })
// }

// test('seaniwe')

var authorization = {
    auth: (player, login, password) => {

    },

    register: async (player, login, password) => {
        console.log(player.serial)
        var account = await Account.findOne({ where: { login: login } });
        if (account) {
            if (account.login == login) {
                return console.log('Логин заннят')
            }
        }
        player.account = Account.create({
            login: login,
            password: hash(password),
            email: login,
            socialClub: player.socialClub,
            serial: player.serial,
            regIp: player.ip,
            lastIp: player.ip,
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

