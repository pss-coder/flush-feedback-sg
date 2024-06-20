"use client";

import QRCode from "qrcode.react";
import { ShopDB } from "../../lib/shop/shopManager";

export default function QRURLClipboard({shop,url}: {shop: ShopDB,url: string}) {

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-center">{shop.name}</h1>
            <p className="text-lg text-gray-600 mb-2 text-center">{shop.address}</p>
            <p className="text-lg text-gray-600 mb-4 text-center">{shop.contact}</p>
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <input
                type="text"
                value={'http://'+url+`/${shop.id}`}
                readOnly
                className="border border-gray-300 rounded-lg p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:flex-1"
              />
              <button
                onClick={() => handleCopyToClipboard('http://'+url+`/${shop.id}`)}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
              >
                Copy URL
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <QRCode id="qrcode" value={`http://`+url+`/${shop.id}`} size={256} level="H" includeMargin />
            </div>
            <button
              onClick={downloadQRCode}
              className="w-full px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Download QR Code
            </button>
          </div>
        </div>
      );
}