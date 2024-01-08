export class Sprite {
    texture: string;
    //img: HTMLImageElement;
    px = 0;
    py = 0;
    w: number;
    h: number;
    sz = 1;
  
    constructor(texture: string, w = 0, h = 0, sz = 1) {
      //this.img = new Image()
      this.w = w;
      this.h = h;
      this.texture = texture;
      this.sz = sz;
    }
  
   /* draw() {
      gameContex?.drawImage(textures[this.texture], 0, 0, this.w, this.h, this.px, this.py, this.w * this.sz, this.h * this.sz)
      //console.log('draw')
    }*/
  }