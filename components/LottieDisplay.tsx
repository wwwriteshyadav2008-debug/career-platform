import React from 'react';
import Lottie from 'lottie-react';

interface LottieDisplayProps {
  src?: string;
  animationData?: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  speed?: number;
}

export const LottieDisplay: React.FC<LottieDisplayProps> = ({ 
  src, 
  animationData, 
  className = "w-full h-full", 
  loop = true, 
  autoplay = true,
  style = { width: '100%', height: '100%' },
  speed = 1
}) => {
  const [data, setData] = React.useState<any>(animationData);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(!!src);
  const lottieRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  React.useEffect(() => {
    if (src) {
      setLoading(true);
      fetch(src)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load animation');
          return res.json();
        })
        .then(jsonData => {
          setData(jsonData);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else if (animationData) {
      setData(animationData);
      setLoading(false);
    }
  }, [src, animationData]);

  if (error) return <div className={`flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-xs ${className}`}>Animation failed</div>;
  
  if (loading || !data) {
    return (
       <div className={`animate-pulse bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
          <div className="w-8 h-8 border-2 border-slate-200 border-t-primary rounded-full animate-spin"></div>
       </div>
    );
  }

  return (
    <div className={className}>
      <Lottie lottieRef={lottieRef} animationData={data} loop={loop} autoplay={autoplay} style={style} />
    </div>
  );
};