
import React, { useState } from 'react';
import { User, Monitor } from 'lucide-react';

const MACHINES = [
    { id: 'M1', name: 'Juki Single' },
    { id: 'M2', name: 'Juki Single' },
    { id: 'M3', name: 'Jack A4' },
    { id: 'M4', name: 'Overlock' },
];

const SLOTS = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const MachineScheduler = () => {
    // State: { "M1-10:00": "Student Name" }
    const [bookings, setBookings] = useState({
        "M1-10:00": "Anjali",
        "M2-10:00": "Priya",
        "M1-11:00": "Anjali"
    });

    const handleCellClick = (machineId, slot) => {
        const key = `${machineId}-${slot}`;
        const current = bookings[key];

        if (current) {
            // Unbook
            const newBookings = { ...bookings };
            delete newBookings[key];
            setBookings(newBookings);
        } else {
            // Book (Simulated Input)
            const name = prompt("Enter Student Name for " + slot + ":");
            if (name) {
                setBookings(prev => ({ ...prev, [key]: name }));
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Machine Scheduler</h2>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300"></div> Available</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-upay-orange"></div> Booked</div>
                </div>
            </div>

            {/* Scroll Container */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <div className="min-w-[800px]"> {/* Force width to ensure scroll on mobile */}
                    <div className="grid grid-cols-[150px_repeat(8,1fr)] gap-2">
                        {/* Header Row */}
                        <div className="p-3 font-bold text-gray-400">Time / Machine</div>
                        {SLOTS.map(slot => (
                            <div key={slot} className="p-3 text-center font-bold text-gray-600 bg-gray-50 rounded-lg">
                                {slot}
                            </div>
                        ))}

                        {/* Machine Rows */}
                        {MACHINES.map(machine => (
                            <React.Fragment key={machine.id}>
                                <div className="p-3 font-bold text-gray-700 flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-gray-400" />
                                    {machine.name}
                                </div>
                                {SLOTS.map(slot => {
                                    const key = `${machine.id}-${slot}`;
                                    const bookedBy = bookings[key];
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => handleCellClick(machine.id, slot)}
                                            className={`
                                                h-12 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all
                                                ${bookedBy
                                                    ? 'bg-upay-orange text-white hover:bg-orange-600'
                                                    : 'bg-gray-50 text-gray-300 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                                }
                                            `}
                                        >
                                            {bookedBy || '+'}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-xs text-gray-400 text-center md:hidden">Swipe left/right to view full schedule</p>
        </div>
    );
};

export default MachineScheduler;
