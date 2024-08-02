"use client"

import { redirect } from 'next/navigation';
import { useState } from 'react';
// import { navigateToFeedbackSubmit } from '../../utils/action';
// import { ShopDB } from '../../lib/shop/shopManager';

import mirror from '@/images/buttons/mirror.png';
import trash from '@/images/buttons/trash.png';
import basin from '@/images/buttons/basin.png';
import dirty_toilet from '@/images/buttons/dirty-toilet.png';
import floor from '@/images/buttons/floor.png';
import paper from '@/images/buttons/paper.png';
import soap from '@/images/buttons/soap.png';
import toilet_clogged from '@/images/buttons/toilet-clogged.png';

import Image from 'next/image';
import { navigateToFeedbackSubmit } from '../../../utils/action';
import { ShopDB } from '../../../lib/shop/shopManager';
import { AnimatedSubscribeButton } from '../magicui/animated-subscribe-button';
import Marquee from '../magicui/marquee';
import Modal from '../ui/modal';
import DotPattern from '../magicui/dot-pattern';
import { cn } from '@/lib/utils';

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

  const [open, setOpen] = useState(false)

  const buttonLabels = [
    'Bin Full',
    'No more soap',
    'Dirty Basin',
    'Wet/dirty floor',
    'No more toilet paper',
    'Toilet Clogged',
    
    // 'Dirty Toilet bowl',
    // 'Mirror dirty',
    
    
    
    
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
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: mapSelectedButtonsToDbColumns(selectedButtons), shopid: shop.id, gender}),
    });

    // setIsSubmitting(false)
    
    if (response.status == 200) {
      console.log('Feedback submitted successfully!');
      setOpen(true)

    } else {
      setIsSubmitting(false)
      alert("something went wrong! Please try again and ensure you are connect to the network.")
      console.error('Failed to submit feedback', response);
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
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <DotPattern
        width={20}
        height={20}
        cx={2}
        cy={1}
        cr={1}
        // className={cn(
        //   "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        // )}
      />
        <div className="z-10 bg-white-100 p-4  flex flex-col items-center justify-center">

<div className="mb-4 text-center">
  <h1 className="text-2xl font-bold">{shop.name}</h1>
  <p className="text-lg text-gray-600">{shop.address}</p>
  <p className="text-lg text-gray-600">{capitalise(gender)} Toilet</p>
  <p className="text-lg text-black font-bold">Can select more than one option</p>

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
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-12 gap-y-24 p-12 bg-gray-50 border rounded-xl shadow-lg overflow-y-auto">
  {buttonLabels.map((label) => (
    <button
      key={label}
      onClick={() => toggleButtonSelection(label)}
      className={`relative p-4 rounded-lg focus:outline-none ${
        selectedButtons.includes(label)
          ? 'shadow-lg border-2 border-red-600'
          : 'border-2 border-black hover:shadow-xl'
      } bg-white`}
    >
       <div className="relative overflow-hidden flex flex-col items-center">
         <Image src={getImageForLabel(label)} alt={label} className="mb-2 w-32 h-32" />
         {/* <span>{label}</span> */}
         <Marquee pauseOnHover={true} className="[--duration:20s]"><span>{label} Chinese Word </span></Marquee>
       </div>
    </button>
    // <AnimatedSubscribeButton 
    // buttonColor="#000000"
    // buttonTextColor="#ffffff"
    // subscribeStatus={false}
    // initialText={
    //     <div className="p-4 rounded-lg focus:outline-none flex flex-col items-center border-2 border-black hover:shadow-xl">
    //     <Image src={getImageForLabel(label)} alt={label} className="mb-2 w-32 h-32" />
    //     <span>{label}</span>
    //   </div>
    // }

    // changeText={
    //   <div className=" p-4 rounded-lg focus:outline-none flex flex-col items-center shadow-lg border-2 border-red-600">
    //     <Image src={getImageForLabel(label)} alt={label} className="mb-2 w-32 h-32" />
    //     <span>{label}</span>
    //   </div>
    // }
    
    // />
  ))}
</div>
{/* { && ( */}
  <button
  disabled={selectedButtons.length == 0}
  onClick={() => handleSubmit()}
  
  className= {selectedButtons.length == 0 
    ? 'mt-4 px-6 py-3 text-white bg-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500' 
    : 'mt-4 px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500'}
  
  // 
  
  
>
  {isSubmitting ? (
        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : 'Submit'}
</button>
{/* )} */}

{/* Display Submitted Message  */}
<Modal open={open} setOpen={setOpen} shopId={shop.id} gender={gender} useCounter={true} />

        </div>
  
    </div>

  )
}
