import { Component, OnInit,Input } from '@angular/core';
import { ICarouselItem } from './icarousel-item.metadata';
import { nextTick } from 'process';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  /**
   * Custom Properties
   */
  @Input() height = 500;
  @Input() isFullScreen=false;
  @Input() items: ICarouselItem[]=[];

  /**
   * Final Properties
   */
  public finalHeight:string | number =0;
  public currentPosition =0;


constructor(){
this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
}
ngOnInit(): void {
  this.items.map((i,index)=>{
    i.id=index;
    i.marginLeft=0;
  })
}

setCurrentPosition(position: number){
  this.currentPosition = position;
  this.items.find(i=> i.id ==0).marginLeft = -100 * position;
}

setNext(){
  let finalPercentage=0;
  let nexPosition = this.currentPosition + 1;
  if(nexPosition <= this.items.length -1){
    finalPercentage = -100*nexPosition;
  } else{
    nexPosition = 0;
  }
  this.items.find(i=> i.id ===0).marginLeft = finalPercentage;
  this.currentPosition = nexPosition;
}

setBack(){
  let finalPercentage =0;
  let backPosition = this.currentPosition - 1;
  if (backPosition >=0){
    finalPercentage=-100*backPosition;
  }else{
    backPosition= this.items.length -1 ;
    finalPercentage= -100*backPosition;
  }
  this.items.find(i=> i.id ===0).marginLeft = finalPercentage;
  this.currentPosition = backPosition;
}


}
