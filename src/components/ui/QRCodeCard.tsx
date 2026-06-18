import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';
import { generateGuestUrl } from '../../lib/utils';
import { motion } from 'framer-motion';

interface QRCodeCardProps {
  guestCode: string;
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ guestCode }) => {
  const url = generateGuestUrl(guestCode);

  const handleDownload = () => {
    const canvas = document.querySelector(`#qr-canvas-${guestCode} canvas`) as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `invite-${guestCode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col items-center gap-4 max-w-xs mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-sans text-xs tracking-widest uppercase text-gold-500">Your Invitation QR</p>
      <div
        id={`qr-canvas-${guestCode}`}
        className="p-3 bg-white rounded-xl border border-gold-200"
      >
        <QRCodeCanvas
          value={url}
          size={160}
          fgColor="#d4af37"
          bgColor="#ffffff"
          level="H"
        />
      </div>
      <p className="font-sans text-xs text-center text-gray-400 break-all">{url}</p>
      <button
        id={`qr-download-${guestCode}`}
        onClick={handleDownload}
        className="gold-btn text-xs px-4 py-2 flex items-center gap-2"
      >
        <Download size={14} />
        Download QR
      </button>
    </motion.div>
  );
};

export default QRCodeCard;
