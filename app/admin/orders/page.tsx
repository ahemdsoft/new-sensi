/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useGetAllForAdminQuery, useUpdateOrderMutation } from '@/app/redux/services/order.service';

export default function OrdersPage() {
  const { data: orders = [], error, isLoading } = useGetAllForAdminQuery({});
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>({});

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId: string, status: string) => {
    setOrderStatuses(prev => ({
      ...prev,
      [orderId]: status
    }));
  };

  const handleStatusUpdate = async (orderId: string) => {
    const statusToUpdate = orderStatuses[orderId];
    if (!statusToUpdate) return;
    
    try {
      const body = {
        status: statusToUpdate
      }
      console.log(orderId)
      await updateOrderStatus({
        body,
        orderId,
      }).unwrap();
      // Clear the status selection for this order after update
      setOrderStatuses(prev => {
        const newStatuses = {...prev};
        delete newStatuses[orderId];
        return newStatuses;
      });
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const getDeliveryCharge = (deliveryCharge: any) => {
    if (!deliveryCharge) return 0;
    if (typeof deliveryCharge === 'number') return deliveryCharge;
    if (typeof deliveryCharge === 'object' && deliveryCharge.charge) {
      return deliveryCharge.charge;
    }
    return 0;
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map((order: any) => (
            <li key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Customer Information</h4>
                  <p className="text-sm text-gray-500">{order.name}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                  <p className="text-sm text-gray-500">{order.city}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order Summary</h4>
                  <p className="text-sm text-gray-500">Total Amount: ৳{order.totalPrice}</p>
                  <p className="text-sm text-gray-500">Subtotal: ৳{order.subtotal}</p>
                  <p className="text-sm text-gray-500">
                    Delivery: ৳{getDeliveryCharge(order.deliveryCharge)}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  View Details
                </button>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={orderStatuses[order.id] || ''}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="FAILED">Failed</option>
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(order.id)}
                    disabled={!orderStatuses[order.id]}
                    className={`px-4 py-2 rounded-md focus:outline-none ${
                      !orderStatuses[order.id] 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for order details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedOrder.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                    <p><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                    <p><span className="font-medium">City:</span> {selectedOrder.city}</p>
                    {selectedOrder.zipCode && (
                      <p><span className="font-medium">Zip Code:</span> {selectedOrder.zipCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1).toLowerCase()}
                      </span>
                    </p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    <p><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod || 'Cash on Delivery'}</p>
                    <p><span className="font-medium">Subtotal:</span> ৳{selectedOrder.subtotal}</p>
                    <p><span className="font-medium">Delivery:</span> ৳{getDeliveryCharge(selectedOrder.deliveryCharge)}</p>
                    <p className="font-medium text-lg">Total: ৳{selectedOrder.totalPrice}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-4">
                {selectedOrder.items?.map((item: any) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-48 object-contain rounded-lg border"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xl font-medium">{item.name}</h4>
                      <p className="text-gray-600 mb-2">
                        {item.brand} {item.mobile && `- ${item.mobile}`}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="font-medium">Price:</p>
                          <p>৳{item.price}</p>
                        </div>
                        <div>
                          <p className="font-medium">Quantity:</p>
                          <p>{item.quantity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Total:</p>
                          <p>৳{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        {item.color && (
                          <div>
                            <p className="font-medium">Color:</p>
                            <p>{item.color}</p>
                          </div>
                        )}
                        {item.size && (
                          <div>
                            <p className="font-medium">Size:</p>
                            <p>{item.size}</p>
                          </div>
                        )}
                      </div>

                      {item.type === 'custom' && item.customDesign?.notes && (
                        <div className="mt-2 p-3 bg-gray-50 rounded">
                          <p className="font-medium">Custom Design Notes:</p>
                          <p>{item.customDesign.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}