import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-base)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
        padding: '24px',
        overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', marginBottom: '48px', width: '300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <div style={{ fontSize: '8rem', color: 'var(--color-error)', lineHeight: 1, textShadow: '0 0 30px var(--color-error-dim)', zIndex: 2 }}>
            404
          </div>
          
          {/* Faux Spaghetti Monster using visual lines */}
          <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150%',
              height: '150%',
              pointerEvents: 'none',
              zIndex: 1
          }}>
             <svg viewBox="0 0 200 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                 <path d="M -50 50 Q 0 0, 50 50 T 100 0 T 150 100 T 250 50" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeDasharray="5,5" />
                 <path d="M -20 20 Q 30 100, 80 20 T 120 80 T 180 -20 T 220 50" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                 <path d="M 0 80 Q 40 -30, 90 90 T 130 10 T 170 120 M 170 120 Q 200 150, 150 20 T 50 50" fill="none" stroke="var(--color-muted)" strokeWidth="1" />
                 <path d="M -10 60 Q 20 -40, 70 80 T 110 5 T 160 110" fill="none" stroke="var(--color-cyan)" strokeWidth="0.5" />
             </svg>
          </div>
      </div>
      
      <div style={{ zIndex: 10 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--color-error)' }}>Extrusor Atascado (Error 404)</h1>
        <p style={{ maxWidth: '500px', marginBottom: '48px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
          La pieza se despegó de la cama caliente a la mitad de la noche y generó este enorme monstruo de espagueti. <br/><br/>
          <strong>La página que buscas no existe.</strong>
        </p>
        
        <Link href="/" className="nothing-btn nothing-btn--accent">
          [ Regresar al inicio sano y salvo ]
        </Link>
      </div>
    </main>
  );
}
