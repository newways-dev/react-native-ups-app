type Customer = {
  email: string
  name: string
}

type CustomerList = {
  name: ID
  value: Customer
}

type TrackingItem = {
  customer_id: ID
  customer: Customer
  items: Item[]
}

type Item = {
  item_id: ID
  name: string
  price: number
  quantity: number
}

type OrderResponce = {
  value: Order
}

type Order = {
  carrier: string
  createdAt: string
  shippingCost: number
  trackingId: string
  Address: string
  City: string
  Lat: number
  Lng: number
  trackingItems: TrackingItem
}

type CustomerResponce = {
  name: ID
  value: Customer
}
