import React from 'react';

export default function Withdraw({ withdrawForm, setWithdrawForm, handleWithdrawSubmit, balance }) {
    return (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Withdraw Winnings</h3>
                <p className="text-gray-500 text-sm">Enter your bank details to transfer your earnings.</p>
            </div>
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">Account Holder Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter Name"
                        value={withdrawForm.holderName}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, holderName: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">Account Number</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                        placeholder="Enter Account Number"
                        value={withdrawForm.accountNo}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNo: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">IFSC Code</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                        placeholder="Enter IFSC"
                        value={withdrawForm.ifsc}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, ifsc: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">Withdrawal Amount (Min ₹100)</label>
                    <input
                        type="number"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                        placeholder="Enter Amount"
                        value={withdrawForm.amount}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4">
                    Withdraw Now (Balance: ₹{balance.toLocaleString()})
                </button>
            </form>
        </div>
    );
}