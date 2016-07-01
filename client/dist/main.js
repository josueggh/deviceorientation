"use strict";
const firebase = require("firebase");
class App {
    constructor() {
        this.convertion = 255 / 360;
        this.firebase_config = {
            apiKey: "AIzaSyA71ebuJR4ejU1BWAOuqxDBsZjGJT2HNXk",
            authDomain: "devicemotion.firebaseapp.com",
            databaseURL: "https://devicemotion.firebaseio.com",
        };
        if (window.DeviceMotionEvent) {
            firebase.initializeApp(this.firebase_config);
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then((result) => {
                this.uid = result.user.uid;
            });
            window.addEventListener('deviceorientation', (event) => {
                let r = this.gToc(event.alpha), g = this.gToc(event.beta), b = this.gToc(event.gamma);
                firebase.database().ref("users/" + this.uid).set({ r: r, g: g, b: b });
                document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
            }, false);
        }
        setTimeout(function () { document.getElementById('instructions').remove(); }, 10000);
    }
    gToc(g) {
        return Math.round((g > 0 ? g : (360 + g)) * this.convertion);
    }
}
new App();
