import * as firebase from 'firebase';

class App{
  firebase_config: any = {
    apiKey: '<YOUR API KEY>',
    authDomain: '<YOUR AUTH DOMAIN>',
    databaseURL: '<YOUR DATABASE URL>'
  };

  constructor(){
    firebase.initializeApp(this.firebase_config);

    let ref = firebase.database().ref('users');
    ref.on('child_changed',(dataSnapshot:any) => {
      let color = dataSnapshot.val();
      document.getElementById(dataSnapshot.key).style.background = `rgb(${color.r},${color.g},${color.b})`;
    });

    ref.on('child_added', (dataSnapshot:any) => {
      this.createElement(dataSnapshot.key, dataSnapshot.val());
    });

    ref.on('child_removed', (dataSnapshot:any) => {
      document.getElementById(dataSnapshot.key).remove();
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