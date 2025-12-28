
import React from 'react';
import { Quote } from 'lucide-react';

const STORIES = [
    {
        id: 1,
        name: "Laxmi Monitor",
        role: "Production Lead at 22",
        quote: "Earlier I was just a girl from the basti. Now I handle orders worth ₹50k.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 2,
        name: "Rinki Didi",
        role: "Quality Checker",
        quote: "My signature on the tag means the product is perfect. That respect matters.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

const MotivationWall = () => {
    return (
        <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h2 className="text-2xl font-bold text-upay-orange mb-2">Identity over Income</h2>
                <p className="text-gray-600">Your skill is your power. See how others have transformed their lives.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {STORIES.map(story => (
                    <div key={story.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex gap-4">
                        <img src={story.image} alt={story.name} className="w-24 h-24 rounded-xl object-cover" />
                        <div>
                            <div className="flex text-upay-orange mb-2">
                                <Quote className="w-5 h-5 fill-current" />
                            </div>
                            <p className="text-gray-600 text-sm italic mb-4">"{story.quote}"</p>
                            <h3 className="font-bold text-gray-800">{story.name}</h3>
                            <div className="text-xs text-upay-orange font-bold uppercase tracking-wider">{story.role}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MotivationWall;
