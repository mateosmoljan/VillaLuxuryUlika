import { redirect } from "next/navigation";

export default function EnvironsRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/surroundings`);
}
