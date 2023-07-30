import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./services/auth-interceptor.service";


@NgModule({
    declarations: [HeaderComponent],
    imports: [
        SharedModule, 
        CommonModule,
        AppRoutingModule],
    exports: [HeaderComponent],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
})

export class CoreModule{}