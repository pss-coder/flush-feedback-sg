"use client"

import { useEffect, useState } from "react"
import { navigateToFeedback } from "../../../../utils/action"

export default function FeedbackSubmit({
  params,
}: {
  params: { shopId: string}
}) {

  const [counter, setCounter] = useState(3)

  useEffect(() => {

    if (counter == 0) {
      navigateToFeedback(params.shopId)
    }
    
    const timer = (counter > 0 && setInterval(() => setCounter(counter - 1), 1000)) as NodeJS.Timeout;
    return () => clearInterval(timer);

  }, [counter, params])


  // process id from params, and gender also?
    // and display feedback page 
  
  // return <h1>My feedback system: {params.id}</h1>
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-8">Your feedback has been submitted successfully.</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Feedback Submitted</h2>
        <p className="text-lg text-gray-600 mb-4">Redirecting back in:</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-5xl font-bold text-gray-800">{counter}</span>
          <span className="text-xl text-gray-600">seconds</span>
        </div>
      </div>
    </div>
  );
}
  