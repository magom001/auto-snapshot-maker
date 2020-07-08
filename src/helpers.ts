/**
 * Upload data using `multipart/form-data`
 *
 * @param url
 * @param formFieldName
 */
export const uploadPhotoAsFormData = (
  url: string,
  formFieldName: string,
  onReponse: (response: any) => void | undefined,
  onError: (error: Error) => void | undefined
) => async (blob: Blob) => {
  const formData = new FormData();

  formData.append(formFieldName, blob);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const body = await response.json();

    onReponse && onReponse(body);
  } catch (error) {
    onError && onError(error);
  }
};
