import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "~/utils/cn";

export const DotButton = (props: {
  selected: boolean;
  onClick: () => void;
}) => {
  const { selected, onClick } = props;

  return (
    <button
      className={"embla__dot mr-3 ml-3 flex h-12 w-12 items-center after:h-2 after:w-full after:rounded-md after:bg-slate-100 after:content-['']".concat(
        selected
          ? " embla__dot--selected after:to-brand-700 after:bg-gradient-to-tr after:from-pink-500"
          : "",
      )}
      type="button"
      onClick={onClick}
    />
  );
};

export const PrevButton = (props: {
  enabled: boolean;
  onClick: () => void;
  className?: string;
}) => {
  const { enabled, onClick, className } = props;

  return (
    <button
      className="embla__button embla__button--prev "
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronLeft
        className={cn(
          "text-brand-700 h-12 w-12 hover:animate-pulse",
          className,
        )}
      />
    </button>
  );
};

export const NextButton = (props: {
  enabled: boolean;
  onClick: () => void;
  className?: string;
}) => {
  const { enabled, onClick, className } = props;

  return (
    <button
      className="embla__button embla__button--next "
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronRight
        className={cn(
          "text-brand-700 h-12 w-12 hover:animate-pulse",
          className,
        )}
      />
    </button>
  );
};
