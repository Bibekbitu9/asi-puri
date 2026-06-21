import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Image } from '@unpic/react';
import { Link } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    date: 'February 28, 2026',
    title: 'Excavations at Ratnagiri Volume III Published',
    description: 'The highly anticipated third volume detailing the comprehensive findings from the Ratnagiri excavations is now available for scholars and the public.',
    image: '/images/(32) Old hill, Ratnagiri, Jajpur/4.JPG'
  },
  {
    id: 2,
    date: 'February 20, 2026',
    title: 'Annual Heritage Walk at Konark Sun Temple',
    description: 'Join us for the annual guided heritage walk exploring the magnificent Konark Sun Temple. Registration is now open.',
    image: '/images/(4) The Ancient Monument of the Black Pagoda/2.JPG'
  }
];

export default function NewsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-neutral)] relative overflow-hidden" id="news-press">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4"
        >
          <span className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs block">
            Media & Press
          </span>
          <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] text-[var(--color-dark-stone)] leading-tight">
            News & Events
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group flex flex-col bg-white/50 backdrop-blur rounded-3xl overflow-hidden shadow-lg border border-[var(--color-muted-gold)]/20"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={news.image}
                  layout="fullWidth"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-dark-stone)]">{news.date}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-dark-stone)] mb-4 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                  {news.title}
                </h3>
                <p className="text-[var(--color-dark-stone)] opacity-70 text-sm leading-relaxed mb-8 flex-grow">
                  {news.description}
                </p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[var(--color-muted-gold)]/30 text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest group-hover:text-[var(--color-muted-gold)] transition-colors"
                >
                  <span>Read Article</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-[#A8451A] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
