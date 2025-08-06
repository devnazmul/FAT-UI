import { currencyOptions } from "../constant/currency.js";

export default function DynamicCurrency(
  user = JSON.parse(localStorage.getItem("userData"))
) {
  const matched = currencyOptions?.filter(
    (curr) => curr?.value === user?.business?.currency?.toUpperCase()
  );

  return matched?.length > 0 ? matched[0]?.symbol : "£";
}
