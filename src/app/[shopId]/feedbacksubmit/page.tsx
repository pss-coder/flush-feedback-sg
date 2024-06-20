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
    <>
        Feedback Submitted
        shopid: {params.shopId}
        redirecting back in {counter}
    </>
  )
}
  