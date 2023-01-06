import { useState, useEffect } from 'react'
import { GET_ORDERS } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useCustomerOrders = (userId: string) => {
  const { loading, error, data } = useQuery(GET_ORDERS)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!data) return

    const getOrders: Order[] = data.getOrders.map(
      ({ value }: OrderResponce) => ({
        carrier: value.carrier,
        createdAt: value.createdAt,
        shippingCost: value.shippingCost,
        trackingId: value.trackingId,
        Address: value.Address,
        City: value.City,
        Lat: value.Lat,
        Lng: value.Lng,
        trackingItems: value.trackingItems,
      })
    )

    const customerOrders = getOrders.filter(
      (order) => order.trackingItems.customer_id === userId
    )

    setOrders(customerOrders)
  }, [data, userId])

  return { orders, loading, error }
}

export default useCustomerOrders
