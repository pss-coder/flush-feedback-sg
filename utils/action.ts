'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigateToFeedbackSubmit(shopId: string) {
  redirect(`/${shopId}/feedbacksubmit`)
}

export async function navigateToFeedback(shopId: string) {
  redirect(`/${shopId}`)
}