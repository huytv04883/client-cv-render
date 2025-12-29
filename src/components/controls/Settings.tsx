import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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
          <SheetDescription>Comming soon...</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
