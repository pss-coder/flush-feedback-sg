"use client";

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { ShopDB } from "../../lib/shop/shopManager";

export default function QRURLClipboard({ shop, url}: {shop: ShopDB,url: string}) {

  // Feedback URL
  const [maleFeedbackUrl, setMaleShopUrl] = useState(`http://` + url +  `/${shop.id}/male`);
  const [femaleFeedbackUrl, setFemaleShopUrl] = useState(`http://` + url + `/${shop.id}/female`);

  const handleCopyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      alert('Failed to copy URL: ' +  err);
    }
  };

  const downloadQRCode = (id: string, filename: string) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = filename;
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
        
        {/* URL Inputs */}
        <div className="mb-8">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold mb-2">URLs</h2>
            <input
              type="text"
              value={maleFeedbackUrl}
              readOnly
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            <button
              onClick={() => handleCopyToClipboard(maleFeedbackUrl)}
              className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Copy Male URL
            </button>
            <input
              type="text"
              value={femaleFeedbackUrl}
              readOnly
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            <button
              onClick={() => handleCopyToClipboard(femaleFeedbackUrl)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Copy Female URL
            </button>
          </div>
        </div>
        
        {/* QR Codes */}
        <div className="flex flex-col md:flex-row justify-center mb-8">
          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-4">
            <QRCode id="male-qrcode" value={maleFeedbackUrl} size={256} level="H" includeMargin />
            <button
              onClick={() => downloadQRCode('male-qrcode', 'male_feedback_qr_code.png')}
              className="mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Download Male QR Code
            </button>
          </div>
          <div className="flex flex-col items-center md:ml-4">
            <QRCode id="female-qrcode" value={femaleFeedbackUrl} size={256} level="H" includeMargin />
            <button
              onClick={() => downloadQRCode('female-qrcode', 'female_feedback_qr_code.png')}
              className="mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Download Female QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}