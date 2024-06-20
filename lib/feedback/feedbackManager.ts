import { SupabaseClient } from "@supabase/supabase-js";

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

export interface Feedback {
    shop_id: string | null,
    gender: string | null,

    bin_full: boolean | null,
    dirty_basin: boolean | null,
    dirty_toilet_bowl: boolean | null,
    dirty_mirror: boolean | null,
    no_more_soap: boolean | null,
    no_more_toilet_paper: boolean | null,
    toilet_clogged: boolean | null,
    wet_dirty_floor: boolean | null
   }

export function addFeedback(client: SupabaseClient, feedback: Feedback) {
    return client
      .from('feedback')
      .insert(feedback)
      .select()
}