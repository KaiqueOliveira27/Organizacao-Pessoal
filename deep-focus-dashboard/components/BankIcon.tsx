import React from 'react';

interface BankIconProps {
  bank: string;
  className?: string;
}

export const BankIcon: React.FC<BankIconProps> = ({ bank, className = "" }) => {
  const bankName = bank.toLowerCase();

  const logoMap: Record<string, { url: string; bg: string }> = {
    'nubank': { 
      url: 'https://www.google.com/s2/favicons?domain=nubank.com.br&sz=128', 
      bg: 'bg-[#8A05BE]' 
    },
    'mercado pago': { 
      url: 'https://www.google.com/s2/favicons?domain=mercadopago.com.br&sz=128', 
      bg: 'bg-[#00B1EA]' 
    },
    'santander': { 
      url: 'https://www.google.com/s2/favicons?domain=santander.com.br&sz=128', 
      bg: 'bg-white' 
    },
    'bradesco': { 
      url: 'https://www.google.com/s2/favicons?domain=bradesco.com.br&sz=128', 
      bg: 'bg-white' 
    }
  };

  const selected = Object.entries(logoMap).find(([key]) => bankName.includes(key));

  if (selected) {
    const [, data] = selected;
    return (
      <div className={`w-10 h-10 rounded shadow-md flex items-center justify-center p-1.5 shrink-0 ${data.bg} ${className}`}>
        <img src={data.url} alt={bank} className="w-full h-full object-contain" />
      </div>
    );
  }

  return (
    <div className={`w-10 h-10 rounded shadow-md flex items-center justify-center text-white bg-slate-700 shrink-0 ${className}`}>
      <span className="text-xs font-bold">{bank.substring(0, 2).toUpperCase()}</span>
    </div>
  );
};
