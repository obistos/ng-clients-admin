import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientfilter'
})
export class ClientfilterPipe implements PipeTransform {

  transform(clients: any, term?: any): any {
    if( term === undefined) return clients;
    return clients.filter(function(client){
      return client.firstName.toLowerCase().includes(term.toLowerCase()) ||
      client.mobileNumber.toLowerCase().includes(term.toLowerCase()) ||
      client.IDNumber.toString().includes(term.toLowerCase());
    })
  }
}
