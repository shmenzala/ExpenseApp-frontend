import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gastos, GastosRequest } from './gastos';
import { PageableData, PaginationParams } from './pageableData';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private apiUrl = environment.apiBaseUrl;
  private reqMap = 'api/v1/gastos';

  constructor(private http: HttpClient) { }

  public postGastos(id_catgasto: number, gastos: GastosRequest): Observable<Gastos> {
    return this.http.post<Gastos>(`${this.apiUrl}/${this.reqMap}/${id_catgasto}`, gastos);
  }

  public getGastosPaged(param: PaginationParams): Observable<PageableData<Gastos>> {
    let params = new HttpParams()
      .set('pageNumber', param.pageNumber.toString())
      .set('pageSize', param.pageSize.toString())
      .set('sortBy', param.sortBy)
      .set('sortDir', param.sortDir);

    return this.http.get<PageableData<Gastos>>(`${this.apiUrl}/${this.reqMap}`, { params });
  }

  public getGastosById(id: number): Observable<Gastos> {
    return this.http.get<Gastos>(`${this.apiUrl}/${this.reqMap}/${id}`);
  }

  public putGastos(id: number, id_catgasto: number, gastos: GastosRequest): Observable<Gastos> {
    return this.http.put<Gastos>(`${this.apiUrl}/${this.reqMap}/${id}/${id_catgasto}`, gastos);
  }

  public deleteGastos(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${this.reqMap}/${id}`);
  }

}
