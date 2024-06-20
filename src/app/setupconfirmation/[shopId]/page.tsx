"use client";

import QRCode from "qrcode.react";
import { Shop, ShopDB, getShop } from "../../../../lib/shop/shopManager";
import { createClient } from "../../../../utils/supabase/client";

// interface ConfirmationPageProps {
//     shopName: string;
//     location: string;
//     feedbackURL: string;
//   }

  

export default function Page({
  params,
}: {
  params: { shopId: string}
}) {

  const { shopId } = params

  const supabase = createClient();
  const data: ShopDB = getShop(supabase, Number(shopId))

  // https://domain.com/shopid <- feedback link
  console.log(window.location.origin)

    const handleCopyToClipboard = (url:string) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
      };
    
      const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
        if (canvas) {
          const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = 'feedback_qr_code.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      };
    
    // if (error) { return <>Error</>}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{data.address}</p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={window.location.origin+`/${shopId}`}
              readOnly
              className="border border-gray-300 rounded-lg p-2 mr-2 flex-1"
            />
            <button
              onClick={() => handleCopyToClipboard(window.location.origin+`/${shopId}`)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Copy URL
            </button>
          </div>
          <div className="mb-4">
            <QRCode id="qrcode" value={window.location.origin+`/${shopId}`} size={256} level="H" includeMargin />
          </div>
          <button
            onClick={downloadQRCode}
            className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Download QR Code
          </button>
        </div>
      </div>
    )
}