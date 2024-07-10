"use client"

import { redirect } from 'next/navigation';
import { useState } from 'react';
import { navigateToFeedbackSubmit } from '../../utils/action';
import { ShopDB } from '../../lib/shop/shopManager';

import mirror from '@/images/mirror.png';
import trash from '@/images/trash.png';
import basin from '@/images/basin.png';
import dirty_toilet from '@/images/dirty-toilet.png';
import floor from '@/images/floor.png';
import paper from '@/images/paper.png';
import soap from '@/images/soap.png';
import toilet_clogged from '@/images/toilet-clogged.png';

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

export default function FeedbackButtons({ shop, genderStr} : {
  shop: ShopDB,
  genderStr: string
}) {

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [gender, setGender] = useState<string>(genderStr);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function capitalise(word:string) {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
  }

  async function handleSubmit() {
    setIsSubmitting(true)
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
      
      navigateToFeedbackSubmit(String(shop.id), gender)

    } else {
      setIsSubmitting(false)
      console.error('Failed to submit feedback');
    }
  };

  function getImageForLabel(label: string) {
    const images: any = {
      'Bin Full' : trash,
      'Dirty Basin': basin,
      'Mirror dirty': mirror,

      'Dirty Toilet bowl': dirty_toilet,
      'No more soap': soap,
      'No more toilet paper' : paper,

      'Toilet Clogged': toilet_clogged,

    'Wet/dirty floor': floor
      // Add more mappings as needed
    };
    return images[label];
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="mb-4 text-center">
    <h1 className="text-2xl font-bold">{shop.name}</h1>
    <p className="text-lg text-gray-600">{shop.address}</p>
    <p className="text-lg text-gray-600">{capitalise(gender)} Toilet</p>

   {/* Radio button slider for gender selection */}
   <div className="mt-4 flex items-center justify-center space-x-4 hidden">
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
  {selectedButtons.length > 0 && (
    <button
    onClick={() => handleSubmit()}
    className="mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        ) : 'Submit'}
  </button>
  )}
  
</div>
    
  )
}
