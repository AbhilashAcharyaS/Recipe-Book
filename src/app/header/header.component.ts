import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styles:[]
})

export class headerComponent{

    @Output() featureSelected= new EventEmitter<string>();
    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }
}