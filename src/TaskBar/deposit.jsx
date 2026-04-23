import React from 'react';
const img3 = "../public/images/upi-qr.jpeg";

const DEPOSIT_LINKS = {
    300: 'https://rzp.io/rzp/oHhUqDn',
    400: 'https://rzp.io/rzp/Xpym4v0',
    500: 'https://rzp.io/rzp/d9hKw2p',
    600: 'https://rzp.io/rzp/uRWblqm',
    700: 'https://rzp.io/rzp/mGWB1MLE',
    800: 'https://rzp.io/rzp/hQrpHQx',
    900: 'https://rzp.io/rzp/huzZpWt6',
    1000: 'https://rzp.io/rzp/u9uuezAh',
};

export default function Deposit({ depositForm, setDepositForm, triggerUPI, handleDeposit }) {
    return (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">डिपॉजिट फंड्स</h3>
                <p className="text-gray-500 text-sm">राशि दर्ज करें और किसी भी UPI ऐप से भुगतान करें।</p>
            </div>
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {[300, 400, 500, 600, 700, 800, 900, 1000].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => {
                                setDepositForm({ ...depositForm, amount: amt.toString() });
                                window.open(DEPOSIT_LINKS[amt], '_blank');
                            }}
                            className="flex-1 min-w-[70px] py-2 bg-purple-50 border-2 border-purple-200 rounded-lg text-purple-700 font-bold hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-sm"
                        >
                            ₹{amt}
                        </button>
                    ))}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">राशि (₹)</label>
                    <input
                        type="number"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                        placeholder="बैलेंस दर्ज करें"
                        value={depositForm.amount}
                        onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
                    />
                </div>
                <button 
                    onClick={triggerUPI}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                >
                    📱 Pay via UPI App (Mobile Only)
                </button>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex flex-col items-center">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">या QR कोड स्कैन करें</p>
                <img src={img3} alt="UPI QR Code" className="w-48 h-48 rounded-lg shadow-inner mb-4 bg-white p-2" />
                <div className="text-center">
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Business UPI ID</p>
                    <p className="text-lg font-mono font-bold text-blue-700">tata.digital@icici</p>
                </div>
            </div>
            <div className="pt-4 border-t border-gray-200 space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600">UTR / Transaction ID (अनिवार्य)</label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                        placeholder="12 अंकों का UTR नंबर"
                        value={depositForm.utr}
                        onChange={(e) => setDepositForm({ ...depositForm, utr: e.target.value })}
                    />
                </div>
                <button onClick={handleDeposit} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                    भुगतान की पुष्टि करें
                </button>
            </div>
        </div>
    );
}