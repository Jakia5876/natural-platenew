'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import styles from './page.module.css';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>
                    Have a question about our products? Need help with an order? We’re here and ready to assist.
                </p>
            </header>

            <div className={styles.content}>
                <div className={styles.contactInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>📞</span>
                        <div>
                            <strong>Phone</strong>
                            <div>+880 1716779220</div>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.icon}>✉️</span>
                        <div>
                            <strong>Email</strong>
                            <div>support@naturalplate.com</div>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.icon}>📍</span>
                        <div>
                            <strong>Address</strong>
                            <div>Dhaka, Bangladesh</div>
                        </div>
                    </div>

                    <div className={styles.outro}>
                        Our support team responds quickly and does its best to make your experience smooth and worry-free. Reach out anytime — we’d love to hear from you.
                    </div>
                </div>

                <div className={styles.formContainer}>
                    {!submitted ? (
                        <>
                            <h2 className={styles.formHeading}>Send us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Name</label>
                                    <input type="text" className={styles.input} required placeholder="Your Name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Email</label>
                                    <input type="email" className={styles.input} required placeholder="Your Email" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Message</label>
                                    <textarea className={styles.textarea} required placeholder="How can we help?" />
                                </div>
                                <Button fullWidth>Send Message</Button>
                            </form>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                            <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem' }}>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you shortly.</p>
                            <Button onClick={() => setSubmitted(false)} variant="outline" style={{ marginTop: '1.5rem' }}>Send Another</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
