import clsx from "clsx";
import { SpinnerIcon } from "../../assets/icons/icons";

export function LoadingSpinner({
  text,
  pageLoader,
}: {
  text?: string;
  pageLoader?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center gap-1.5 w-full min-h-20",
        pageLoader && "h-[30vh]"
      )}
    >
      <SpinnerIcon className="animate-spin text-primary-500 size-7" />
      {text && <p className="tracking-tight opacity-90 text-sm">{text}</p>}
    </div>
  );
}
