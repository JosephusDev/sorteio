export const formatPrice = (price: number) =>
  `${price.toLocaleString("pt-AO")} Kz`;

export const capitalizeText = (text: string | null) => {
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
};

export const formatDate = ({
  date,
  inverse = false,
}: {
  date: string | null;
  inverse?: boolean;
}) => {
  if (!date) return "";
  if (inverse) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};


export function formatToExtensionDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}