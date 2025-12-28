
import React, { useState } from 'react';
import { useMaturity } from '../context/MaturityContext';
import {
    User, CheckSquare, Calendar, ShieldCheck,
    Users, Layers, Award, BarChart3, Lock,
    Menu, X
} from 'lucide-react';

const ATTRIBUTES = {
    1: { name: 'Aarambh', color: 'bg-orange-100 text-orange-800', next: 'Saksham' },
    2: { name: 'Saksham', color: 'bg-blue-100 text-blue-800', next: 'Atmanirbhar' },
    3: { name: 'Atmanirbhar', color: 'bg-green-100 text-green-800', next: 'Scale' },
};

const DashboardLayout = ({ children, activeTab, onTabChange }) => {
    const { phase, score, resetSurvey, debugSetSurvey } = useMaturity();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const phaseAttr = ATTRIBUTES[phase] || ATTRIBUTES[1];
    const progress = Math.min(100, (score / 100) * 100); // Simple progress calculation

    const MENU_ITEMS = [
        { id: 'dashboard', label: 'Dashboard', icon: User, phase: 1 },
        { id: 'motivation', label: 'Motivation Wall', icon: Award, phase: 1 },
        { id: 'attendance', label: 'Haziri (Attendance)', icon: CheckSquare, phase: 1 },
        { id: 'scheduler', label: 'Machine Scheduler', icon: Calendar, phase: 1 },
        { id: 'sikhana', label: 'Sikhana (SOPs)', icon: Layers, phase: 1 },

        // Phase 2
        { id: 'quality', label: 'Quality Gate', icon: ShieldCheck, phase: 2 },
        { id: 'squad', label: 'Sakhi Squad', icon: Users, phase: 2 },
        { id: 'vault', label: 'Design Vault', icon: Layers, phase: 2 },

        // Phase 3
        { id: 'orders', label: 'Bulk Orders', icon: Layers, phase: 3 },
        { id: 'payroll', label: 'Payroll Ledger', icon: BarChart3, phase: 3 },
    ];

    return (
        <div className="flex h-screen bg-upay-bg">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-upay-orange">UPAY <span className="text-upay-text">Pragati</span></h1>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
                    {MENU_ITEMS.map(item => {
                        const isLocked = phase < item.phase;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (!isLocked) {
                                        onTabChange(item.id);
                                        setSidebarOpen(false);
                                    }
                                }}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-upay-orange text-white shadow-lg shadow-orange-200'
                                        : isLocked
                                            ? 'text-gray-400 cursor-not-allowed opacity-60'
                                            : 'text-gray-600 hover:bg-orange-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {isLocked && <Lock className="w-4 h-4" />}
                            </button>
                        );
                    })}

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Debug Tools</div>
                        <button onClick={resetSurvey} className="text-xs text-red-500 hover:underline">Reset Progress</button>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => debugSetSurvey({ revenue: 10, product: 10, attendance: 20, machines: 20, customers: 10 })} className="px-2 py-1 bg-gray-100 text-xs rounded">Force Ph2</button>
                            <button onClick={() => debugSetSurvey({ revenue: 20, product: 20, attendance: 20, machines: 20, customers: 20 })} className="px-2 py-1 bg-gray-100 text-xs rounded">Force Ph3</button>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="bg-white p-4 lg:p-6 shadow-sm flex items-center justify-between">
                    <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1 ml-4 lg:ml-0">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm text-gray-400 font-medium">Current Level</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${phaseAttr.color}`}>
                                {phaseAttr.name}
                            </span>
                        </div>
                        {phase < 3 && (
                            <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full mt-2">
                                <div
                                    className="bg-upay-orange h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                />
                                <div className="text-[10px] text-gray-400 text-right mt-1">To {phaseAttr.next}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block text-right">
                            <div className="font-bold text-sm">Noida Center</div>
                            <div className="text-xs text-gray-400">Coordinator</div>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
