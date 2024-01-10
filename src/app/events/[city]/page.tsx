import EventsList from "@/components/events-list";
import PrimaryHeading from "@/components/primary-heading";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";

type EventsPageProps = {
  params: {
    city: string;
  };
};

const parseCity = (city: string) => {
  return city === "all" ? "All Events" : `Events in ${capitalize(city)}`;
}

export function generateMetadata({ params }: EventsPageProps): Metadata {
  const title = parseCity(params.city);
  return {
    title: `Evento - ${title}`,
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = params;
  const title = parseCity(params.city);
  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <PrimaryHeading className="mb-28">{title}</PrimaryHeading>
      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
