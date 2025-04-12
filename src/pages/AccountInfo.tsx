import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, User, Lock } from 'lucide-react';

const AccountInfo = () => {
  const navigate = useNavigate();

  const vehicleDetails = {
    type: 'Sedan',
    model: 'Toyota Camry',
    year: '2022',
    registration: 'ABC123',
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Account Information</h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Vehicle Details
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Vehicle Type</p>
                <p className="mt-1">{vehicleDetails.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="mt-1">{vehicleDetails.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="mt-1">{vehicleDetails.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Number</p>
                <p className="mt-1">{vehicleDetails.registration}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue="user@example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  defaultValue="123 Main St, City, State 12345"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Security
            </h3>
            <div className="mt-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;