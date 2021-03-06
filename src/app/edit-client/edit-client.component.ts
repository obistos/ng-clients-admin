import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: number;
  client: Client;
  clientForm: FormGroup;
  clients: any;
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

    this.id = this.route.snapshot.params['id'];
    
    this.clientService.getClient(this.id)
      .subscribe(data => {
        this.client = data;
        this.clientForm.patchValue({
          firstName: this.client.firstName,
          lastName: this.client.lastName,
          mobileNumber: this.client.mobileNumber,
          IDNumber: this.client.IDNumber,
          physicalAddress: this.client.physicalAddress
        });
    }, error => console.log(error));
    
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
      this.checkDuplicates();
    }
  }

  updateUser() {
    this.clientService.updateClient(this.id, this.clientForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('Client updated successfully!');
          setTimeout(()=>{
            this.router.navigate(['../../'], { relativeTo: this.route });
          }, 1000);
        },
        error: error => {
          this.toastr.error('An error has occured. Please contact administrator');
          this.loading = false;
        }
    });
  }
  
  checkDuplicates() {
    this.clientService.getClientsList().subscribe(data => {
      this.clients = data as Client[];
      
      let duplicateFail = false;
      let formClients = this.clientForm.value;
      let counter  = 0;
  
      for (const iterator of this.clients) {
        if (iterator.IDNumber === formClients.IDNumber && iterator.id.toString() !== this.id) {
          counter += 1;
          this.toastr.error('This ID number already exists. Please change it.');
          this.loading = false;
          duplicateFail = true;
        }
        if (iterator.mobileNumber === formClients.mobileNumber && iterator.id.toString() !== this.id) {
          counter += 1;
          this.toastr.error('This Mobile number already exists. Please change it.');
          this.loading = false;
          duplicateFail = true;
        }
      }
      if (!duplicateFail)this.updateUser();
    }); 
  }
}
