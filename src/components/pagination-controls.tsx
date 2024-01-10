import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationControlsProps = {
  prevPath: string;
  nextPath: string;
  disablePrevBtn: boolean;
  disableNextBtn: boolean;
};

const btnStyles =
  "text-white px-5 py-3 bg-white/5 flex items-center gap-x-2 hover:opacity-100 transition text-sm rounded-xl";

export default function PaginationControls({
  prevPath,
  nextPath,
  disablePrevBtn,
  disableNextBtn
}: PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {disablePrevBtn ? (
        <div></div>
      ) : (
        <Link className={btnStyles} href={prevPath}>
          <ArrowLeftIcon />
          Previous
        </Link>
      )}
      {disableNextBtn ? (
        <div></div>
      ) : (
        <Link className={btnStyles} href={nextPath}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
