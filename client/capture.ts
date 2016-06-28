class Geo{
  convertion: number = 255/360;

  constructor(){
    if( (<any>window).DeviceMotionEvent) {
      window.addEventListener('deviceorientation', this.deviceorientationHandler.bind(this), false);
    }
    setTimeout( function(){ document.getElementById('instructions').remove() } , 3000);
  }

  gToc(g:number){
    return Math.round( (g>0?g:(360+g))*this.convertion );
  }

  deviceorientationHandler(event:any){
    let r = this.gToc(event.alpha),
        g = this.gToc(event.beta),
        b = this.gToc(event.gamma);
    document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb('+r+','+g+','+b+')';
  }
}
new Geo();
