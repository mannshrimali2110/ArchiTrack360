import { useState } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 text-gray-800 p-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max mx-auto bg-white shadow-lg rounded-2xl p-10"
            >
                <h1 className="text-4xl font-bold text-blue-700 mb-6">About ArchiTrack360</h1>
                <p className="mb-4 text-lg">
                    ArchiTrack360 is a comprehensive inventory and employee management system designed to streamline operations for businesses. It offers a user-friendly interface and a wide range of functionalities to help organizations manage their resources efficiently.
                </p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: 'Dashboard', desc: 'Overview of key metrics and insights.' },
                        { title: 'Inventory Management', desc: 'Manage stock levels and operations.' },
                        { title: 'Employee Management', desc: 'Manage employee records efficiently.' },
                        { title: 'Sales Management', desc: 'Track revenue and performance.' },
                        { title: 'Supplier Management', desc: 'Seamless procurement processes.' },
                        { title: 'Order Management', desc: 'Ensure timely fulfillment and satisfaction.' },
                        { title: 'Settings', desc: 'Customize app settings as needed.' },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-blue-100 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
                            {hoveredIndex === index && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {feature.desc}
                                </motion.p>
                            )}
                        </motion.div>
                    ))}
                </div>
                <br />
                <br />
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Why Choose ArchiTrack360?</h2>
                <p className="text-lg">
                    ArchiTrack360 simplifies complex business processes, improves efficiency, and provides actionable insights. Manage inventory, employees, and sales seamlessly.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutUs;
