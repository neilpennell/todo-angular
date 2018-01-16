﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, GlobalLoaderService } from '../services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {
        role: "user"
    };
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private als: AlertService,
        private gls: GlobalLoaderService
    ) { }

    register() {
        this.gls.globalLoader.isLoading = true;    
        this.userService.add(this.model)
            .subscribe(
                data => {
                    this.als.updateAlertQueue({message:"<strong>Your registration is successful. Please login to the application to manage your todos.</strong>", type: "success"});
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.gls.globalLoader.isLoading = false;
    }
}