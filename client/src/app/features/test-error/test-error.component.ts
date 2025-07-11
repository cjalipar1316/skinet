import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { environment } from '../../../environment';

@Component({
  selector: 'app-test-error',
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  private http = inject(HttpClient);
  validationErrors?:string[];

  get404Error(){
    this.http.get(environment.baseUrl + "buggy/notfound").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  get400Error(){
    this.http.get(environment.baseUrl + "buggy/badrequest").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  get401Error(){
    this.http.get(environment.baseUrl + "buggy/unauthorized").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  get500Error(){
    this.http.get(environment.baseUrl + "buggy/internalerror").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  get400ValidationError(){
    this.http.post(environment.baseUrl + "buggy/validationerror", {}).subscribe({
      next: res => console.log(res),
      error: err => this.validationErrors = err
    })
  }
}
