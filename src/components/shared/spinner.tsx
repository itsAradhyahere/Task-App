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
        "flex flex-col items-center justify-center text-center gap-1.5 w-full",
        pageLoader && "h-[30vh]"
      )}
    >
      <SpinnerIcon className="animate-spin duration-200 text-primary-500 size-6" />
      {text && <p className="tracking-tight opacity-90 text-sm">{text}</p>}
    </div>
  );
}
