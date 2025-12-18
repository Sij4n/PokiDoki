import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchQuery, setSearchQuery, isNavBar = false, isScrolled = false }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ width: '100%', paddingRight: isNavBar ? '0' : '120px' }}
        >
            <motion.input
                type="text"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                animate={{
                    padding: isNavBar && isScrolled ? '0.6rem 0.9rem' : (isNavBar ? '0.75rem 1rem' : '1rem 1.5rem'),
                    fontSize: isNavBar && isScrolled ? '0.85rem' : (isNavBar ? '0.95rem' : '1.2rem')
                }}
                transition={{ duration: 0.3 }}
                style={{
                    width: '100%',
                    color: isNavBar ? '#000000' : 'var(--text-primary)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: isNavBar ? '#f5f5f5' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: isNavBar ? 'none' : 'blur(10px)',
                    border: isNavBar ? '1px solid #e0e0e0' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    boxShadow: isNavBar ? 'none' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
                whileFocus={{
                    scale: isNavBar ? 1 : 1.02,
                    backgroundColor: isNavBar ? "#ffffff" : "rgba(255, 255, 255, 0.15)",
                    boxShadow: isNavBar ? "0 0 0 2px rgba(0, 0, 0, 0.1)" : "0 0 15px rgba(255, 255, 255, 0.2)",
                    borderColor: isNavBar ? "#000000" : "rgba(255, 255, 255, 0.3)"
                }}
            />
        </motion.div>
    );
};

export default SearchBar;
