mp.notify = {
    success: (player, text, header) => {
        player.call('notifications.push.success', [text, header])
    },

    warning: (player, text, header) => {
        player.call('notifications.push.warning', [text, header])
    },

    error: (player, text, header) => {
        player.call('notifications.push.error', [text, header])
    },

    info: (player, text, header) => {
        player.call('notifications.push.info', [text, header])
    },

    addCash: (player, text, header) => {

    },

    removeCash: (player, text, header) => {

    },

    addMoney: (player, text, header) => {

    },

    removeMoney: (player, text, header) => {

    },
}