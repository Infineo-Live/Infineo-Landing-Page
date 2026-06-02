import { useEffect, useRef, useState } from 'react';
import '../styles/BroadwayText.css';

export default function BroadwayText({ text, className = '', tag: Tag = 'span' }) {
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

  return (
    <Tag ref={ref} className={`broadway-wrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`broadway-char ${visible ? 'vis' : ''}`}
          style={{ animationDelay: `${i * 0.04}s` }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}