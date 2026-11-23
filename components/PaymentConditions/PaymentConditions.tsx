import { getPaymentConditionsData } from "@/lib/paymentConditions";
import { useLocale } from "next-intl";
import Markdown from "react-markdown";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

function PaymentConditions() {
  const localeActive = useLocale();
  const PaymentConditionsData = getPaymentConditionsData(localeActive);
  const methods = (
    { hr, en, de, it }[localeActive] ?? en
  ).Payment_conditions.methods;

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
