'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';

interface Produce {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  unit: string;
  category: string;
  isActive: boolean;
  views: number;
  ordersCount: number;
  createdAt: string;
}

export default function MyProducesPage() {
  const [produces, setProduces] = useState<Produce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProduces();
  }, []);

  const loadProduces = async () => {
    try {
      const response = await apiClient.get('produces/farmer/my-produces');
      if (response.success) {
        setProduces(response.data.produces);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (produceId: string) => {
    try {
      await apiClient.put(`produces/${produceId}`, { isActive: false });
      loadProduces(); // Reload the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">My Produces</h1>
          <p className="text-green-600">Manage your farm produce listings</p>
        </div>

        <div className="mb-6">
          <Link 
            href="/farmer/add-produce"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Produce
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produces.map((produce) => (
            <div key={produce._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{produce.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  produce.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {produce.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-2xl font-bold text-green-600">
                  ₦{produce.price.toLocaleString()}/{produce.unit}
                </p>
                <p className="text-gray-600">
                  Available: {produce.availableQuantity} {produce.unit} of {produce.quantity}
                </p>
                <p className="text-sm text-gray-500">Category: {produce.category}</p>
                <p className="text-sm text-gray-500">Views: {produce.views}</p>
                <p className="text-sm text-gray-500">Orders: {produce.ordersCount}</p>
              </div>

              <div className="flex space-x-2">
                <Link 
                  href={`/produces/${produce._id}/edit`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeactivate(produce._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                >
                  {produce.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {produces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No produces listed yet.</p>
            <Link 
              href="/farmer/add-produce"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Add your first produce listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}