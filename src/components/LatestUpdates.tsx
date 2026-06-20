import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const updatesData = [
  {
    id: 1,
    date: 'March 15, 2026',
    category: 'Conservation',
    title: 'Phase II Restoration of Jagannath Temple Commences',
    summary: 'The second phase of the structural conservation of the Jagannath Temple has officially begun, focusing on the preservation of the inner compound wall.'
  },
  {
    id: 2,
    date: 'March 10, 2026',
    category: 'Notice',
    title: 'New Visitor Guidelines for Konark Sun Temple',
    summary: 'Updated guidelines for visitors to ensure the safety of the monument and enhance the visitor experience during peak tourist seasons.'
  },
  {
    id: 3,
    date: 'March 05, 2026',
    category: 'Discovery',
    title: 'New Inscriptions Found near Ratnagiri',
    summary: 'Recent excavations have unearthed previously unknown stone inscriptions dating back to the 9th century CE near the Ratnagiri Buddhist complex.'
  }
];

export default function LatestUpdates() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-dark-stone)] text-[var(--color-neutral)] relative overflow-hidden" id="latest-updates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4"
        >
          <span className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs block">
            Announcements
          </span>
          <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] leading-tight text-[var(--color-neutral)]">
            Latest Updates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updatesData.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--color-neutral)] text-[var(--color-dark-stone)] rounded-2xl p-8 shadow-xl flex flex-col h-full border-t-4 border-[var(--color-primary)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[var(--color-muted-gold)] uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {update.category}
                </span>
                <span className="text-xs font-medium opacity-60 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {update.date}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 leading-snug">
                {update.title}
              </h3>
              <p className="opacity-80 text-sm leading-relaxed mb-6 flex-grow">
                {update.summary}
              </p>
              <Link
                to="#"
                className="inline-flex items-center text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-muted-gold)] transition-colors uppercase tracking-[0.1em] group mt-auto"
              >
                Read More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
