import { type Dispatch, type SetStateAction } from "react";
import { Group } from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RegistrationReminder({ open, setOpen }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex-col sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Atencion!</DialogTitle>
        </DialogHeader>
        <div>Necesitas ingresar a tu cuenta para poder porseguir.</div>
        <DialogFooter className="w-full">
          <div className="flex w-full items-center justify-center gap-4">
            <Button className="w-full">Registrarme</Button>
            <Button className="w-full" variant="outline">
              Ingresar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
