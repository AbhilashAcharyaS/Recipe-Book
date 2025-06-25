import { DataStorageService } from './../Shared/data-storage.service';
import { Component} from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styles:[]
})

export class headerComponent{
    constructor(private dataStorageService:DataStorageService){}

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
}