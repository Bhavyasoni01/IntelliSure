import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Bell, X } from 'lucide-react';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your claim #1234 has been approved.', read: false },
    { id: 2, message: 'Your policy renewal is due in 7 days.', read: false },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string; read: boolean } | null>(null);

  const handleNewNotification = (message: string) => {
    const newNotification = { id: Date.now(), message, read: false };
    setNotifications((prev) => [newNotification, ...prev]);
    setToast(newNotification);

    setTimeout(() => setToast(null), 5000);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const removeToast = () => {
    setToast(null);
  };

  const policies = [
    {
      name: 'Auto Insurance',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
    {
      name: 'Home Insurance',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
    },
  ];

  const claimData = [
    { name: 'Created', value: 5, color: '#3B82F6' },
    { name: 'Accepted', value: 3, color: '#10B981' },
    { name: 'Rejected', value: 2, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-2 rounded-md flex justify-between items-center ${
                      notification.read ? 'bg-gray-100' : 'bg-blue-50'
                    }`}
                  >
                    <div>
                      <p className="text-sm text-gray-700">{notification.message}</p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Remove notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 z-50">
          <p className="text-sm text-gray-700">{toast.message}</p>
          <button onClick={removeToast} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Policies</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <div
              key={policy.name}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium">{policy.name}</h3>
              <p className="text-gray-600">
                Valid from: {new Date(policy.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Valid until: {new Date(policy.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Claims Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={claimData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {claimData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulate a new notification
      <button
        onClick={() => handleNewNotification('A new claim has been submitted.')}
        className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
      >
        Simulate New Notification
      </button> */}
    </div>
  );
};

export default Dashboard;