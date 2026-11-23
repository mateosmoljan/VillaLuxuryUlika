import { getPaymentConditionsData } from "@/lib/paymentConditions";
import { useLocale, useTranslations } from "next-intl";
import Markdown from "react-markdown";

function PaymentConditions() {
  const localeActive = useLocale();
  const PaymentConditionsData = getPaymentConditionsData(localeActive);
  const methods = useTranslations("Payment_conditions").raw(
    "methods"
  ) as string[];

  return (
    <div>
      <div className="flex flex-col gap-5 mb-5">
        {/* <p>{PaymentConditionsData.data[0].des}</p> */}
        <p>
          <Markdown>{PaymentConditionsData.data[0].des2}</Markdown>
        </p>
        <p>
          <Markdown>{PaymentConditionsData.data[0].des3}</Markdown>
        </p>
        <p>
          <Markdown>{PaymentConditionsData.data[0].des4}</Markdown>
        </p>
        <p>
          <Markdown>{PaymentConditionsData.data[0].des5}</Markdown>
        </p>
        <p>
          <Markdown>{PaymentConditionsData.data[0].des6}</Markdown>
        </p>
      </div>
      <div>
        <p className="font-titleBold">{PaymentConditionsData.data[0].title2}</p>
        <ul>
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PaymentConditions;
