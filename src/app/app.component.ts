import { Component, OnInit } from '@angular/core';
import { Gastos } from './gastos';
import { GastosService } from './gastos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageableData, PaginationParams } from './pageableData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public gastos: Gastos[] = [];
  public pageableData: PageableData<Gastos> = {
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: false
  };
  public paginationParams: PaginationParams = {
    pageNumber: 0,
    pageSize: 10,
    sortBy: 'id',
    sortDir: 'asc'
  };
  public visiblePages: number[] = [];

  constructor(private gastosService: GastosService) { }

  ngOnInit(): void {
    this.getGastosPageable(this.paginationParams);
  }

  public getGastosPageable(params: PaginationParams): void {
    this.gastosService.getGastosPaged(params).subscribe(
      {
        next: (response: PageableData<Gastos>) => {
          this.pageableData = response;
          this.updateVisiblePages();
        },
        error: (error: HttpErrorResponse) => {
          alert(`getGastos() ERROR: ${error.message}`);
        }
      }
    );
  }

  public getPage(page: number): void {
    this.paginationParams.pageNumber = page;
    this.getGastosPageable(this.paginationParams);
  }

  public getPreviousPage(): void {
    if (!this.pageableData.first) {
      this.paginationParams.pageNumber--;
      this.getGastosPageable(this.paginationParams);
    }
  }

  public getNextPage(): void {
    if (!this.pageableData.last) {
      this.paginationParams.pageNumber++;
      this.getGastosPageable(this.paginationParams);
    }
  }

  // FUNCION updateVisiblePages() en observación (!)
  // Actualizar las páginas visibles basadas en la página actual
  private updateVisiblePages(): void {
    const totalPages = this.pageableData.totalPages;
    const currentPage = this.pageableData.pageNumber;

    // Mostrar hasta 5 páginas antes de la actual
    let startPage = Math.max(0, currentPage - 5);
    let endPage = Math.min(totalPages - 1, currentPage + 4);


    // Ajustar el inicio y el final si el número de páginas es menor a 10
    if (endPage - startPage < 9) {
      startPage = Math.max(0, endPage - 9);
    }

    this.visiblePages = Array.from({ length: (endPage + 1 - startPage) }, (_, i) => startPage + i);
  }

}
