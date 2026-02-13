import Link from 'next/link';
import Button from '@/components/Button';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    return (
        <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
            <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--success-green)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                color: 'white',
                fontSize: '3rem'
            }}>
                ✓
            </div>

            <h1 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
                Thank you for shopping with Natural Plate. Your order <strong style={{ color: 'var(--text-gray)' }}>#{params.id}</strong> has been received.
            </p>

            <div style={{ background: 'var(--light-green)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--dark-green)' }}>What's Next?</h3>
                <ul style={{ listStyle: 'none' }}>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                        <span>📞</span> We will call you shortly to confirm your order.
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                        <span>📦</span> Once confirmed, we will pack your natural goodies.
                    </li>
                    <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                        <span>🚚</span> You will pay <strong>Cash on Delivery</strong> when the rider arrives.
                    </li>
                </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/products">
                    <Button>Browse More</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
}
