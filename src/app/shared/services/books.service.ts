import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {
  }

  API_URL = 'http://localhost:3000/books/';

  getAllBooks(): Observable<any> {
    return this.http.get("./assets/dbBooks.json")
  }



}
