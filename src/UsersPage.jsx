import React, { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        // DummyJSON returns an object with a 'users' array inside it
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-12 text-pink-500 font-semibold text-lg">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">Build an API-based Users page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center space-x-4">
            <img 
              src={user.image} 
              alt={`${user.firstName} ${user.lastName}`} 
              className="w-16 h-16 rounded-full bg-pink-50 object-cover border border-pink-100"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{user.firstName} {user.lastName}</h3>
              <p className="text-xs text-pink-600 font-medium mb-1">@{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold">
                Age: {user.age} • {user.gender}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}