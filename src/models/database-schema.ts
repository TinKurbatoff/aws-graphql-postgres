export interface AddressItem {
  id: number;
  primary_lane: string;
  city: string;
  state: string;
  zip_code: string;  
  created_at: Date;
  updated_at: Date;
}

export interface AddressDbItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  fips:string;
  apn: string;
  street_number: string;
  street_pre_direction: string;
  street_name: string;
  street_suffix: string;
  street_post_direction: string;
  unit_type: string;
  unit_number: string;
  formatted_street_address: string;
  city: string;
  state: string;
  zip_code: string;
  zip_plus_four_code: string;
  latitude: string;
  longitude:string;
  geocoding_accuracy: string;
  census_tract: string;
  carrier_code: string;

}

export interface SearchAddressListItem {
  primary_lane: string;
  city: string;
  state: string;
  zip_code: string;
}
