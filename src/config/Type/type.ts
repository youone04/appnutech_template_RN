export interface DataBanner {
  banner_name: string,
  banner_image: string,
  description: string

}
export interface DataService {
  service_code: string,
  service_name: string,
  service_icon: string,
  service_tariff: number
}
export interface DataTransaction {
  balance: any
}
export interface DataRecord {
  invoice_number?: string,
  transaction_type?: string,
  description?: string,
  total_amount?: bigint,
  created_on?: string
}
export interface DataHistoryTransaction {
  offset: number,
  limit: number,
  records: DataRecord[]
}
export interface DataProfile {
  email?: string,
  first_name?: string,
  last_name?: string,
  profile_image?: string,
  uploadImage?: void,
  cekPhoto?: string | null,
  handleChoosePhoto?: any,
}

export interface FieldProfile {
  email?: string,
  first_name?: string,
  last_name?: string
}
