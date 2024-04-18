export type FormCategories =
  | 'personalInformation'
  | 'contactInformation'
  | 'legalInformation'
  | 'businessInformation'
  | 'professionalInformation'
  | 'additionalInformation'
  | 'files';

export type ApplicationForm = {
  [item in FormCategories]: ApplicationFormField[];
};

export interface ApplicationFormField {
  fieldName: string;
  label: string;
  type: InputType;
  required: boolean;
}

export type InputType = 'string' | 'date' | 'select';

export type formTypeFormat = {
  others:[
    'personalInformation', 'contactInformation', 'legalInformation', 'businessInformation', 'professionalInformation', 'files', 'additionalInformation'
  ],
  company:[
    'businessInformation', 'contactInformation', 'legalInformation', 'personalInformation',  'professionalInformation', 'files', 'additionalInformation'
  ]
}
