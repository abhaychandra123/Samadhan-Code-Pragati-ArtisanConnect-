
import React from 'react';
import { IndianRupee, Download } from 'lucide-react';

const LEDGER = [
    { name: "Anjali Sharma", id: "UPAY-001", pieces: 45, rate: 20, bonus: 500, total: 1400 },
    { name: "Priya Verma", id: "UPAY-002", pieces: 60, rate: 20, bonus: 0, total: 1200 },
    { name: "Suman Devi", id: "UPAY-003", pieces: 30, rate: 15, bonus: 0, total: 450 },
];

const PayrollLedger = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Payroll Ledger</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-bold">
                    <Download className="w-4 h-4" /> Export Excel
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Staff Name</th>
                            <th className="p-4 text-center">Approved Pieces</th>
                            <th className="p-4 text-center">Rate/Pc</th>
                            <th className="p-4 text-center">Performance Bonus</th>
                            <th className="p-4 text-right">Total Payout</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {LEDGER.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800">{row.name}</div>
                                    <div className="text-xs text-gray-400">{row.id}</div>
                                </td>
                                <td className="p-4 text-center font-medium text-gray-600">{row.pieces}</td>
                                <td className="p-4 text-center text-gray-500">₹{row.rate}</td>
                                <td className="p-4 text-center text-green-600 font-bold">{row.bonus > 0 ? `+₹${row.bonus}` : '-'}</td>
                                <td className="p-4 text-right font-bold text-gray-800">₹{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50 font-bold text-gray-800">
                        <tr>
                            <td colSpan={4} className="p-4 text-right">Total Payout</td>
                            <td className="p-4 text-right text-lg text-upay-orange">₹3,050</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PayrollLedger;
