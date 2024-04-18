import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidationRegex } from '../../shared/constants';

@Injectable({ providedIn: 'root' })
export class FormService {
  public basicFiltersFormGroup = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
      dateOfBirth: new FormControl(null),
      age: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      home: new FormControl(null),
      workAddress: new FormControl(null),
      additionalAddress: new FormControl(null),
      countryOfBirth: new FormControl(null),
      cityOfBirth: new FormControl(null),
      postal: new FormControl(null),
      pob: new FormControl(null),
      citizenship: new FormControl(null),
      relationship: new FormControl(null),
      idNumber: new FormControl(null),
      passportNumber: new FormControl(null),
      licenceNumber: new FormControl(null),
      licencePlate: new FormControl(null),
      motherName: new FormControl(null),
      fatherName: new FormControl(null),
      partnerName: new FormControl(null),
      siblingsNames: new FormControl(null),
      childrenNames: new FormControl(null),
    }),
    contactInformation: new FormGroup({
      landlinePhone: new FormControl(null),
      mobilePhone: new FormControl(null),
      emailAddress: new FormControl(null),
      facebookAccount: new FormControl(null),
      facebookId: new FormControl(null),
      linkedinAccount: new FormControl(null),
      instagramAccount: new FormControl(null),
      twitterAccount: new FormControl(null),
      vkNumber: new FormControl(null),
    }),
    legalInformation: new FormGroup({
      caseName: new FormControl(null),
      caseNumber: new FormControl(null),
      judgeName: new FormControl(null),
    }),
    businessInformation: new FormGroup({
      companyName: new FormControl(null),
      registrationNumber: new FormControl(null),
      registrationDirector: new FormControl(null),
      businessAddress: new FormControl(null),
      businessEmail: new FormControl(null),
      businessPhoneNumber: new FormControl(null),
      certifiedEmployer: new FormControl(null),
    }),
    professionalInformation: new FormGroup({
      employment: new FormControl(null),
      education: new FormControl(null),
      jobTitle: new FormControl(null),
      bankAccountNumber: new FormControl(null),
      branchNumber: new FormControl(null),
      bankNumber: new FormControl(null),
      ipAddress: new FormControl(null),
    }),
    additionalInformation: new FormControl(null),

  });

  constructor() { }
}
