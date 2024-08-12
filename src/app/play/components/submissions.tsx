import { getAttempts } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactElement } from "react";

export default async function Submissions({
  className,
  children,
}: {
  className?: string;
  children?: ReactElement;
}) {
  const attempts = await getAttempts();
  console.log("ATTEMPTS ", attempts);
  return (
    <div className={className + " border-primary border-2 rounded-sm p-4"}>
      <header className="border-b-8 border-primary pb-1 mb-2">
        <h1 className="font-bold text-4xl m-0 mb-1">Your Guesses</h1>
        {/* {serving_size && <p className="m-0">Serving Size {serving_size}</p>} */}
      </header>
      {children}
      {/* <div className="w-full border-collapse">
        <div
          // colSpan={2}
          className="font-normal text-left p-1 border-t border-primary whitespace-nowrap"
        >
          <b>Sugars</b>{" "}
        </div>
      </div> */}
      <Table className="place-items-center shrink">
        <TableHeader className="border-primary border-b-8">
          <TableRow>
            <TableHead className="dark:text-white">#</TableHead>
            <TableHead className="font-bold dark:text-white">Sugar</TableHead>
            <TableHead className="text-right dark:text-white">
              Feedback
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt, index) => (
            <TableRow
              key={index}
              className="bg-grey-100 border-primary border-b-2"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{attempt.value}g</TableCell>
              <TableCell className="text-right">{attempt.feedback}</TableCell>
            </TableRow>
          ))}
          {[...Array(-attempts.length + 5)].map((_, index) => (
            <TableRow
              key={index}
              className="bg-grey-100 border-primary border-b-2"
            >
              <TableCell>{attempts.length + index + 1}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Get within 5% of the correct answer</TableCaption>
      </Table>
      {/* {attempts.map((a) => (
        <div className="flex flex-row w-full border-collapse border-b border-primary-400 mb-2">
          <div className="text-left p-1">{a.value}</div>
          <div className="text-right p-1">{a.feedback}</div>
        </div>
      ))} */}
    </div>
  );
}
