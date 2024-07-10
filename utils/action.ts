'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigateToFeedbackSubmit(shopId: string, gender: string) {
  redirect(`/${shopId}/${gender}/feedbacksubmit`)
}

export async function navigateToFeedback(shopId: string, gender: string) {
  redirect(`/${shopId}/${gender}`)
}