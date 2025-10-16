import { getContactData } from "@/lib/contact";
import { useLocale } from "next-intl";

function ContactInfo() {
  const localeActive = useLocale();
  const ContactData = getContactData(localeActive);
  return (
    <section className="sticky top-14 sm:px-3">
      <div className=" rounded-md custom_border shadow-md px-4 pt-8 pb-5 hover:shadow-xl">
        <div className="ml-4 mb-4">
          <h2 className="mb-4 font-titleBold text-xl">Mihovil Smoljan</h2>
          <span className="text-sm">
            ( {/* {ContactData.data[0].contact_person} */}
            contact person )
          </span>
        </div>
        <div>
          <ul className="flex flex-col gap-3">
            <li>
              {/* {ContactData.data[0].address} */}
              Address:{" "}
              <span className="font-Bold">Antonio Smareglia 50, Vodnjan</span>
            </li>
            {/* <li> */}
            {/* {ContactData.data[0].mobile} */}
            {/* Mobile:{" "}
              <span className="text-yellow font-Bold">+(385) 98 263 136</span>
            </li> */}
            <li>
              {/* {ContactData.data[0].email_info} */}
              Email:{" "}
              <span className="font-Bold text-yellow">
                villaluxulika@gmail.com
              </span>
            </li>
            <li>
              {/* {ContactData.data[0].we_speak} */}
              We Speak:
            </li>
            <li className="font-Bold">Croatian, English, German, Italian</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
