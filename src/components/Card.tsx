"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";

interface CardProps {
    id: string;
    children: React.ReactNode;
    isDragOverlay?: boolean;
    justDropped?: boolean;
    isHoveredOver?: boolean;
    gridSpan?: string;
    isSwapping?: boolean;
    isGrayedOut?: boolean;
    animationDelay?: number;
    isLoaded?: boolean;
    showSkeleton?: boolean;
    hasInitialAnimation?: boolean;
}

const Card: React.FC<CardProps> = ({
    id,
    children,
    isDragOverlay = false,
    justDropped = false,
    isHoveredOver = false,
    gridSpan = "",
    isSwapping = false,
    isGrayedOut = false,
    animationDelay = 0,
    isLoaded = true,
    showSkeleton = false,
    hasInitialAnimation = false,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled: isDragOverlay,
    });

    // Generate random initial animation values (memoized to prevent re-generation)
    const randomValues = useMemo(() => {
        const randomSide = Math.random() > 0.5 ? 1 : -1;
        const randomDelay = Math.random() * 0.8; // 0 to 0.8 seconds
        const randomX = randomSide * (50 + Math.random() * 100); // 50-150px to either side
        const randomRotation = randomSide * (5 + Math.random() * 10); // 5-15 degrees
        const fallHeight = -(200 + Math.random() * 300); // 200-500px above

        return { randomX, randomRotation, fallHeight, randomDelay };
    }, [id]); // Depend on id to ensure each card has unique values

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Different styles for drag overlay vs normal card
    if (isDragOverlay) {
        // Convert gridSpan classes to actual dimensions for the overlay
        const getDragOverlayDimensions = (gridSpan: string) => {
            // Base calculations for 3-column grid with 16px gaps
            const baseWidth = 300; // Approximate width of one column
            const baseHeight = 300; // Approximate height of one row
            const gap = 16; // gap-4 = 16px

            let width = baseWidth; // Default width (col-span-1)
            let height = baseHeight; // Default height (row-span-1)

            if (gridSpan.includes("col-span-2")) width = baseWidth * 2 + gap;
            if (gridSpan.includes("col-span-3")) width = baseWidth * 3 + gap * 2;
            if (gridSpan.includes("row-span-2")) height = baseHeight * 2 + gap;
            if (gridSpan.includes("row-span-3")) height = baseHeight * 3 + gap * 2;

            return { width: `${width}px`, height: `${height}px` };
        }; const dimensions = getDragOverlayDimensions(gridSpan || "");

        return (
            <motion.div
                initial={{ scale: 1, rotate: 0 }}
                animate={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-4xl shadow-2xl cursor-grabbing select-none z-50"
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                }}
            >
                {children}
            </motion.div>
        );
    }

    // Skeleton placeholder when card is being dragged
    if (showSkeleton) {
        return (
            <motion.div
                className={`bg-gray-200 dark:bg-gray-600/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-4xl ${gridSpan}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: [0.4, 0.8, 0.4, 0.8],
                    scale: [0.95, 1.02, 0.98, 1.02],
                    borderColor: [
                        "rgb(209 213 219)", // gray-300
                        "rgb(147 197 253)", // blue-300
                        "rgb(209 213 219)", // gray-300
                        "rgb(147 197 253)"  // blue-300
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            >
                <div className="h-full w-full flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-3 opacity-60">
                        <motion.div
                            className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"
                            animate={{
                                width: ["80px", "60px", "80px"],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2
                            }}
                        />
                        <motion.div
                            className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"
                            animate={{
                                width: ["64px", "48px", "64px"],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.4
                            }}
                        />

                        {/* Floating dots animation to simulate "waiting" */}
                        <div className="flex space-x-1 pt-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                                    animate={{
                                        y: [-2, -6, -2],
                                        opacity: [0.4, 0.8, 0.4]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    const { randomX, randomRotation, fallHeight, randomDelay } = randomValues;

    return (
        <AnimatePresence>
            <motion.div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                layout
                initial={hasInitialAnimation ? {
                    scale: 0.8,
                    y: fallHeight,
                    x: randomX,
                    rotate: randomRotation,
                    opacity: 0
                } : { scale: 1, y: 0 }}
                animate={{
                    scale: isDragging
                        ? 0.95
                        : justDropped
                            ? [1, 1.1, 0.95, 1.02, 1]
                            : isHoveredOver
                                ? 1.05  // Reduced from 1.08 for more subtle effect
                                : isSwapping
                                    ? [1, 0.9, 1.05, 1]
                                    : 1,
                    y: isDragging
                        ? -2
                        : justDropped
                            ? [0, -8, 2, -1, 0]
                            : isHoveredOver
                                ? -2  // Reduced from -4 for more subtle lift
                                : isSwapping
                                    ? [-20, 20, 0]
                                    : 0,
                    x: isSwapping ? [0, 30, -30, 0] : 0,
                    opacity: isDragging ? 0.5 : isSwapping ? [1, 0.8, 1] : 1,
                    rotate: justDropped
                        ? [0, -1, 1, -0.5, 0]
                        : isHoveredOver
                            ? 2
                            : isSwapping
                                ? [0, 8, -8, 0]
                                : 0,
                    boxShadow: isHoveredOver
                        ? "0 15px 30px -10px rgba(59, 130, 246, 0.3)"
                        : isSwapping
                            ? "0 15px 35px -10px rgba(168, 85, 247, 0.5)"
                            : justDropped
                                ? "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
                                : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                }}
                whileHover={{
                    scale: 1.02,
                    y: -2,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                exit={{
                    scale: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3
                    }
                }}
                transition={{
                    type: "spring",
                    stiffness: hasInitialAnimation ? 300 : (justDropped ? 600 : isHoveredOver ? 500 : isSwapping ? 800 : 400),
                    damping: hasInitialAnimation ? 20 : (justDropped ? 15 : isHoveredOver ? 20 : isSwapping ? 25 : 25),
                    delay: hasInitialAnimation ? randomDelay + animationDelay / 1000 : 0,
                    layout: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.4
                    },
                    scale: {
                        duration: hasInitialAnimation ? 0.8 : (justDropped ? 0.6 : isHoveredOver ? 0.3 : isSwapping ? 0.3 : 0.2),
                        times: justDropped ? [0, 0.2, 0.5, 0.8, 1] : isSwapping ? [0, 0.4, 1] : undefined
                    },
                    y: {
                        duration: hasInitialAnimation ? 1.2 : (justDropped ? 0.6 : isHoveredOver ? 0.3 : isSwapping ? 0.3 : 0.2),
                        times: justDropped ? [0, 0.3, 0.7, 0.9, 1] : isSwapping ? [0, 0.5, 1] : undefined
                    },
                    x: {
                        duration: hasInitialAnimation ? 1.2 : (isSwapping ? 0.3 : 0.2),
                        times: isSwapping ? [0, 0.4, 0.7, 1] : undefined
                    },
                    rotate: {
                        duration: hasInitialAnimation ? 1.0 : (justDropped ? 0.6 : isHoveredOver ? 0.3 : isSwapping ? 0.3 : 0.2),
                        times: justDropped ? [0, 0.25, 0.5, 0.75, 1] : isSwapping ? [0, 0.4, 0.8, 1] : undefined
                    },
                    opacity: {
                        duration: hasInitialAnimation ? 0.8 : (isSwapping ? 0.3 : 0.2),
                        times: isSwapping ? [0, 0.5, 1] : undefined
                    },
                    boxShadow: {
                        duration: isHoveredOver ? 0.3 : isSwapping ? 0.3 : 0.2
                    }
                }}
                className={`bg-white dark:bg-gray-800 hover:shadow-xl border rounded-4xl cursor-grab select-none relative
                      ${gridSpan} 
                      ${isDragging ? "z-0" : "z-10"} 
                      ${justDropped ? "shadow-xl" : "shadow-sm"} 
                      ${isHoveredOver
                        ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }
                      transition-all duration-200`}
            >
                {children}

                {/* Grayed out overlay */}
                {isGrayedOut && (
                    <motion.div
                        className="absolute inset-0 bg-white/70 dark:bg-gray-900/60 rounded-4xl pointer-events-none backdrop-blur-[0.5px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                )}

                {/* Enhanced Thud effect for initial landing */}
                {hasInitialAnimation && (
                    <>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-4xl pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.2, 1] }}
                            transition={{
                                duration: 1.0,
                                ease: "easeOut",
                                times: [0, 0.4, 1],
                                delay: randomDelay + animationDelay / 1000 + 1.0
                            }}
                        />

                        {/* Multiple ripple effects for dramatic thud */}
                        <motion.div
                            className="absolute inset-0 border-2 border-emerald-400/40 rounded-4xl pointer-events-none"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0, 0.8, 0], scale: [1, 1.3, 1.6] }}
                            transition={{
                                duration: 1.0,
                                ease: "easeOut",
                                times: [0, 0.3, 1],
                                delay: randomDelay + animationDelay / 1000 + 1.0
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 border border-blue-400/30 rounded-4xl pointer-events-none"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 2.0] }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                times: [0, 0.4, 1],
                                delay: randomDelay + animationDelay / 1000 + 1.1
                            }}
                        />

                        {/* Screen shake effect simulation */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                                x: [0, -1, 1, -1, 1, 0],
                                y: [0, -1, 1, -1, 1, 0]
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                                delay: randomDelay + animationDelay / 1000 + 1.0
                            }}
                        />
                    </>
                )}

                {/* Thud effect */}
                {justDropped && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-4xl pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.1, 1] }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            times: [0, 0.3, 1]
                        }}
                    />
                )}

                {/* Ripple effect for thud */}
                {justDropped && (
                    <motion.div
                        className="absolute inset-0 border-2 border-blue-400/30 rounded-4xl pointer-events-none"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: [0, 0.6, 0], scale: [1, 1.2, 1.4] }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            times: [0, 0.4, 1]
                        }}
                    />
                )}

                {/* Hover over effect */}
                {isHoveredOver && (
                    <motion.div
                        className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500/50 rounded-4xl pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: [0, 1, 0.8],
                            scale: [0.95, 1.02, 1],
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: 0.2
                        }}
                    />
                )}

                {/* Landing effect */}
                <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-4xl pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    key={`${id}-landing-effect`}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default Card;
