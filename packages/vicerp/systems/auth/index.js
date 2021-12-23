const { Account } = require('../../db/models')
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
    auth: async (player, login, password) => {
        if (player.online == true) return
        var account = await Account.findOne({
            where: {
                login: login,
                password: hash(password),
                socialClub: player.socialClub
            }
        })

        if (account.login != login) return mp.notify.error(player, 'Не верный логин', 'Авторизация')
        if (account.password != hash(password)) return mp.notify.error(player, 'Не верный пароль', 'Авторизация')

        mp.notify.success(player, 'Вы успешно вошли в аккаунт', 'Авторизация')
        player.call('notifications.push.success', ['Вы успешно вошли в аккаунт', 'Авторизация'])
        player.call('client:auth.register-result')
        player.position = new mp.Vector3(-425.517, 1123.620, 325.8544)
        player.online = true
    },

    register: async (player, login, email, password) => {
        console.log(player.serial)
        var account = await Account.findOne({ where: { login: login, email: email, socialClub: player.socialClub } });
        if (account) {
            if (account.login == login) {
                return mp.notify.error(player, 'Логин занят', 'Регистрация')
            }
            if (account.socialClub == player.socialClub) {
                mp.notify.warning(player, 'Данный socialClub имеет аккаунт', 'Регистрация')
                mp.notify.info(player, 'Если это ваш аккаунт - востановите пароль', 'Регистрация')
                return
            }
            if (account.email == email) {
                return mp.notify.warning(player, 'Указанная почта уже зарегестрирована', 'Регистрация')
            }
        }
        player.account = Account.create({
            login: login,
            password: hash(password),
            email: email,
            socialClub: player.socialClub,
            serial: player.serial,
            regIp: player.ip,
            lastIp: player.ip,
        })

        mp.notify.success(player, 'Вы успешно создали аккаунт', 'Регистрация')
        player.call('client:auth.register-result')
        player.position = new mp.Vector3(-425.517, 1123.620, 325.8544)
        player.online = true
    }
}

mp.events.add({
    'server:auth.login': (player, login, password) => {
        authorization.auth(player, login, password)
    },

    'server:auth.register': (player, login, email, password) => {
        authorization.register(player, login, email, password)
    }
})

