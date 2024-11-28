export interface GeneralResponse<T> {
    status: number;
    data: T;
    message: string;
}
