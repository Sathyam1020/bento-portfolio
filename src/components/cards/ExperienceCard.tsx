'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {};

const experienceList = [
    {
        id: 1,
        role: "Product Engineering Intern",
        company: "Proof-of-Skill",
        location: "Bengaluru, Karnataka",
        duration: "Feb 2025 - Jun 2025",
        description: "Contributed to the development and maintenance of 4 different application dashboards, focusing on improving UI/UX, responsiveness, and integrating modern design patterns. Worked closely with backend teams and product managers to fix critical bugs, optimize component rendering, and improve overall app stability. Designed and implemented a new app flow that doubled the POS issuance rate, improving user completion times and overall engagement.",
        current: true,
        technologies: ["React.js", "Next.js", "Tailwind CSS", "API Integration"]
    },
    {
        id: 2,
        role: "Front End Developer Intern",
        company: "HSPM Solutions",
        location: "Remote",
        duration: "Jun 2023 - Jul 2023",
        description: "Assisted in development of the front end of a landing page using ReactJs and Tailwind CSS. Collaborated with team members using version control systems such as Git to organize modifications and assign tasks.",
        technologies: ["React.js", "Tailwind CSS", "Git"]
    }
];

const Experience = (props: Props) => {

    return (
        <ScrollArea className='h-full p-6 overflow-scroll'>
            {experienceList?.map((item, i) => (
                <div key={item.id} className={`group relative pl-6 ${i > 0 ? '' : ''}`}>
                    <div className="flex flex-col mb-1 sm:mb-0">
                        <span className='text-md font-semibold text-foreground'>{item.role}</span>
                        <span className='w-fit py-0.5 font-semibold bg-primary text-xs rounded-full text-primary-foreground px-5'>
                            {item.duration}
                        </span>
                    </div>
                    <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-border before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-background after:bg-primary group-last:before:hidden">
                        <time className="mt-1 left-0 mb-1 inline-flex h-5 w-36 translate-y-0.5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold uppercase text-secondary-foreground">
                            {item.location}
                        </time>
                        <div className="text-xs mt-1 font-light text-muted-foreground">
                            {item.company}
                        </div>
                    </div>
                    <p className="text-sm mb-3 text-gray-700 dark:text-gray-400">{item.description}</p>
                </div>
            ))}
        </ScrollArea>
    );
};

export default Experience;