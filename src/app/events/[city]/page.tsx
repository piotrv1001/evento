import EventsList from "@/components/events-list";
import PrimaryHeading from "@/components/primary-heading";
import { EventoEvent } from "@/lib/types";
import { z } from "zod";

type EventsPageProps = {
  params: {
    city: string;
  };
};

export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = params;
  let events: EventoEvent[] = [];

  try {
    const res = await fetch(
      `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
    );

    if (!res.ok) throw new Error(`Server response status: ${res.status}`);

    const EventoEventSchema = z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      city: z.string(),
      location: z.string(),
      date: z.union([z.date(), z.string()]),
      organizerName: z.string(),
      imageUrl: z.string(),
      description: z.string(),
    });
    const EventoEventArraySchema = z.array(EventoEventSchema);
    const rawEvents = await res.json();
    const parsedEvents = EventoEventArraySchema.safeParse(rawEvents);

    if (!parsedEvents.success) throw new Error(parsedEvents.error.message);

    events = parsedEvents.data;
  } catch (error) {
    console.error(error);
  }

  const capitalizedCity = city[0].toUpperCase() + city.slice(1);
  const title = city === "all" ? "All Events" : `Events in ${capitalizedCity}`;
  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <PrimaryHeading>{title}</PrimaryHeading>
      {events.length === 0 ? 'No events found...' : <EventsList events={events} />}
    </main>
  );
}
