import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Socials = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/Sathyam1020',
            lightBg: '#24292e',
            darkBg: '#6b7280',
            lightText: '#24292e',
            darkText: '#6b7280',
            lightIconBg: '#24292e',
            darkIconBg: '#6b7280',
            lightIconText: '#ffffff',
            darkIconText: '#ffffff',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/sathyam-sahu-824946253/',
            lightBg: '#0077b5',
            darkBg: '#0077b5',
            lightText: '#0077b5',
            darkText: '#0077b5',
            lightIconBg: '#0077b5',
            darkIconBg: '#0077b5',
            lightIconText: '#ffffff',
            darkIconText: '#ffffff',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: 'http://x.com/sathyam0110',
            lightBg: '#1da1f2',
            darkBg: '#1da1f2',
            lightText: '#1da1f2',
            darkText: '#1da1f2',
            lightIconBg: '#1da1f2',
            darkIconBg: '#1da1f2',
            lightIconText: '#ffffff',
            darkIconText: '#ffffff',
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:sathyamrock55@gmail.com',
            lightBg: '#ea4335',
            darkBg: '#ea4335',
            lightText: '#ea4335',
            darkText: '#ea4335',
            lightIconBg: '#ea4335',
            darkIconBg: '#ea4335',
            lightIconText: '#ffffff',
            darkIconText: '#ffffff',
        },
    ];

    return (
        <div className="p-3 sm:p-4 h-full">
            <div className='flex flex-col justify-start sm:justify-evenly h-full gap-2 sm:gap-3'>
                {
                    socialLinks.map((social) => {
                        return (
                            <div
                                key={social.name}
                                className={`flex border-2 rounded-2xl px-2 sm:px-3 mx-2 sm:mx-4 py-2 gap-2 items-center justify-start transition-all duration-200 cursor-pointer hover:scale-100 hover:shadow-lg ${social.name === 'GitHub'
                                    ? 'border-gray-800 dark:border-gray-500'
                                    : ''
                                    }`}
                                style={{
                                    borderColor: social.name === 'GitHub' ? undefined : social.lightBg,
                                }}
                                onMouseEnter={(e) => {
                                    if (social.name === 'GitHub') {
                                        const isDark = document.documentElement.classList.contains('dark');
                                        const shadowColor = isDark ? '#6b7280' : '#24292e';
                                        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
                                    } else {
                                        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${social.lightBg}`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                onClick={() => {
                                    window.open(social.url, '_blank');
                                }}
                            >
                                <div
                                    className={`p-2 rounded-md transition-all duration-200 ${social.name === 'GitHub'
                                        ? 'bg-gray-800 dark:bg-gray-500 text-white'
                                        : ''
                                        }`}
                                    style={{
                                        backgroundColor: social.name === 'GitHub' ? undefined : social.lightIconBg,
                                        color: social.name === 'GitHub' ? undefined : social.lightIconText,
                                    }}
                                >
                                    <social.icon className='h-4 w-4 sm:h-5 sm:w-5' />
                                </div>
                                <div
                                    className={`font-medium transition-all duration-200 ${social.name === 'GitHub'
                                        ? 'text-gray-800 dark:text-gray-400'
                                        : 'text-gray-800 dark:text-white'
                                        }`}
                                    style={{
                                        color: social.name === 'GitHub' ? undefined : social.lightText,
                                    }}
                                >
                                    <span className="text-sm sm:text-base">{social.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Socials;
