import EventsList from "@/components/events-list";
import PrimaryHeading from "@/components/primary-heading";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

const parseCity = (city: string) => {
  return city === "all" ? "All Events" : `Events in ${capitalize(city)}`;
};

export function generateMetadata({ params }: Props): Metadata {
  const title = parseCity(params.city);
  return {
    title: `Evento - ${title}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const { city } = params;
  // const page = searchParams.page || 1;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if(!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  const page = parsedPage.data ?? 1;
  const title = parseCity(params.city);
  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <PrimaryHeading className="mb-28">{title}</PrimaryHeading>
      <Suspense fallback={<Loading />} key={city + page}>
        <EventsList city={city} page={page} />
      </Suspense>
    </main>
  );
}
