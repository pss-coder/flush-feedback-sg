"use client"

import { redirect } from 'next/navigation';
// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { navigateToFeedbackSubmit } from '../../utils/action';
import { ShopDB } from '../../lib/shop/shopManager';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export default function FeedbackButtons({ shop } : {
  shop: ShopDB
}) {

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const buttonLabels = [
    'Bin Full',
    'Dirty Basin',
    'Dirty Toilet bowl',
    'Mirror dirty',
    'No more soap',
    'No more toilet paper',
    'Toilet Clogged',
    'Wet/dirty floor',
  ];

  const labelToColumnMap: { [key: string]: string } = {
    'Bin Full': 'bin_full',
    'Dirty Basin': 'dirty_basin',
    'Dirty Toilet bowl': 'dirty_toilet_bowl',
    'Mirror dirty': 'dirty_mirror',
    'No more soap': 'no_more_soap',
    'No more toilet paper': 'no_more_toilet_paper',
    'Toilet Clogged': 'toilet_clogged',
    'Wet/dirty floor': 'wet_dirty_floor',
  };

  const mapSelectedButtonsToDbColumns = (selectedButtons: string[]) => {
    
    const dbColumns = {
      bin_full: null,
      dirty_basin: null,
      dirty_toilet_bowl: null,
      dirty_mirror: null,
      no_more_soap: null,
      no_more_toilet_paper: null,
      toilet_clogged: null,
      wet_dirty_floor: null,
    } as any;

    selectedButtons.forEach((label) => {
      const column = labelToColumnMap[label];
      if (column) {
        dbColumns[column] = true;
      }
    });

    // Set unselected feedback to false
    Object.keys(dbColumns).forEach((key) => {
      if (dbColumns[key] === null) {
        dbColumns[key] = false;
      }
    });

    return dbColumns;
  };

  const toggleButtonSelection = (buttonLabel: string) => {
    setSelectedButtons((prevSelected) =>
      prevSelected.includes(buttonLabel)
        ? prevSelected.filter((label) => label !== buttonLabel)
        : [...prevSelected, buttonLabel]
    );
  };

  async function handleSubmit() {
    // Handle form submission, e.g., send selectedButtons to a server
    console.log('Selected feedback:', selectedButtons);

    // Handle form submission, e.g., send selectedButtons to a server
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: mapSelectedButtonsToDbColumns(selectedButtons), shopid: shop.id }),
    });

    if (response.status == 200) {
      console.log('Feedback submitted successfully!');
      
      // navigateToFeedbackSubmit(shop.id)

    } else {
      console.error('Failed to submit feedback');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="mb-4 text-center">
      <h1 className="text-2xl font-bold">{shop.name}</h1>
      <p className="text-lg text-gray-600">{shop.address}</p>
    </div>
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-lg">
    {buttonLabels.map((label) => (
          <button
            key={label}
            onClick={() => toggleButtonSelection(label)}
            className={`col-span-1 p-4 rounded-lg focus:outline-none focus:ring-2 ${
              selectedButtons.includes(label)
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300'
            }`}
          >
            {label}
          </button>
        ))}
    </div>
    <button 
    onClick={() => handleSubmit()}
    className="mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500">Submit</button>
  </div>
    
  )
}
