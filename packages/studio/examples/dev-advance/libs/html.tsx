import React from 'react';
import { renderToString } from 'react-dom/server';

type TypeProps = {
  text: string;
  title?: string;
  gradientColor?: {
    from: string,
    to: string
  }
}

function Layer(props: TypeProps) {
  return (
    <>
      <div style={{
         position: 'relative',
         height: 250,
         width: 360,
      }}>
        <div style={{
          display: 'flex',
          placeItems: 'flex-end',
          position: 'absolute',
          left: 'calc(50% - 88px)',
          top: 'calc(50% - 86px)',
          width: 180,
          height: 320,
          backgroundColor: '#62278d',
          background: `linear-gradient(to bottom, ${props.gradientColor?.from || '#62278d'} 0%, ${props.gradientColor?.to || '#2cc09b'} 100%)`,
          border: '1px #666666 solid',
          transform:' perspective(900px) translateX(15px) rotateX(45deg) rotate(10deg) skew(-15deg) translateZ(120px)',
        }}>
          <span style={{
            position: 'absolute',
            top: 100,
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 'bold',
            opacity: 0.4,
            margin: 10,
            padding: 4,
          }}>{props.title}</span>
          <span style={{
            display: 'flex',
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            border: '2px solid #ffffff',
            margin: 10,
            padding: 4,
          }}>{props.text}</span>
        </div>
      </div>
    </>
  )
}

export function createLayerHTML(props: TypeProps): string {
  return createHTML(<Layer {...props}></Layer>)
}

export function createHTML(content: React.ReactElement): string {
  return renderToString(<>{content}</>)
}
