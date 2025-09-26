'use client';

import { useState } from 'react';

export default function TestDBPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setStatus({ error: 'Failed to connect' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-gray-600 font-bold mb-6">Database Connection Test</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test MongoDB Connection'}
        </button>

        {status && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow">
            <pre className="text-sm text-gray-600">{JSON.stringify(status, null, 2)}</pre>
          </div>
        )}

        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Expected Collections in your MongoDB:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>users</strong> - User accounts and profiles</li>
            <li><strong>produces</strong> - Farm produce listings</li>
            <li><strong>orders</strong> - Purchase orders</li>
            <li><strong>blog</strong> - Blog posts and articles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}