"use client";

import { Github } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
    onFilterChange: (filter: string) => void;
}

export default function Navbar({ onFilterChange }: NavbarProps) {
    const [active, setActive] = useState('all');

    const navItems = [
        { id: 'all', label: 'All' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' }
    ];

    const handleItemClick = (item: string) => {
        setActive(item);
        onFilterChange(item);
    };

    const handleGithubClick = () => {
        window.open('https://github.com/Sathyam1020', '_blank');
    };

    const getActiveIndex = () => navItems.findIndex(item => item.id === active);

    return (
        <>
            <style jsx>{`
                @keyframes shine-sweep {
                    0% {
                        left: -100%;
                    }
                    100% {
                        left: 100%;
                    }
                }

                .github-shine {
                    position: relative;
                    overflow: hidden;
                }

                .github-shine::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        90deg, 
                        transparent, 
                        rgba(255, 255, 255, 0.6), 
                        transparent
                    );
                    animation: shine-sweep 2s ease-in-out infinite;
                    border-radius: 50%;
                }

                .dark .github-shine::before {
                    background: linear-gradient(
                        90deg, 
                        transparent, 
                        rgba(255, 255, 255, 0.3), 
                        transparent
                    );
                }

                .active-indicator {
                    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
                }
            `}</style>

            <nav className="sticky top-4 z-50 flex items-center justify-center mb-6 md:mb-8 lg:mb-9 mt-1 md:mt-2 lg:mt-3">
                <div className="relative flex items-center bg-[#e2e8f0] dark:bg-gray-700 rounded-full p-2 shadow-sm">
                    {/* Moving background indicator */}
                    <div
                        className="absolute bg-white dark:bg-gray-600 rounded-2xl shadow-md active-indicator"
                        style={{
                            width: '84px',
                            height: '36px',
                            left: `${8 + getActiveIndex() * 84}px`,
                            top: '8px',
                        }}
                    />

                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`relative z-10 px-3 py-2 cursor-pointer rounded-full font-medium transition-all duration-300 ease-out text-sm w-[84px] text-gray-700 dark:text-gray-200 ${active === item.id
                                    ? ''
                                    : 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="w-px h-5 bg-gray-400 dark:bg-gray-500 mx-2" />

                    <button
                        onClick={handleGithubClick}
                        className="relative p-2 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-110 group github-shine"
                        aria-label="Visit GitHub Profile"
                    >
                        <Github className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10" />
                    </button>
                </div>
            </nav>
        </>
    );
}