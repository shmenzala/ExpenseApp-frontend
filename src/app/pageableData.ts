export interface PageableData<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface PaginationParams {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
}