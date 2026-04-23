import React from 'react';

export default function Home({ news, balance }) {
    return (
        <div className="space-y-6">
            <marquee scrollAmount="12" direction="left" className="text-md sm:text-lg text-blue-600 font-medium mb-6">{news}</marquee>
            <marquee scrollAmount="15" direction="left" className="text-md sm:text-lg text-purple-500 mb-6">{news}</marquee>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b border-gray-300 pb-3">Account Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">₹{balance.toLocaleString()}</p>
                </div>
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Last Transaction Status</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">Success</p>
                </div>
            </div>
        </div>
    );
}