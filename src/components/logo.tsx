import { Gift } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Gift className="h-6 w-6" />
      </div>
      <span className="text-foreground">MGiftCard BO</span>
    </div>
  );
}
