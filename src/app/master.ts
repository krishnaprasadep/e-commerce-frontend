import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  export class MasterService {
    public apiUrl = 'http://localhost:3000';
  }