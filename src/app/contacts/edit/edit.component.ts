import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  contactForm: FormGroup;
  contact: Contact | null = null;
  contactId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.contactsService.GetContactById(this.contactId).subscribe((data) => {
      if (data) {
        this.contact = data;
        this.contactForm.patchValue({
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          street: this.contact.street,
          city: this.contact.city,
        });
      } else {
        this.errorMessage = 'Contact not found.';
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contactId,
        ...this.contactForm.value,
      };

      this.contactsService.EditContact(updatedContact);

      this.router.navigate(['/contacts']);
    }
  }
}
