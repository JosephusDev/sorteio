export const formatPrice = (price: number) => `${price.toLocaleString("pt-AO")} Kz`;

export const capitalizeText = (text: string | null) => {
    return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : ''
}

export const getFileFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], new Date().getTime().toString(), { type: blob.type });
  return file;
};
