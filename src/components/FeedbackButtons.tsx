"use client"

import { redirect } from 'next/navigation';
// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { navigateToFeedbackSubmit } from '../../utils/action';
import { ShopDB } from '../../lib/shop/shopManager';

import mirror from '@/images/mirror.png';
import Image from 'next/image';

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
  const [gender, setGender] = useState<string>('');

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
      body: JSON.stringify({ feedback: mapSelectedButtonsToDbColumns(selectedButtons), shopid: shop.id, gender}),
    });

    if (response.status == 200) {
      console.log('Feedback submitted successfully!');
      
      navigateToFeedbackSubmit(String(shop.id))

    } else {
      console.error('Failed to submit feedback');
    }
  };

  function getImageForLabel(label: string) {
    // const images = {
    //   Button1: 'path/to/image1.png',
    //   Button2: 'path/to/image2.png',
    //   Button3: 'path/to/image3.png',
    //   // Add more mappings as needed
    // };
    return mirror;
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="mb-4 text-center">
    <h1 className="text-2xl font-bold">{shop.name}</h1>
    <p className="text-lg text-gray-600">{shop.address}</p>

   {/* Radio button slider for gender selection */}
   <div className="mt-4 flex items-center justify-center space-x-4">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
            className="hidden peer/male"
          />
          <label
            htmlFor="male"
            className="px-4 py-2 bg-gray-300 rounded-full cursor-pointer peer-checked/male:bg-blue-600 peer-checked/male:text-white"
          >
            Male
          </label>
          
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
            className="hidden peer/female"
          />
          <label
            htmlFor="female"
            className="px-4 py-2 bg-gray-300 rounded-full cursor-pointer peer-checked/female:bg-pink-600 peer-checked/female:text-white"
          >
            Female
          </label>
        </div>


  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-lg overflow-y-auto">
    {buttonLabels.map((label) => (
      <button
        key={label}
        onClick={() => toggleButtonSelection(label)}
        className={`p-4 rounded-lg focus:outline-none ${
          selectedButtons.includes(label)
            ? 'shadow-lg border-2 border-red-600'
            : 'border-2 border-black hover:shadow-md'
        } bg-white`}
      >
        <div className="flex flex-col items-center">
          <Image src={getImageForLabel(label)} alt={label} className="mb-2 w-8 h-8" />
          <span>{label}</span>
        </div>
      </button>
    ))}
  </div>
  <button
    onClick={() => handleSubmit()}
    className="mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
  >
    Submit
  </button>
</div>
    
  )
}
