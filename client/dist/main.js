var firebase = require('firebase');
class App {
    constructor() {
        this.convertion = 255 / 360;
        this.uid = localStorage.getItem('uid') || null;
        this.firebase_config = {
            apiKey: 'AIzaSyA71ebuJR4ejU1BWAOuqxDBsZjGJT2HNXk',
            authDomain: 'devicemotion.firebaseapp.com',
            databaseURL: 'https://devicemotion.firebaseio.com'
        };
        if (window.DeviceMotionEvent) {
            firebase.initializeApp(this.firebase_config);
            if (!this.uid) {
                let provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithPopup(provider).then((result) => {
                    localStorage.setItem('uid', result.user.uid);
                    this.uid = result.user.uid;
                });
            }
            window.addEventListener('deviceorientation', (event) => {
                let r = this.gToc(event.alpha), g = this.gToc(event.beta), b = this.gToc(event.gamma), m = new Date().getTime();
                firebase.database().ref(`users/${this.uid}`).set({ r, g, b, m });
                document.getElementsByTagName('body')[0].style.backgroundColor = `rgb(${r},${g},${b})`;
            }, false);
            firebase.database().ref(`users/${this.uid}`).onDisconnect().remove();
        }
        setTimeout(function () { document.getElementById('instructions').remove(); }, 10000);
    }
    gToc(g) {
        return Math.round((g > 0 ? g : (360 + g)) * this.convertion);
    }
}
new App();
