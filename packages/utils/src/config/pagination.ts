export const defaultPagination:
{
    perPage: number;
    page: number;
    orderBy: string;
    orderDir: 'asc' | 'desc';
} = {
    perPage: 10,
    page: 1,
    orderBy: 'created_at',
    orderDir: 'desc',
};
