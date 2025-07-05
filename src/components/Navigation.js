import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      background: '#333',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Karamachedu Survey
      </Link>
      
      <div>
        <span>Village Survey Application</span>
      </div>
    </nav>
  );
} 