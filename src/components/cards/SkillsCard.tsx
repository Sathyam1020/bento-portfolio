'use client';

import SkillsAnimation from '@/components/cards/CatAnimation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import {
  DiCss3,
  DiGit,
  DiGithub,
  DiGo,
  DiJqueryLogo,
  DiJsBadge,
  DiNodejs,
  DiPostgresql,
  DiReact,
  DiSass,
  DiSwift,
} from 'react-icons/di';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { SiExpress } from 'react-icons/si';


const techStackData = [
  {
    id: 1,
    title: 'JavaScript',
    icons: <DiJsBadge className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-yellow-400',
  },
  {
    id: 2,
    title: 'TypeScript',
    icons: <BiLogoTypescript className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-blue-600',
  },
  {
    id: 3,
    title: 'React JS',
    icons: <DiReact className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-cyan-500',
  },
  {
    id: 4,
    title: 'Next JS',
    icons: <RiNextjsFill className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-gray-800 dark:bg-gray-600',
  },
  {
    id: 5,
    title: 'Tailwind',
    icons: <RiTailwindCssFill className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-sky-500',
  },
  {
    id: 6,
    title: 'Node JS',
    icons: <DiNodejs className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-green-600',
  },
  {
    id: 7,
    title: 'Express JS',
    icons: <SiExpress className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-cyan-700',
  },
  {
    id: 8,
    title: 'PostgreSQL',
    icons: <DiPostgresql className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-orange-500',
  },
  {
    id: 9,
    title: 'GIT',
    icons: <DiGithub className="text-white opacity-100 group-hover:opacity-0 transition-opacity duration-200" />,
    color: 'text-white',
    background: 'bg-red-500',
  },
];
  const SkillsCard = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex h-full flex-col-reverse md:flex-row lg:flex-row p-6">
      <div className="grid flex-1 grid-cols-3 gap-2 sm:grid-rows-3">
        {isMounted &&
          techStackData.map((item, i) => (
            <div
              key={item.id}
              className="group flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={cn(
                  'flex cursor-default items-center justify-center rounded-xl p-5 group-hover:bg-opacity-25 group-hover:shadow-xl group-hover:[mask-image:radial-gradient(ellipse_at_center,white,transparent)]',
                  item.background,
                  item.color,
                )}
              >
                <div className="text-4xl">{item.icons}</div>
              </motion.div>
              <span
                className={`absolute rounded-xl px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
              >
                {item.title}
              </span>
            </div>
          ))}
      </div>
      <div className="h-full flex-1">
        <div
          className="flex h-full items-center justify-center"
          aria-hidden="true"
        >
          <SkillsAnimation />
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;