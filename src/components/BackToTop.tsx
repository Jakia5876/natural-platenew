'use client';

import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`${styles.backToTop} ${visible ? styles.backToTopVisible : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            ↑
        </button>
    );
}
