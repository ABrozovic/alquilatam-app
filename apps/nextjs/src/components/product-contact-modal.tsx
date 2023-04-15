import { type Dispatch, type SetStateAction } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  description: string;
};

export default function ProductContactModal({
  open,
  setOpen,
  description,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex-col sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">En hora buena!</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="w-full">
          <div className="flex w-full items-center justify-center gap-4">
            <Button className="w-full">Aceptar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
