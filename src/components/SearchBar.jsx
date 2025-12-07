import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '2rem', width: '100%', maxWidth: '600px' }}
        >
            <motion.input
                type="text"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-panel"
                style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    boxSizing: 'border-box',
                }}
                whileFocus={{
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
                }}
            />
        </motion.div>
    );
};

export default SearchBar;
