import { getPaymentConditionsData } from "@/lib/paymentConditions";
import { useLocale } from "next-intl";
import Markdown from "react-markdown";

function PaymentConditions() {
  const localeActive = useLocale();
  const PaymentConditionsData = getPaymentConditionsData(localeActive);

  return (
    <div>
      <div className="flex flex-col gap-5 mb-5">
        <p>{PaymentConditionsData.data[0].des}</p>
        {/* <p>
          <Markdown>{PaymentConditionsData.data[0].des2}</Markdown>
        </p> */}
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
          <li>Cash (upon arrival) </li>
          <li>Bank Transfer (Internet Banking)</li>
          <li>Revolut</li>
          <li>PayPal</li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentConditions;
