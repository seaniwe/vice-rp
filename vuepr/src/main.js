import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueInputAutowidth from 'vue-input-autowidth'

Vue.use(VueInputAutowidth)

window.Vue = Vue;

global.jQuery = require('jquery');
window.$ = global.jQuery;

Vue.config.productionTip = false

var app = new Vue({
    store,
    render: function (h) { return h(App) }
}).$mount('#app')

window.cef = app.$children[0].$refs;

var isEmpyZoneDOM = (targetId) => {
    var allId = ['creator'];
    for (const id of allId) {
        if (id == targetId) return true;
    } return false;
}



// var inGame = true;
// var isMouseDown = false;
// window.onmousedown = function (event) {
//     isMouseDown = true;
//     if (event.target.tagName == "HTML" || isEmpyZoneDOM(event.target.id)) {
//         mp.trigger('Camera3DActive::CLIENT');
//     }
// }

// // function enterToServer(){
// //   inGame = true;
// //   delete mp;
// // }

// window.onmouseup = function () {
//     if (!inGame) return;
//     isMouseDown = false;
//     mp.trigger('Camera3DInactive::CLIENT');
// }

// // Приближение камеры
// setTimeout(() => {
//     window.onwheel = function (e) {
//         if (!inGame) return;
//         if (e.target.tagName == "HTML" || isEmpyZoneDOM(e.target.id)) {
//             mp.trigger('Camera3DZoom::CLIENT', e.deltaY < 0);
//         }
//     };
// }, 0);

Vue.directive('click-outside', {
    bind(el, binding) {
        el.addEventListener('click', e => e.stopPropagation());
        document.addEventListener('click', binding.value);
    },
    unbind(el, binding) {
        document.removeEventListener('click', binding.value);
    }
});


window.getRandom = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}

window.getRandomFloat = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

// Получить дистанцию в пикселях между координатами на экране
window.getDistance = (x1, y1, x2, y2) => {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

// px to vh
window.convertPXToVH = (px) => {
    return px * (100 / document.documentElement.clientHeight);
}