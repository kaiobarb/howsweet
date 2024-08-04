import { ReactElement } from "react";

export default function Submissions({
  className,
  children,
}: {
  className?: string;
  children?: ReactElement;
}) {
  return (
    <div className={className + " border-primary border-2 rounded-sm p-4"}>
      <header className="border-b-8 border-primary pb-1 mb-2">
        <h1 className="font-bold text-4xl m-0 mb-1">Your Guesses</h1>
        {/* {serving_size && <p className="m-0">Serving Size {serving_size}</p>} */}
      </header>
      {children}
      <div className="w-full border-collapse">
        <div
          // colSpan={2}
          className="font-normal text-left p-1 border-t border-primary whitespace-nowrap"
        >
          <b>Sugars</b>{" "}
        </div>
      </div>

      <div className="w-full border-collapse border-b border-primary-400 mb-2">
        <div>
          <div className="text-left p-1">sugars</div>
          <div className="text-right p-1">blah</div>
        </div>
      </div>
    </div>
  );
}
