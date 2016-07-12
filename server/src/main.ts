import * as firebase from 'firebase';

class App{
  firebase_config: any = {
    apiKey: 'AIzaSyA71ebuJR4ejU1BWAOuqxDBsZjGJT2HNXk',
    authDomain: 'devicemotion.firebaseapp.com',
    databaseURL: 'https://devicemotion.firebaseio.com'
  };

  constructor(){
    firebase.initializeApp(this.firebase_config);

    let ref = firebase.database().ref('users');
    ref.on('child_changed',(dataSnapshot:any) => {
      let color = dataSnapshot.val();
      document.getElementById(dataSnapshot.key).style.background = `rgb(${color.r},${color.g},${color.b})`;
    });

    ref.on('child_added', (dataSnapshot:any) => {
      console.log('create', dataSnapshot.key);
      this.createElement(dataSnapshot.key, dataSnapshot.val());
    });
  }

  createElement(id,color){
    let element = document.createElement('div');
    element.setAttribute('id',id);
    document.body.appendChild(element);
    document.getElementById(id).style.background = `rgb(${color.r},${color.g},${color.b})`;
  }
}
new App();