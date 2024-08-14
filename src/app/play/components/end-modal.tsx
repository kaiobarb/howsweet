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
}: {
  open: boolean;
  children: React.ReactNode[];
}) => {
  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You Lose!</DialogTitle>
          <DialogDescription>Better luck next time.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default EndModal;
