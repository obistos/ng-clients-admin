import { Observable } from "rxjs";
import { ClientService } from "./../services/client.service";
import { Client } from "../models/client";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"]
})

export class ClientListComponent implements OnInit {
  clients: Observable<Client[]>;
  searchInput: string;
  searchResults: Array<any>;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.clients = this.clientService.getClientsList();
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id)
      .subscribe(data => {
        this.toastr.error('Client deleted successfully!');
        this.reloadData();
      },
      error => this.toastr.error(error));
  }

  editDetails(id: number){
    this.router.navigate(['edit-client', id]);
  }

  clientDetails(id: number){
    this.router.navigate(['view-client', id]);
  }
}
