import { getServerSession } from '@/lib/auth';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';

interface DashboardStats {
  totalProduces: number;
  activeProduces: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  // This would be a server action or API call
  return {
    totalProduces: 24,
    activeProduces: 18,
    totalOrders: 156,
    pendingOrders: 12,
    totalRevenue: 1250000
  };
}

export default async function FarmerDashboard() {
  const session = await getServerSession();
  const stats = await getDashboardStats();

  if (!session || session.user.userType !== 'farmer') {
    return <div>Access denied. Please log in as a farmer.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Welcome back, {session.user.profile.firstName}!
          </h1>
          <p className="text-green-600">Manage your farm produce and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Produces</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalProduces}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Listings</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.activeProduces}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link 
            href="/farmer/add-produce"
            className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Add New Produce</h3>
            <p>List your farm produce for buyers</p>
          </Link>
          
          <Link 
            href="/farmer/my-produces"
            className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Manage Produces</h3>
            <p>View and edit your produce listings</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {/* Orders would be mapped here */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Order #KID20241215001</h4>
                  <p className="text-gray-600">50kg Premium Yam</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}