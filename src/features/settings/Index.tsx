import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

type HamburgerProps = {
  isOpen: boolean;
  children?: React.ReactNode;
  onOpenChange: (open: boolean) => void;
};

export function Settings({ isOpen, children, onOpenChange }: HamburgerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left">Settings</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min overflow-y-auto">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
