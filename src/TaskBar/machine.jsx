import React from 'react';

const machines = [
    { id: 1, price: 300, income: 800, days: 12 },
    { id: 2, price: 400, income: 1200, days: 12 },
    { id: 3, price: 500, income: 1800, days: 12 },
    { id: 4, price: 1000, income: 2450, days: 12 },
    { id: 5, price: 2000, income: 3050, days: 12 },
];

export default function Machine({ balance, handleBuyMachine }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {machines.map((m) => (
                <div key={m.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                    <div className="h-40 bg-purple-100 flex items-center justify-center">
                        <span className="text-5xl group-hover:rotate-12 transition-transform duration-300">🚜</span>
                    </div>
                    <div className="p-5 space-y-3">
                        <h4 className="text-lg font-bold text-gray-800 border-b pb-2">Earning Machine #{m.id}</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                <span className="text-gray-500">Machine Price:</span>
                                <span className="text-purple-600 font-bold">₹{m.price}</span>
                            </div>
                            <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                <span className="text-gray-500">Per Day Income:</span>
                                <span className="text-green-600 font-bold">₹{m.income}</span>
                            </div>
                            <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                <span className="text-gray-500">Validity:</span>
                                <span className="text-orange-600 font-bold">{m.days} Days</span>
                            </div>
                        </div>
                        <button onClick={() => handleBuyMachine(m)}
                            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}