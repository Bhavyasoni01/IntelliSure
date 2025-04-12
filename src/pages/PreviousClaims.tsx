import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

const PreviousClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch claims from the backend
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const userId = '67fa5b0b82b3990ba78a12eb'; // Replace with the actual user ID (e.g., from authentication)
        const response = await axios.get(`http://localhost:5000/api/claims/${userId}`);
        setClaims(response.data);
      } catch (err) {
        console.error('Error fetching claims:', err);
        setError('Failed to load claims. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

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
          <h2 className="text-2xl font-semibold">Previous Claims</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {claims.map((claim: any) => (
            <div key={claim._id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(claim.status)}
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{claim.type}</h3>
                    <p className="text-gray-500">
                      Submitted on {new Date(claim.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">${claim.amount}</p>
                  <p
                    className={`text-sm ${
                      claim.status === 'Accepted'
                        ? 'text-green-600'
                        : claim.status === 'Rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {claim.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousClaims;