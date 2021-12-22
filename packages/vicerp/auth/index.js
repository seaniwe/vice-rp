const { Account }   = require('../db/models')
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
        var account = await Account.findOne({where: {login}});
        if(account) {
            return console.log('Логин заннят')
        }

        Account.create({
            login,
            password: 'test',
            email: login,
            socialClub: player.socialClub,
            serial: player.serial,
            regDate,
            lastDate,
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

