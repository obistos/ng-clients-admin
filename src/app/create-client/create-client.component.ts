import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  id: number;
  client: Client;
  clientForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.client = new Client();

    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      IDNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13)]],
      physicalAddress: ''
    });

  }

  get f() {
    return this.clientForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.clientForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.createUser();
    }
  }

  createUser() {
    this.clientService.createClient(this.clientForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
              this.toastr.success('Client added successfully!');
              setTimeout(()=>{
                this.router.navigate(['../'], { relativeTo: this.route });
              }, 1000);
            },
            error: error => {
              this.toastr.error('An error has occured. Please contact administrator');
              this.loading = false;
            }
        });
  }
}
