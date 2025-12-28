
import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

const Sikhana = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Sikhana (SOPs)</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Center Hygiene</h3>
                        <p className="text-gray-500 text-sm mb-4">Daily checklist for cleaning, organizing fabrics, and waste disposal.</p>
                        <div className="text-blue-600 font-bold text-sm">View Checklist -></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer">
                    <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Machine Maintenance</h3>
                        <p className="text-gray-500 text-sm mb-4">Weekly oiling guide and needle replacement protocols.</p>
                        <div className="text-upay-orange font-bold text-sm">View Guide -></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sikhana;
