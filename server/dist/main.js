var firebase = require('firebase');
var App = (function () {
    function App() {
        var _this = this;
        this.firebase_config = {
            apiKey: '<YOUR API KEY>',
            authDomain: '<YOUR AUTH DOMAIN>',
            databaseURL: '<YOUR DATABASE URL>'
        };
        firebase.initializeApp(this.firebase_config);
        var ref = firebase.database().ref('users');
        ref.on('child_changed', function (dataSnapshot) {
            var color = dataSnapshot.val();
            document.getElementById(dataSnapshot.key).style.background = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        });
        ref.on('child_added', function (dataSnapshot) {
            _this.createElement(dataSnapshot.key, dataSnapshot.val());
        });
        ref.on('child_removed', function (dataSnapshot) {
            document.getElementById(dataSnapshot.key).remove();
        });
    }
    App.prototype.createElement = function (id, color) {
        var element = document.createElement('div');
        element.setAttribute('id', id);
        document.body.appendChild(element);
        document.getElementById(id).style.background = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    };
    return App;
})();
new App();
