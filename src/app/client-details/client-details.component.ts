import { Client } from '../models/client';
import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ClientListComponent } from '../client-list/client-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: number;
  client: Client;

  constructor(private route: ActivatedRoute,private router: Router,
    private clientService: ClientService) { }

  ngOnInit() {
    this.client = new Client();

    this.id = this.route.snapshot.params['id'];
    
    this.clientService.getClient(this.id)
      .subscribe(data => {
        this.client = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['clients']);
  }
}
