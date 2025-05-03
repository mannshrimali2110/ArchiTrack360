import { useState } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const teamMembers = [
        {
            name: 'MANYA SINGH',
            role: 'FRONTEND DEVELOPER / DOCUMENTATION',
            image: 'https://static.vecteezy.com/system/resources/previews/006/369/559/non_2x/have-a-look-at-this-editable-flat-illustration-of-cloud-database-vector.jpg'
        },
        {
            name: 'MANN SHRIMALI',
            role: 'BACKEND DEVELOPER / DATABASE DESIGN',
            image: 'https://cdn.icon-icons.com/icons2/3951/PNG/512/developer_software_icon_251042.png'
        },
        {
            name: 'MONIKA GAUTAM',
            role: 'FRONTEND DEVELOPER / TESTER',
            image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/207470107/original/f5b750fbdde9c44a8930a5d472a763463fed21db/ser-tu-programador-personal.jpg'
        }
    ];

    return (
        <div className="min-h-screen  from-[#00649f]  text-gray-200 p-10 overflow-y-auto font-sans">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                {/* About Section */}
                <div className="bg-[#1e293b] shadow-lg rounded-2xl p-10 mb-10 border border-[#334155]">
                    <h1 className="text-4xl font-bold !text-[#2dd4bf] mb-6 text-center">About ArchiTrack360</h1>
                    <p className="mb-4 text-lg text-gray-300">
                        ArchiTrack360 is a comprehensive inventory and employee management system designed to streamline operations for businesses. It offers a user-friendly interface and a wide range of functionalities to help organizations manage their resources efficiently.
                    </p>
                </div>


                {/* Features Section */}
                <div className="bg-[#1e293b] shadow-lg rounded-2xl p-10 border border-[#334155]">
                    <h2 className="text-3xl font-bold !text-[#2dd4bf] mb-6">Key Features</h2>
                    <br/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: 'Dashboard', desc: 'Overview of key metrics and insights.' },
                            { title: 'Inventory Management', desc: 'Manage stock levels and operations.' },
                            { title: 'Employee Management', desc: 'Manage employee records efficiently.' },
                            { title: 'Sales Management', desc: 'Track revenue and performance.' },
                            { title: 'Supplier Management', desc: 'Seamless procurement processes.' },
                            { title: 'Order Management', desc: 'Ensure timely fulfillment and satisfaction.' },
                            { title: 'Generate Report', desc: 'Real-Time based Report Generation and PDF Exportation.' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 bg-[#0f172a] rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out border border-[#475569]"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-[#38bdf8]">{feature.title}</h3>
                                {hoveredIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-gray-400"
                                    >
                                        {feature.desc}
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-[#1e293b] shadow-lg rounded-2xl p-10 mb-10 border border-[#334155]">
                    <h2 className="text-3xl font-bold !text-[#2dd4bf] mb-8 text-center">TEAM ARCHITRACK360</h2>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#0f172a] p-6 rounded-xl shadow-md text-center border border-[#475569]"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-48 h-48 mx-auto mb-4 rounded-lg"
                                />
                                <h3 className="text-xl font-bold text-[#38bdf8] mb-2">{member.name}</h3>
                                <p className="text-teal-400 font-semibold">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* GitHub Section */}
                <div className="bg-[#1e293b] shadow-lg rounded-2xl p-10 mb-10 border border-[#334155] text-center flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold !text-[#2dd4bf] mb-8">OUR GITHUB REPOSITORY</h2>
                        <br/>
                    <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center space-y-6">
                        <img
                            className="rounded-xl shadow-md border border-[#334155]"
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GITHUB"
                            width="250"
                        />

                        <a
                            href="https://github.com/mannshrimali/architrack360"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#38bdf8] !text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#0ea5e9] transition duration-300"
                        >
                            Go to GitHub
                        </a>
                    </motion.div>
                </div>



            </motion.div>
        </div>
    );
};

export default AboutUs;
