
import React from 'react';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

const COLUMNS = [
    { id: 'new', title: 'New Orders', color: 'bg-blue-50 text-blue-700', icon: Package },
    { id: 'stitching', title: 'In Stitching', color: 'bg-orange-50 text-orange-700', icon: Clock },
    { id: 'qc', title: 'Quality Check', color: 'bg-purple-50 text-purple-700', icon: CheckCircle2 },
    { id: 'dispatched', title: 'Dispatched', color: 'bg-green-50 text-green-700', icon: Truck },
];

const ORDERS = [
    { id: 101, client: "FabIndia", item: "Kurti", quantity: 500, due: "20 Dec", status: "stitching" },
    { id: 102, client: "Local Mela", item: "Tote Bag", quantity: 200, due: "25 Dec", status: "qc" },
    { id: 103, client: "Corporate Gift", item: "Laptop Sleeve", quantity: 50, due: "30 Dec", status: "new" },
];

const BulkOrderBoard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bulk Order Management</h2>

            <div className="grid md:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {COLUMNS.map(col => (
                    <div key={col.id} className="min-w-[250px] bg-gray-50 rounded-xl p-4 flex flex-col h-full">
                        <div className={`p-3 rounded-lg flex items-center gap-2 font-bold mb-4 ${col.color}`}>
                            <col.icon className="w-5 h-5" />
                            {col.title}
                        </div>

                        <div className="space-y-3 flex-1">
                            {ORDERS.filter(o => o.status === col.id).map(order => (
                                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-grab hover:shadow-md transition-all">
                                    <div className="text-xs text-gray-400 font-bold mb-1">#{order.id} • Due {order.due}</div>
                                    <h4 className="font-bold text-gray-800">{order.client}</h4>
                                    <div className="text-sm text-gray-600 mt-1">{order.quantity} Units • {order.item}</div>
                                </div>
                            ))}
                            {ORDERS.filter(o => o.status === col.id).length === 0 && (
                                <div className="text-center text-gray-300 text-sm py-8 border-2 border-dashed border-gray-200 rounded-xl">Empty</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BulkOrderBoard;
