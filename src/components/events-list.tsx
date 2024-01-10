import EventCard from "./event-card";
import { getEvents } from "@/lib/utils";
import PaginationControls from "./pagination-controls";

type EventsListProps = {
  city: string;
  page: number;
};

export default async function EventsList({ city, page }: EventsListProps) {
  const { events, total } = await getEvents(city, page);
  const prevPath = `/events/${city}?page=${page - 1}`;
  const nextPath = `/events/${city}?page=${page + 1}`;
  const disablePrevBtn = page <= 1;
  const disableNextBtn = page * 6 >= total;
  return (
    <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls
        prevPath={prevPath}
        nextPath={nextPath}
        disablePrevBtn={disablePrevBtn}
        disableNextBtn={disableNextBtn}
      />
    </section>
  );
}
