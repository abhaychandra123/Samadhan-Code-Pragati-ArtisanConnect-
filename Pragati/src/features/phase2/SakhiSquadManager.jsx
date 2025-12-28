
import React, { useState } from 'react';
import { Users, Star, Trophy } from 'lucide-react';

const SQUADS = [
    {
        id: 1,
        name: "Durga Squad",
        members: ["Anjali", "Priya", "Suman", "Rekha", "Kiran"],
        score: 9.8,
        color: "bg-pink-100 text-pink-700"
    },
    {
        id: 2,
        name: "Laxmi Squad",
        members: ["Radha", "Meena", "Tanu", "Preeti", "Sunita"],
        score: 8.5,
        color: "bg-purple-100 text-purple-700"
    }
];

const SakhiSquadManager = () => {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Sakhi Squads</h2>
                    <p className="text-blue-700 max-w-md">Group Liability Model: If one fails, the squad fails. If one succeeds, the squad wins.</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {SQUADS.map(squad => (
                    <div key={squad.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-bold text-sm ${squad.color}`}>
                            {squad.score} / 10
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            {squad.name}
                        </h3>

                        <div className="space-y-3">
                            {squad.members.map((member, i) => (
                                <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50">
                                    <span className="font-medium text-gray-700">{member}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className="w-3 h-3 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
                            Manage Squad Attributes
                        </button>
                    </div>
                ))}

                {/* Create New Squad */}
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 min-h-[300px] hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl font-bold">+</div>
                    <span className="font-bold">Form New Squad</span>
                </div>
            </div>
        </div>
    );
};

export default SakhiSquadManager;
