import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elem:ElementRef){}
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click' , ['$event']) 
  toggleOpen(event:Event) {
    if(this.elem.nativeElement.contains(event.target)  ){
      this.isOpen = !this.isOpen;
    }else{
      this.isOpen = false;
    }
    
  }
}
