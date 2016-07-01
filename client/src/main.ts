import * as firebase from "firebase";

class App{
  convertion: number = 255/360;
  uid:string;

  firebase_config: any = {
    apiKey: "AIzaSyA71ebuJR4ejU1BWAOuqxDBsZjGJT2HNXk",
    authDomain: "devicemotion.firebaseapp.com",
    databaseURL: "https://devicemotion.firebaseio.com",
  };

  constructor(){
    if( (<any>window).DeviceMotionEvent) {
      firebase.initializeApp(this.firebase_config);

      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');

      firebase.auth().signInWithPopup(provider).then( (result) => {
        this.uid = result.user.uid;
      });

      window.addEventListener('deviceorientation', (event) => {
        let r = this.gToc(event.alpha),
            g = this.gToc(event.beta),
            b = this.gToc(event.gamma);
        firebase.database().ref("users/"+this.uid).set({r,g,b});
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb('+r+','+g+','+b+')';
      }, false);
    }
    setTimeout( function(){ document.getElementById('instructions').remove() } , 10000);
  }

  gToc(g:number){
    return Math.round( (g>0?g:(360+g))*this.convertion );
  }
}
new App();