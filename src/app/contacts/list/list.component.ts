import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  contacts: Contact[] = [];
  constructor(
    private readonly contactsService: ContactsService,
    private router: Router
  ) {
    this.contacts = this.contactsService.contacts;
  }

  onClick(contact: Contact): void {
    this.router.navigate([`contacts/edit/${contact.id}`]);
  }
}
