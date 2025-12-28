
import React from 'react';
import { Download, Eye } from 'lucide-react';

const APPROVED_DESIGNS = [
    { id: 1, name: "Tote Bag (Corporate)", sku: "TB-001", image: "https://images.unsplash.com/photo-1590874102987-9bd2f2f7d26f?auto=format&fit=crop&q=80&w=300&h=300" },
    { id: 2, name: "Laptop Sleeve (13\")", sku: "LS-013", image: "https://images.unsplash.com/photo-1603513492128-ba280510dd55?auto=format&fit=crop&q=80&w=300&h=300" },
    { id: 3, name: "Potli Bag (Festive)", sku: "PB-005", image: "https://images.unsplash.com/photo-1634547902409-775c7554904c?auto=format&fit=crop&q=80&w=300&h=300" },
];

const StandardizationVault = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Standardization Vault</h2>
                <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                    Lijjat Model Approved
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {APPROVED_DESIGNS.map(design => (
                    <div key={design.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="h-48 overflow-hidden bg-gray-100">
                            <img src={design.image} alt={design.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                            <div className="text-xs text-gray-400 font-bold mb-1">{design.sku}</div>
                            <h3 className="font-bold text-lg mb-4">{design.name}</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200">
                                    <Eye className="w-4 h-4" /> View Spec
                                </button>
                                <button className="flex-1 py-2 bg-upay-orange text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-600">
                                    <Download className="w-4 h-4" /> Patterns
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StandardizationVault;
