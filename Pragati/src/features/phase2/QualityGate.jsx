
import React, { useState } from 'react';
import { Camera, Check, X, Upload } from 'lucide-react';

const PENDING_ITEMS = [
    { id: 1, student: "Anjali", type: "Tote Bag", time: "10:30 AM" },
    { id: 2, student: "Priya", type: "Kurti", time: "11:15 AM" },
];

const QualityGate = () => {
    const [scannedItems, setScannedItems] = useState(PENDING_ITEMS);
    const [passedCount, setPassedCount] = useState(142);

    const handleVerdict = (id, verdict) => {
        setScannedItems(prev => prev.filter(item => item.id !== id));
        if (verdict === 'pass') setPassedCount(c => c + 1);
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Stats */}
                <div className="bg-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="text-green-800 font-bold mb-1">Ready Stock</div>
                    <div className="text-4xl font-bold text-green-900">{passedCount}</div>
                    <div className="text-sm text-green-700 mt-2">Units passed QC this month</div>
                </div>

                {/* Upload Action */}
                <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-upay-orange hover:bg-orange-50 hover:text-orange-500 transition-all cursor-pointer h-full">
                    <Camera className="w-8 h-8 mb-2" />
                    <span className="font-bold">Scan / Upload Item</span>
                </div>
            </div>

            <h3 className="font-bold text-gray-800 text-lg">Pending Validation</h3>
            <div className="grid gap-4">
                {scannedItems.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl">No pending items</div>
                ) : (
                    scannedItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-gray-800">{item.type}</div>
                                <div className="text-sm text-gray-500">Stitched by {item.student} • {item.time}</div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleVerdict(item.id, 'fail')}
                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleVerdict(item.id, 'pass')}
                                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QualityGate;
