import { SupabaseClient } from "@supabase/supabase-js";

export interface Shop {
   name: string | null,
   contact: number | null,
   address: string | null,
   longitude: number | null,
   latitude: number | null
  }

  export interface ShopDB {
    id: number,
    name: string | null,
    contact: number | null,
    address: string | null,
    longitude: number | null,
   latitude: number | null
   }

export function getShops(client: SupabaseClient) {
    return client
      .from('shop')
      .select()
}

export function getShop<ShopDB>(client: SupabaseClient, id: number) {
    return client
      .from('shop')
      .select()
      .eq('id', id)
      .single() as ShopDB
}

export function addShop(client: SupabaseClient, shop: Shop) {
    return client
      .from('shop')
      .insert(shop)
      .select()
}

export function doesShopNameExist(client: SupabaseClient, shopName: string) {
  const {data, error } = client.from('shop').select().eq('name', shopName).single() as any
  console.log(data)
  if (data) {return true}
  if (error) {console.log(error); return true}

  return false
}