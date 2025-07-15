import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary">
      <div className="bg-primary text-primary-foreground p-1 rounded-lg flex items-center justify-center">
        <Image src="https://pos.promptnow.com:13443/pos_pn/elephant/mcard/img/mcard.png" alt="MGiftCard Logo" width={32} height={32} />
      </div>
      <span className="text-foreground">MGiftCard BO</span>
    </div>
  );
}
