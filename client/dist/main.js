var firebase = require('firebase');
var App = (function () {
    function App() {
        var _this = this;
        this.convertion = 255 / 360;
        this.uid = localStorage.getItem('uid') || null;
        this.firebase_config = {
            apiKey: '<YOUR API KEY>',
            authDomain: '<YOUR AUTH DOMAIN>',
            databaseURL: '<YOUR DATABASE URL>'
        };
        if (window.DeviceOrientationEvent) {
            firebase.initializeApp(this.firebase_config);
            if (!this.uid) {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    localStorage.setItem('uid', result.user.uid);
                    _this.uid = result.user.uid;
                });
            }
            window.addEventListener('deviceorientation', function (event) {
                var r = _this.gToc(event.alpha), g = _this.gToc(event.beta), b = _this.gToc(event.gamma), m = new Date().getTime();
                firebase.database().ref("users/" + _this.uid).set({ r: r, g: g, b: b, m: m });
                document.getElementsByTagName('body')[0].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
            }, false);
            firebase.database().ref("users/" + this.uid).onDisconnect().remove();
        }
        setTimeout(function () { document.getElementById('instructions').remove(); }, 10000);
    }
    App.prototype.gToc = function (g) {
        return Math.round((g > 0 ? g : (360 + g)) * this.convertion);
    };
    return App;
})();
new App();
