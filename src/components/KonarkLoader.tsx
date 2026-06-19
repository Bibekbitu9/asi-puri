import { motion } from 'framer-motion';

export default function KonarkLoader({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={`text-amber-600 ${className}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
        
        {/* Spokes */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2="50"
            y2="5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
        {/* Sub-spokes */}
        {[...Array(8)].map((_, i) => (
          <line
            key={`sub-${i}`}
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${i * 45 + 22.5} 50 50)`}
          />
        ))}
      </motion.svg>
    </div>
  );
}
