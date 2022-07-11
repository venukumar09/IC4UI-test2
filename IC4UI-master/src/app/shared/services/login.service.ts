import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { LocalStorageService } from "ngx-webstorage";
import { ApiService } from "src/app/shared/services/api.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public apiUrl = this.apiService.apiUrl;
  getloginuserdetails_ep = `${this.apiUrl}getloginuserdetails/`;
  getUrls_ep = `${this.apiUrl}getUrls/`;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private apiService: ApiService
  ) {}

  loginpost(url, data): Observable<any> {
    return this.http.post(url, data);
  }

  get(url): Observable<any> {
    let token = this.storage.retrieve("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "JWT " + token,
      }),
    };
    return this.http.get(url, httpOptions).map((res) => {
      return res;
    });
  }
}
