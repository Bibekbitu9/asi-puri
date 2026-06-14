import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Calendar, FileText, Compass, AlertCircle } from 'lucide-react';
import monumentsData from '../data/monuments.json';

export default function MonumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();

  const monument = monumentsData.find(m => m.id === Number(id));

  if (!monument) {
    return (
      <div className="py-20 text-center min-h-screen bg-slate-200 flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
        <h1 className="font-sans text-2xl font-bold text-slate-900 mb-4">Monument Not Found</h1>
        <Link className="text-amber-600 hover:text-amber-700 hover:underline font-bold" to="/monuments">
          {t('monuments.back_to_list')}
        </Link>
      </div>
    );
  }

  const lang = i18n.language as 'en' | 'hi' | 'od';

  const name = monument.names[lang] || monument.names.en;

  // Metadata translation fallback logic
  const meta = monument.metadata[lang === 'od' ? 'en' : lang] || monument.metadata.en;
  const description = monument.descriptions[lang === 'od' ? 'en' : lang] || monument.descriptions.en;
  const isOdiaFallback = lang === 'od';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors uppercase tracking-widest bg-slate-100 py-2 px-4 rounded-full shadow-sm border border-slate-300 hover:bg-slate-200 w-fit"
          to="/monuments"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('monuments.back_to_list')}
        </Link>

        {/* Monument Header */}
        <div className="space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
            Monument #{monument.id}
          </span>
          <h1 className="font-sans text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {name}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
        </div>

        {/* Gallery / Main Image */}
        <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-300 p-2">
          {monument.images && monument.images.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-[16/9] w-full rounded overflow-hidden bg-gray-50">
                <img
                  alt={name}
                  className="w-full h-full object-cover"
                  src={monument.images[0]}
                />
              </div>
              
              {/* Additional Thumbnails */}
              {monument.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 px-1 pb-1">
                  {monument.images.slice(1, 6).map((img, idx) => (
                    <a
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-400 transition-colors block shadow-sm"
                      href={img}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        alt={`${name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        src={img}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center text-slate-400 rounded-xl font-semibold">
              No images available
            </div>
          )}
        </div>

        {/* Details & Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Metadata Card */}
          <div className="md:col-span-1 bg-slate-100 rounded-2xl p-6 border border-slate-300 shadow-[0_4px_20px_rgb(0,0,0,0.05)] h-fit space-y-6">
            <h3 className="font-sans text-lg font-bold text-slate-900 border-b border-slate-300 pb-3">
              Quick Facts
            </h3>
            
            <div className="space-y-5 text-xs font-sans text-slate-800">
              {meta?.district && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin className="w-4 h-4" />
                    {t('monuments.district')}
                  </div>
                  <div className="font-semibold pl-6 text-sm">{meta.district}</div>
                </div>
              )}
              {meta?.locality && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin className="w-4 h-4" />
                    {t('monuments.locality')}
                  </div>
                  <div className="font-semibold pl-6 text-sm">{meta.locality}</div>
                </div>
              )}
              {meta?.period && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold uppercase tracking-widest text-[10px]">
                    <Calendar className="w-4 h-4" />
                    {t('monuments.period')}
                  </div>
                  <div className="font-semibold pl-6 text-sm">{meta.period}</div>
                </div>
              )}
              {meta?.geo && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold uppercase tracking-widest text-[10px]">
                    <Compass className="w-4 h-4" />
                    {t('monuments.coordinates')}
                  </div>
                  <div className="font-semibold pl-6 break-words">{meta.geo}</div>
                </div>
              )}
              {meta?.notification && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold uppercase tracking-widest text-[10px]">
                    <FileText className="w-4 h-4" />
                    {t('monuments.notification')}
                  </div>
                  <div className="font-semibold pl-6 text-[10px] leading-relaxed break-words text-slate-600">{meta.notification}</div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="md:col-span-2 bg-slate-100 rounded-2xl p-8 border border-slate-300 shadow-[0_4px_20px_rgb(0,0,0,0.05)] space-y-6">
            <h2 className="font-sans text-xl font-bold text-slate-900 border-b border-slate-300 pb-3">
              {t('monuments.description')}
            </h2>
            
            {isOdiaFallback && (
              <div className="bg-amber-100 border-l-4 border-amber-600 p-4 text-xs text-amber-900 rounded-r-lg flex items-start gap-2 font-semibold shadow-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  ଓଡ଼ିଆରେ ବିବରଣୀ ଉପଲବ୍ଧ ନାହିଁ । ଇଂରାଜୀ ସଂସ୍କରଣ ପ୍ରଦର୍ଶିତ ହେଉଛି :
                </div>
              </div>
            )}

            <div className="font-sans text-sm text-slate-800 leading-relaxed text-justify whitespace-pre-line space-y-4">
              {description ? (
                description.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <p className="text-slate-500 italic font-medium">Detailed description not available.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
