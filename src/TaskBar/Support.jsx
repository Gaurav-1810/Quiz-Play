import React from 'react';
import img4 from '/public/images/gm.jpeg';

export default function Support() {
    return (
        <div className="p-10 border-2 border-dashed border-gray-300 text-center text-red-600 text-2xl italic">
            <p>For support, please contact our team @GauravMehra.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <a href="https://t.me/+FfSnwVbqsFU5MWFl" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 not-italic text-lg flex items-center gap-2">
                    ✈️ Telegram Channel 1
                </a>
                <a href="https://t.me/+FfSnwVbqsFU5MWFl" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 not-italic text-lg flex items-center gap-2">
                    ✈️ Telegram Channel 2
                </a>
            </div>
            <img src={img4} alt="Support" className="w-40 h-40 rounded-lg shadow-md mx-auto mt-4" />
        </div>
    );
}