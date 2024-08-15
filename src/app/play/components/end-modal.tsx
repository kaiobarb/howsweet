import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

const EndModal = ({
  open,
  children,
  win,
}: {
  open: boolean;
  children: React.ReactNode[];
  win?: boolean;
}) => {
  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center">
            {win ? "You Win!" : "You Lose!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {win ? "How sweet :)" : "Better luck next time."}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default EndModal;
