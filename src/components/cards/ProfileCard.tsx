"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, DownloadCloudIcon } from "lucide-react";
import Image from "next/image";

export const ProfileCard = () => {
  return (
    <div className="text-black dark:text-white rounded-4xl p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[220px] h-full w-full">
      <div className="flex flex-col sm:flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl">
        <Image
          src="/images/portfolioImage.webp"
          alt="Sathyam Sahu"
          width={144}
          height={144}
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 144px, (min-width: 768px) 128px, (min-width: 640px) 96px, 80px"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover flex-shrink-0"
        />

        <div className="text-center md:text-left flex-1">
          <p className="text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed">
            Hi I'm <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold">Sathyam</span>, a dedicated Full Stack Developer with a journey spanning two vibrant years in the dynamic realm of web development.
          </p>
        </div>
      </div>
      <div>
        <Button
          className="group mt-3 rounded-full shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={async () => {
            try {
              // Download resume functionality
              const link = document.createElement('a');
              link.href = '/finalResume.pdf';
              link.download = 'Sathyam_Resume.pdf';
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } catch (error) {
              console.error('Error downloading resume:', error);
              window.open('/finalResume.pdf', '_blank');
            }
          }}
        >
          <div className="flex items-center gap-2">
            <span>Download Resume</span>

            {/* Icon container with smooth transition */}
            <div className="relative w-4 h-4 overflow-hidden">
              {/* ArrowRight icon - visible by default, hidden on hover */}
              <ArrowRight
                className="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out 
                           group-hover:opacity-0 group-hover:translate-x-2"
              />

              {/* DownloadCloudIcon - hidden by default, visible on hover */}
              <DownloadCloudIcon
                className="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out 
                           opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};
