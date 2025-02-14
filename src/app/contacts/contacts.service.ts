import { Injectable } from '@angular/core';
import { CONTACTS } from '../data/contacts';
import { Contact } from '../models/contact';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  public contacts: Contact[] = CONTACTS;

  public AddContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  public EditContact(updatedContact: Contact): void {
    this.contacts = this.contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
  }

  GetContactById(id: number): Observable<Contact | null> {
    const contact = this.contacts.find((contact) => contact.id === id);
    if (contact) {
      return of(contact);
    } else {
      return of(null);
    }
  }
}
