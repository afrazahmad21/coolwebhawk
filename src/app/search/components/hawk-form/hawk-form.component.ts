import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { BreadcrumbService } from '../../../shared/services/breadcrumbs.service';
import { formConfiguration } from '../../form.configuration';
import { FormSubmitService } from '../../services/form-submit.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-hawk-form',
  templateUrl: './hawk-form.component.html',
  styleUrls: ['./hawk-form.component.scss'],
})
export class HawkFormComponent implements OnInit {
  public hawkFormGroup: FormGroup = this.formService.basicFiltersFormGroup;
  public formConfig = formConfiguration;
  userData: any;
  data: any;
  uploadedFiles: File[] = [];
  uploadedFilesName: string[] = [];
  formType: string = '';

  // @ViewChild('personalInfoTemp') personalInfoTemp: TemplateRef<any>
  // @ViewChild('professionalInfoTemp') professionalInfoTemp: TemplateRef<any>
  // @ViewChild('contactInfoTemp') contactInfoTemp: TemplateRef<any>
  // @ViewChild('legalInfoTemp') legalInfoTemp: TemplateRef<any>
  // @ViewChild('businessInfoTemp') businessInfoTemp: TemplateRef<any>
  // @ViewChild('addiotionalInfoTemp') addiotionalInfoTemp: TemplateRef<any>
  // @ViewChild('filesTemp') filesTemp: TemplateRef<any>

  constructor(
    private formService: FormService,
    private formSubmitService: FormSubmitService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userData = localStorage.getItem('userId');
    const isCompany = this.activatedRoute.snapshot.url.toString().includes('Company');
    this.formType = isCompany ? 'Company' : 'indivisual';
    console.log('this.formType: ', this.formType);
  }



  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumb('search');
  }

  public getNestedFormGroup(formGroupName: string): FormGroup {
    return this.hawkFormGroup.controls[formGroupName] as FormGroup;
  }

  public async submitForm() {

    let fileNames: any[] = [];
    if (this.uploadedFiles.length) {
      let formData: any = new FormData();

      const files: Array<File> = this.uploadedFiles;

      for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
        fileNames.push({ name: files[i].name });
      }

      const fileRes = await this.formSubmitService.filesUpload(formData).toPromise();
      // if (fileRes?.data) {
      // }

    }

    const userId = this.userData;
    const values = {
      ...this.hawkFormGroup.value,
      userId,
      files: fileNames
    }

    console.log('values: ', values);

    this.formSubmitService.submitForm(values).subscribe(
      () => this.redirectToSuccessPage(),
      (error) => console.log(error)
    );
  }

  private redirectToSuccessPage() {
    this.router.navigate(['../success'], { relativeTo: this.activatedRoute });
  }

  private getPageTitle() {
    try {
      // @ts-ignore
      const pageTitle = this.activatedRoute.snapshot.paramMap
        .get('form')
        .toString();
    } catch (e) {
      console.log(`Cannot get page title ${e}`);
    }
  }

  onFilesSelect(event: any) {
    const files = <Array<File>>event.target.files;
    if (files?.length) {
      // this.uploadedFiles = event.target.files;
      this.uploadedFiles = files;
      console.log('this.uploadedFiles: ', this.uploadedFiles);

    }
  }

  public fileDropped(files: NgxFileDropEntry[]) {
    // this.files = files;
    console.log('files: ', files);
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          this.uploadedFiles.push(file);

          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

}
