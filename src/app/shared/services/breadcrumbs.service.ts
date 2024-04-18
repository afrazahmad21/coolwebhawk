import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private subject = new Subject<string>();

  public onUpdate(): Observable<string> {
    return this.subject.asObservable();
  }

  public updateBreadcrumb(str: string) {
    this.subject.next(str);
  }
}
