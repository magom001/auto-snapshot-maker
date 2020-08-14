/**
 * Upload data using `multipart/form-data`
 *
 * @param url
 * @param formFieldName
 */
export declare const uploadPhotoAsFormData: (url: string, formFieldName: string, onReponse: (response: any) => void | undefined, onError: (error: Error) => void | undefined) => (blob: Blob) => Promise<void>;
