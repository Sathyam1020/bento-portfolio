'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    gradient?: string;
}

const ProjectCard = ({
    title,
    description,
    image,
    technologies,
    githubUrl,
    liveUrl,
    gradient = 'from-blue-500 to-purple-600'
}: ProjectCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <TooltipProvider>
            <div className="group p-4 h-full w-full overflow-hidden rounded-4xl relative">
                <div className="relative h-full flex flex-col">
                    {/* Project Image */}
                    <div className="image-container relative h-40 overflow-hidden rounded-xl bg-muted/20 group/image">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />

                        {/* Skeleton */}
                        {(imageLoading || !image || imageError) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted/80 animate-pulse transition-all duration-300">
                                <div className="text-muted-foreground text-sm font-medium">Loading Preview...</div>
                            </div>
                        )}

                        {!imageError && image && (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-all duration-300 group-hover/image:scale-105 group-hover/image:blur-sm"
                                onError={() => setImageError(true)}
                                onLoad={() => setImageLoading(false)}
                            />
                        )}

                        {/* Top Left Github & Live Buttons */}
                        {(githubUrl || liveUrl) && (
                            <div className="absolute top-3 left-3 flex gap-2 z-20 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                                {githubUrl && (
                                    <a
                                        href={githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground border border-border/50 backdrop-blur-sm transition-all hover:bg-background hover:border-border hover:scale-110 transform translate-y-2 group-hover/image:translate-y-0"
                                    >
                                        <Github size={16} />
                                    </a>
                                )}
                                {liveUrl && (
                                    <a
                                        href={liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground border border-border/50 backdrop-blur-sm transition-all hover:bg-background hover:border-border hover:scale-110 transform translate-y-2 group-hover/image:translate-y-0"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
                            {title}
                        </h3>

                        {/* Description with Tooltip */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 cursor-help">
                                    {description}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs bg-popover text-popover-foreground border border-border/50 shadow-lg">
                                <span>{description}</span>
                            </TooltipContent>
                        </Tooltip>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1">
                            {technologies.slice(0, 2).map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                            {technologies.length > 2 && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium cursor-help hover:bg-secondary/80 transition-colors">
                                            +{technologies.length - 2}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs bg-popover text-popover-foreground border border-border/50 shadow-lg">
                                        <div className="text-sm">
                                            <div className="font-semibold mb-2 text-popover-foreground">All Technologies:</div>
                                            <div className="flex flex-wrap gap-1">
                                                {technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 text-xs rounded-md bg-secondary/60 text-secondary-foreground font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </div>

                    {/* Hover effect overlay (non-blocking) */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5 rounded-xl pointer-events-none`}
                    />
                </div>
            </div>
        </TooltipProvider>
    );
};

export default ProjectCard;
