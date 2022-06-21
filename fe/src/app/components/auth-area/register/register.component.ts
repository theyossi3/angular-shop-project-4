import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public currentTab: Number = 0;
    public user = new UserModel();
    public registration: FormGroup;
   
    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }
    ngOnInit() {
        this.registration = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            password: new FormControl(),
            confirmPassword: new FormControl(),
        });
    }
    public async register() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("You are registered :-)");
            this.myRouter.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
        }
    }



}
