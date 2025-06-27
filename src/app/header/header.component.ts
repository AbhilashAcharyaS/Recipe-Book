import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../Shared/data-storage.service';
import { Component, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styles:[]
})

export class headerComponent implements OnInit, OnDestroy{
    constructor(private dataStorageService:DataStorageService, private authService:AuthService){}

    private userSub:Subscription;
    isAuthenticated=false;

    ngOnInit(): void {
        this.userSub= this.authService.user.subscribe((user)=>{
            this.isAuthenticated= !!user;
        });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe()
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}