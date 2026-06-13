import { useEffect, useRef, useState } from 'react';
import '../styles/BroadwayText.css';

export default function BroadwayText({ text, className = '', tag: Tag = 'span', startDelay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Split text into words and spaces to keep words together
  const tokens = text.split(/(\s+)/);
  let charIdx = 0;

  return (
    <Tag ref={ref} className={`broadway-wrap ${className}`} aria-label={text}>
      {tokens.map((token, idx) => {
        if (token.trim() === '') {
          // Render space as non-breaking space
          return <span key={idx} className="broadway-char" aria-hidden="true">{'\u00A0'}</span>;
        }
        // Wrap each word in a container to prevent line breaks within the word
        return (
          <span key={idx} className="broadway-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(token).map((char, i) => (
              <span
                key={i}
                className={`broadway-char ${visible ? 'vis' : ''}`}
                style={{ animationDelay: `${startDelay + charIdx++ * 0.04}s` }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
