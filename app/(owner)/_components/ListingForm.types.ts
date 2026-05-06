export interface ListingFormValues {
  title: string;
  description: string | null;
  city: string;
  street: string | null;
  street_number: string | null;
  bed_count: number;
  monthly_rent_per_bed: number;
  area_sqm: number | undefined;
  bathroom_count: number | undefined;
  has_kitchen: boolean;
  has_wifi: boolean;
  has_parking: boolean;
}

export interface ListingFormProps {
  initial?: ListingFormValues;
  listingId?: string;
}
