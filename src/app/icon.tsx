import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 320,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #7c3aed 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '112px',
          fontWeight: 900,
          fontFamily: 'Georgia, serif',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        <div
          style={{
            width: 380,
            height: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.28), transparent 35%)',
            borderRadius: '96px',
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size }
  )
}
