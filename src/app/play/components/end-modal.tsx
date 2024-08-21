"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EndModal = ({
  className,
  children,
  title,
  description,
  buttonText,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <Dialog defaultOpen>
      <DialogTrigger className={className} asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EndModal;
