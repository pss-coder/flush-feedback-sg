"use client";
import { useState } from 'react';
import AddressAutocomplete from './AddressAutocomplete';
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid';
import { useLocale, useTranslations } from 'next-intl';
import { doesShopNameExist } from '../../../lib/shop/shopManager';
import { createClient } from '../../../utils/supabase/client';

export default function SetupForm() {
  // Locale
  const localActive = useLocale();
  const t = useTranslations('SetupForm');

  // Loading
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Address
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');

  // Form
  const [shopName, setShopName] = useState('');
  const [contact, setContact] = useState('');

  // Error States
  const [shopNameError, setShopNameError] = useState('');
  const [contactError, setContactError] = useState('');

  const handleSubmit = (event: any) => {
    setLoading(true)

    // validate shop name
    if (!shopName) {
      event.preventDefault();
      alert('Please input shop name.');
      setLoading(false)
      return;
    }

    if (!isConfirmed) { // if confirm button not clicked
      event.preventDefault();
      alert('Please confirm your address.');
      setLoading(false)
      return;
    }

    // if (contactError) {
    //   event.preventDefault();
    //   alert('Please ensure you have 8 digit contact number.');
    //   setLoading(false)
    //   return;
    // }

    if (doesShopExist(shopName)) {
      event.preventDefault();
      setShopNameError("You may already have an exisiting Shop with us. Please contact us.")
      alert('You may already have an exisiting Shop with us, please look at your mobile message or contact us for help.');
      setLoading(false)
      return;
    }

  };

  const doesShopExist = (name: string) => {
    const supabase = createClient();
    const exists = doesShopNameExist(supabase,name) as boolean
    return exists
  };


  const handleShopNameChange = async (e: any) => {
    const name = e.target.value;
    setShopName(name);
    setShopNameError('');
  };

  const handleContactChange = (e: any) => {
    const value = e.target.value;
    setContact(value);
    setContactError('');

    if (!/^\d{8}$/.test(value)) {
      setContactError('Contact number must be an 8-digit number.');
    }
  };

  return (
    <div id='setup' className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t("title")}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            {t("description")}
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Names</span>
                  <UserIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  Benecia, Bernard, Pawandeep
                  <br />
                  Clean Dream Crew
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Contact Number</span>
                  <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="tel:+65 80336612">
                    +65 80336612
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="mailto:e0959560@u.nus.edu">
                   E0959560@u.nus.edu
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} action={`/api/setup?locale=${localActive}`} method='post' className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
             
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                {t("form.name")}
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Example: ABC Coffee Shop"
                    required
                    value={shopName}
                    onChange={handleShopNameChange}
                  />
                  {shopNameError && <p className="mt-1 text-sm text-red-600">{shopNameError}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="street-address" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t("form.address")}
                </label>
                <div className="mt-2.5">
                  {/* <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  /> */}
                  <AddressAutocomplete setCoordinates={setCoordinates} setAddress={setAddress} setIsConfirmed={setIsConfirmed} />
                  {coordinates.lat && coordinates.lng && (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                </p>
              )}
              <input required type="hidden" name="latitude" value={coordinates.lat || ''} />
              <input required type="hidden" name="longitude" value={coordinates.lng || ''} />
                </div>
              </div>
              {/* <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t("form.contact")}
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="contact"
                    id='contact'
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={contact}
                    onChange={handleContactChange}
                  />
                  {contactError && <p className="mt-1 text-sm text-red-600">{contactError}</p>}
                  <p className="mt-3 text-sm leading-6 text-gray-600">{t("form.contact-demo")}</p>
                </div>
              </div> */}
             
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        ) : (
          `${t("form.button")}`
        )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
