var Geo = (function () {
    function Geo() {
        this.convertion = 255 / 360;
        if (window.DeviceMotionEvent) {
            window.addEventListener('deviceorientation', this.deviceorientationHandler.bind(this), false);
        }
        setTimeout(function () { document.getElementById('instructions').remove(); }, 3000);
    }
    Geo.prototype.gToc = function (g) {
        return Math.round((g > 0 ? g : (360 + g)) * this.convertion);
    };
    Geo.prototype.deviceorientationHandler = function (event) {
        var r = this.gToc(event.alpha), g = this.gToc(event.beta), b = this.gToc(event.gamma);
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    return Geo;
}());
new Geo();
//# sourceMappingURL=capture.js.map