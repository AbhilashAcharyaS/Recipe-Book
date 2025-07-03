import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path:"auth",
            component:AuthComponent
        }]),
        SharedModule
    ],
    exports:[
        AuthComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class AuthModule{}