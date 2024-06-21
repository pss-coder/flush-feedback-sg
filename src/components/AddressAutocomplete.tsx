"use client"
import React, { useState } from 'react';

const AddressAutocomplete = ({ setCoordinates, setAddress, setIsConfirmed }: {setCoordinates: any, setAddress: any, setIsConfirmed: any}) => {

    const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addressError, setAddressError] = useState('');


  const fetchSuggestions = async () => {
    setLoading(true);
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=Singapore ${query}&format=json&addressdetails=1`
          );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    // const newQuery = e.target.value;
    // setQuery(newQuery);
    // if (newQuery.length > 2) {
    //   fetchSuggestions(newQuery);
    // } else {
    //   setSuggestions([]);
    // }
    setAddressError('Please select from dropbox after confirming.'); // remove error

    setQuery(e.target.value);
    setIsConfirmed(false);  // Reset confirmation on input change


  };

  const handleSearchClick = () => {
    if (query.length > 2) {
        fetchSuggestions();
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const { display_name, lat, lon } = suggestion;
    setQuery(display_name);
    setSuggestions([]);
    setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
    setAddress(display_name);

    setAddressError(''); // remove error
    setIsConfirmed(true);  // Set confirmation when suggestion is clicked

  };

  return (
    <div>
      <input
        type="text"
        name="street-address"
        id="street-address"
        autoComplete="street-address"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your address"
        required
      />
      {addressError && <p className="mt-1 text-sm text-red-600">{addressError}</p>}
      <button
        type="button"
        className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded-md"
        onClick={handleSearchClick}
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        ) : (
          'Confirm'
        )}
      </button>

      
      {suggestions.length > 0 && (
        <ul className="block w-full z-10  bg-white border border-gray-300 rounded-md mt-1">
          {suggestions.map((suggestion: any) => (
            <li
              key={suggestion.place_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
