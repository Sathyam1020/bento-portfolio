"use client";

import Card from "@/components/Card";
import ExperienceCard from "@/components/cards/ExperienceCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import ProjectCard from "@/components/cards/ProjectCard";
import SkillsCard from "@/components/cards/SkillsCard";
import Socials from "@/components/cards/Socials";
import { ThemeToggle } from "@/components/cards/ThemeToggle";
import { projectsData } from "@/data/projects";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";

// Custom collision detection that requires significant overlap
const customCollisionDetection = (args: any) => {
    const { droppableContainers, draggableNodes, collisionRect } = args;

    const collisions = [];

    for (const container of droppableContainers) {
        const { id, rect, data } = container;
        const containerRect = rect.current;

        if (!containerRect) continue;

        // Calculate overlap area
        const overlapX = Math.max(0, Math.min(collisionRect.right, containerRect.right) - Math.max(collisionRect.left, containerRect.left));
        const overlapY = Math.max(0, Math.min(collisionRect.bottom, containerRect.bottom) - Math.max(collisionRect.top, containerRect.top));
        const overlapArea = overlapX * overlapY;

        // Calculate percentage of overlap relative to the smaller rectangle
        const collisionArea = collisionRect.width * collisionRect.height;
        const containerArea = containerRect.width * containerRect.height;
        const smallerArea = Math.min(collisionArea, containerArea);
        const overlapPercentage = overlapArea / smallerArea;

        // Only consider it a collision if there's at least 30% overlap
        if (overlapPercentage > 0.3) {
            collisions.push({
                id,
                data: { droppableContainer: container, value: overlapPercentage }
            });
        }
    }

    // Sort by overlap percentage (highest first)
    return collisions.sort((a, b) => b.data.value - a.data.value);
};

interface CardData {
    id: string;
    render: () => React.ReactNode;
    gridSpan: string;
    cardGridSpan: string;
    category: "about" | "projects" | "all";
}

interface DragDropContainerProps {
    activeFilter: string;
}

const DragDropContainer = ({ activeFilter }: DragDropContainerProps) => {
    const cardDefinitions = useMemo<CardData[]>(
        () => [
            {
                id: "1",
                render: () => <ProfileCard />,
                gridSpan: "col-span-2 row-span-1",
                cardGridSpan: "col-span-2 row-span-1",
                category: "about",
            },
            {
                id: "2",
                render: () => <ThemeToggle />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "all",
            },
            {
                id: "3",
                render: () => <Socials />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "about",
            },
            {
                id: "4",
                render: () => <SkillsCard />,
                gridSpan:
                    "col-span-2 row-span-2 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
                cardGridSpan: "col-span-2 row-span-1",
                category: "about",
            },
            {
                id: "5",
                render: () => <ExperienceCard />,
                gridSpan:
                    "col-span-2 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
                cardGridSpan: "col-span-1 row-span-2",
                category: "about",
            },
            // Project Cards
            {
                id: "6",
                render: () => <ProjectCard {...projectsData[0]} />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "projects",
            },
            {
                id: "7",
                render: () => <ProjectCard {...projectsData[1]} />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "projects",
            },
            {
                id: "8",
                render: () => <ProjectCard {...projectsData[2]} />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "projects",
            },
            {
                id: "9",
                render: () => <ProjectCard {...projectsData[3]} />,
                gridSpan:
                    "col-span-2 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
                cardGridSpan: "col-span-1 row-span-1",
                category: "projects",
            },
        ],
        []
    );

    // Loading state for initial animation
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize loaded state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            // Start initial animation after a short delay (only if not played before)
            const hasPlayed = sessionStorage.getItem('initialAnimationPlayed');
            if (!hasPlayed) {
                setTimeout(() => {
                    setHasPlayedInitialAnimation(true);
                    sessionStorage.setItem('initialAnimationPlayed', 'true');
                }, 100);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Filter and sort cards based on active filter
    const cardById = useMemo(() => {
        return new Map(cardDefinitions.map((card) => [card.id, card]));
    }, [cardDefinitions]);

    const filteredAndSortedIds = useMemo(() => {
        if (activeFilter === "all") {
            return cardDefinitions.map((card) => card.id);
        }

        const matchingCards = cardDefinitions.filter(
            (card) => card.category === activeFilter
        );
        const otherCards = cardDefinitions.filter(
            (card) => card.category !== activeFilter
        );

        return [...matchingCards, ...otherCards].map((card) => card.id);
    }, [cardDefinitions, activeFilter]);

    const [cards, setCards] = useState<string[]>(() =>
        cardDefinitions.map((card) => card.id)
    );
    const [activeId, setActiveId] = useState<string | null>(null);
    const [justDropped, setJustDropped] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    const [swappingToPosition, setSwappingToPosition] = useState<string | null>(null);
    const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);

    // Store initial animation played state in sessionStorage to prevent replay on hot reload
    useEffect(() => {
        const hasPlayed = sessionStorage.getItem('initialAnimationPlayed');
        if (hasPlayed) {
            setHasPlayedInitialAnimation(true);
        }
    }, []);

    // Update cards when filter changes
    useEffect(() => {
        setCards(filteredAndSortedIds);
    }, [filteredAndSortedIds]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 25, // Increased from 8 to require more deliberate movement
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        setJustDropped(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over, active } = event;

        // Only set overId if we have a valid over target that's different from active
        if (over && over.id !== active.id) {
            setOverId(over.id as string);
        } else {
            setOverId(null);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Only perform swap if:
        // 1. We have a valid drop target
        // 2. The drop target is different from the dragged item
        // 3. The drop target was being hovered over (to ensure deliberate action)
        if (over && active.id !== over.id && overId === over.id) {
            const oldIndex = cards.findIndex((cardId) => cardId === active.id);
            const newIndex = cards.findIndex((cardId) => cardId === over.id);

            // Set the target card to animate to the dragged card's old position
            setSwappingToPosition(over.id as string);

            // Immediately swap the array positions
            setCards(arrayMove(cards, oldIndex, newIndex));

            // Trigger thud animation for the dropped card
            setJustDropped(active.id as string);

            // Clear animations after they complete
            setTimeout(() => {
                setJustDropped(null);
                setSwappingToPosition(null);
            }, 400);
        }

        setActiveId(null);
        setOverId(null);
    }; return (
        <DndContext
            sensors={sensors}
            collisionDetection={customCollisionDetection} // Using custom collision detection for better control
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={cards}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 auto-rows-[300px]">
                    {cards.map((cardId, index) => {
                        const card = cardById.get(cardId);
                        if (!card) return null;

                        const isGrayedOut =
                            activeFilter !== "all" && card.category !== activeFilter;
                        const isDraggedCard = activeId === card.id;
                        const showSkeleton = isDraggedCard && activeId !== null;

                        return (
                            <Card
                                key={card.id}
                                id={card.id}
                                justDropped={justDropped === card.id}
                                isHoveredOver={overId === card.id && activeId !== card.id}
                                gridSpan={card.gridSpan}
                                isSwapping={swappingToPosition === card.id}
                                isGrayedOut={isGrayedOut}
                                animationDelay={index * 150}
                                isLoaded={isLoaded}
                                showSkeleton={showSkeleton}
                                hasInitialAnimation={!hasPlayedInitialAnimation && isLoaded}
                            >
                                {card.render()}
                            </Card>
                        );
                    })}
                </div>
            </SortableContext>

            <DragOverlay>
                {activeId ? (
                    <Card
                        id={activeId}
                        isDragOverlay
                        gridSpan={cardById.get(activeId)?.cardGridSpan}
                    >
                        {cardById.get(activeId)?.render()}
                    </Card>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragDropContainer;
