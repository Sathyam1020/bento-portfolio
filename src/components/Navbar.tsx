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

                .nav-shell {
                    --nav-item-width: 64px;
                    --nav-item-height: 32px;
                    --nav-padding: 6px;
                    padding: var(--nav-padding);
                }

                @media (min-width: 640px) {
                    .nav-shell {
                        --nav-item-width: 84px;
                        --nav-item-height: 36px;
                        --nav-padding: 8px;
                    }
                }
            `}</style>

            <nav className="sticky top-3 sm:top-4 z-50 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-9 mt-1 md:mt-2 lg:mt-3 px-3">
                <div
                    className="nav-shell relative flex items-center bg-[#e2e8f0] dark:bg-gray-700 rounded-full shadow-sm"
                    style={{ ["--nav-index" as any]: getActiveIndex() } as React.CSSProperties}
                >
                    {/* Moving background indicator */}
                    <div
                        className="absolute bg-white dark:bg-gray-600 rounded-2xl shadow-md active-indicator"
                        style={{
                            width: 'var(--nav-item-width)',
                            height: 'var(--nav-item-height)',
                            left: 'calc(var(--nav-padding) + var(--nav-index) * var(--nav-item-width))',
                            top: 'var(--nav-padding)',
                        }}
                    />

                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            style={{
                                width: "var(--nav-item-width)",
                                height: "var(--nav-item-height)",
                            }}
                            className={`relative z-10 px-2 sm:px-3 cursor-pointer rounded-full font-medium transition-all duration-300 ease-out text-xs sm:text-sm text-gray-700 dark:text-gray-200 ${active === item.id
                                    ? ''
                                    : 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="w-px h-5 bg-gray-400 dark:bg-gray-500 mx-2 sm:mx-3" />

                    <button
                        onClick={handleGithubClick}
                        className="relative p-2 sm:p-2.5 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-110 group github-shine"
                        aria-label="Visit GitHub Profile"
                    >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10" />
                    </button>
                </div>
            </nav>
        </>
    );
}
