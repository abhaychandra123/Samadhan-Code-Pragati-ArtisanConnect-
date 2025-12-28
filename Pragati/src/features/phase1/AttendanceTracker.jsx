
import React, { useState } from 'react';
import { Check, X, Clock, BookOpen } from 'lucide-react';

const STUDENTS = [
    { id: 1, name: 'Anjali Sharma', enrolled: 'Bat-1' },
    { id: 2, name: 'Priya Verma', enrolled: 'Bat-1' },
    { id: 3, name: 'Suman Devi', enrolled: 'Bat-2' },
    { id: 4, name: 'Radha Kumari', enrolled: 'Bat-2' },
    { id: 5, name: 'Kiran Yadav', enrolled: 'Bat-1' },
];

const AttendanceTracker = () => {
    // State: { [id]: { present: bool, activity: 'learning' | 'timepass' } }
    const [attendance, setAttendance] = useState({});

    const togglePresence = (id) => {
        setAttendance(prev => {
            const current = prev[id] || { present: false, activity: 'learning' };
            return { ...prev, [id]: { ...current, present: !current.present } };
        });
    };

    const toggleActivity = (id) => {
        setAttendance(prev => {
            const current = prev[id];
            if (!current?.present) return prev;
            return {
                ...prev,
                [id]: {
                    ...current,
                    activity: current.activity === 'learning' ? 'timepass' : 'learning'
                }
            };
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Haziri (Smart Attendance)</h2>
                <div className="text-sm text-gray-500">{new Date().toDateString()}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Student Name</th>
                            <th className="p-4 text-center">Present?</th>
                            <th className="p-4 text-center">Activity Focus</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {STUDENTS.map(student => {
                            const status = attendance[student.id] || { present: false, activity: 'learning' };
                            return (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-700">{student.name}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => togglePresence(student.id)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${status.present
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-gray-100 text-gray-300 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status.present ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                        </button>
                                    </td>
                                    <td className="p-4 flex justify-center">
                                        {status.present ? (
                                            <button
                                                onClick={() => toggleActivity(student.id)}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${status.activity === 'learning'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >
                                                {status.activity === 'learning'
                                                    ? <><BookOpen className="w-4 h-4" /> Learning</>
                                                    : <><Clock className="w-4 h-4" /> Timepass</>
                                                }
                                            </button>
                                        ) : (
                                            <span className="text-gray-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTracker;
