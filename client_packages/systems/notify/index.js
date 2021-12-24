mp.notify = {
    success(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.success(\`${text}\`, \`${header}\`)`);
    },
    warning(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.warning(\`${text}\`, \`${header}\`)`);
    },
    error(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.error(\`${text}\`, \`${header}\`)`);
    },
    info(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.info(\`${text}\`, \`${header}\`)`);
    },
    addCash(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.addCash(\`${text}\`, \`${header}\`)`);
    },
    removeCash(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.removeCash(\`${text}\`, \`${header}\`)`);
    },
    addMoney(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.addMoney(\`${text}\`, \`${header}\`)`);
    },
    removeMoney(text, header) {
        if (typeof text == 'object') text = JSON.stringify(text);
        cef.execute(`cef.notify.removeMoney(\`${text}\`, \`${header}\`)`);
    },
};



mp.events.add({
    "notifications.push.success": mp.notify.success,
    "notifications.push.warning": mp.notify.warning,
    "notifications.push.error": mp.notify.error,
    "notifications.push.info": mp.notify.info,
});
