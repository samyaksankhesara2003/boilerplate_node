export interface Pagination {
    perPage: number;
    page: number;
    orderBy: string;
    orderDir: 'asc' | 'desc';
}

export const defaultPagination: Pagination = {
    page: 1,
    perPage: 10,
    orderBy: 'created_at',
    orderDir: 'desc',
}

const getPageNumber = (pageNumber: number) => {
    if (pageNumber > 0) {
        if (pageNumber === 1) return null;
        else return pageNumber - 1;
    }
    return null;
}

export const createPagination = (
    totalRecords: number,
    pageNumber: number,
    recordPerPage: number,
    result?: Array<unknown>
) => {
    const pages = Math.ceil(totalRecords / recordPerPage);
    return {
        result,
        pagination: {
            currentPage: pageNumber,
            recordPerPage,
            totalRecords,
            previous: getPageNumber(pageNumber),
            next: pageNumber < pages ? pageNumber + 1 : null,
        }
    }
}