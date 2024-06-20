'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigateToFeedbackSubmit(shopId: string) {
  redirect(`/${shopId}/feedbacksubmit`)
}