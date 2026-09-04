import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { games } from './data';

export default function GameDetail() {
  const { slug } = useParams();
  const game = games.find(g => g.slug === slug);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    setTimeout(() => { document.documentElement.style.scrollBehavior = 'smooth'; }, 100);
  }, [slug]);

  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <h1 className="font-display text-5xl">Game Not Found</h1>
        <Link to="/" className="btn btn-red">Return Home</Link>
      </div>
    );
  }

  const Stars = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-current' : 'opacity-20'}`} viewBox="0 0 24 24" style={{ color: game.accentColor }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );

  return (
    <div className="noise min-h-screen bg-black text-white w-full overflow-x-hidden">

      {/* ── Fixed Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 py-4 px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold tracking-widest uppercase">
          ← Back
        </Link>
        <a href={game.url} target="_blank" rel="noreferrer" className={`btn ${game.btnClass} py-2 px-5 text-xs`}>
          {game.cta}
        </a>
      </nav>

      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={game.screenshotUrl}
          alt={game.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        {/* Subtle side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-10 -mt-16 relative z-10">

          {/* Profile card row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-5 mb-10"
          >
            <img
              src={game.profilePic}
              alt={`${game.title} cover`}
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shrink-0 shadow-2xl border-2"
              style={{ borderColor: game.accentColor + '60' }}
            />
            <div className="pb-1">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {game.tags.map(t => (
                  <span key={t} className="tag text-xs" style={{ borderColor: `${game.accentColor}40`, color: game.accentColor }}>{t}</span>
                ))}
              </div>
              <h1
                className="font-display font-bold leading-none uppercase glitch mb-1"
                data-text={game.title}
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: game.accentColor }}
              >
                {game.title}
              </h1>
              <p className="text-zinc-400 text-sm md:text-base italic">"{game.tagline}"</p>
            </div>
          </motion.div>

          {/* ── Two column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">

            {/* Left: Big content column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-4">
                  {game.fullDescription.map((para, i) => (
                    <p key={i} className={`leading-relaxed ${i === 0 ? 'text-white font-medium text-base' : 'text-zinc-400 text-sm'}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </motion.section>

              {/* Features */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6"
              >
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: game.accentColor }}>
                  🎮 Features
                </h2>
                <ul className="space-y-2">
                  {game.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: game.accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
                {game.note && (
                  <p className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500 font-semibold">
                    {game.note}
                  </p>
                )}
              </motion.section>

              {/* Coming Soon banner */}
              {game.comingSoon && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border border-dashed rounded-xl p-4 text-sm font-medium"
                  style={{ borderColor: game.accentColor + '60', color: game.accentColor, background: game.accentDim }}
                >
                  {game.comingSoon}
                </motion.div>
              )}

              {/* Trailer */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-4 text-white">
                  🎥 Trailer
                </h2>
                <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-video shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${game.youtubeId}?rel=0&modestbranding=1`}
                    title={`${game.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              {/* Screenshots */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-4 text-white">
                  📸 Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {game.screenshots.map((url, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl overflow-hidden border border-zinc-800 group aspect-video"
                    >
                      <img
                        src={url}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-5">

              {/* CTA Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sticky top-20"
              >
                {/* Rating */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-800">
                  <Stars rating={parseFloat(game.rating)} />
                  <span className="font-bold text-white text-sm">{game.rating}</span>
                  <span className="text-zinc-500 text-xs">({game.ratingCount} ratings)</span>
                </div>

                {/* Game Info */}
                <div className="space-y-3 mb-5 text-sm">
                  {[
                    ['Status', game.status],
                    ['Platform', game.platforms.join(', ')],
                    ['Genre', game.genre],
                    ['Price', game.platform.includes('Free') ? 'Free' : '$6.00 USD'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0">
                      <span className="text-zinc-500 text-xs uppercase tracking-widest">{label}</span>
                      <span className="text-white font-medium text-xs">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 w-full items-center">
                  <iframe 
                    frameBorder="0" 
                    src={`https://itch.io/embed/${game.widgetId}?bg_color=18181b&fg_color=ffffff&link_color=${game.accentColor.replace('#', '')}&border_color=27272a`} 
                    width="100%" 
                    height="167"
                    className="rounded-lg overflow-hidden"
                  >
                    <a href={game.url}>{game.title}</a>
                  </iframe>
                </div>
              </motion.div>

              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: game.accentColor }}>
                  🕹️ Controls
                </h3>
                <div className="space-y-2">
                  {game.controls.map((ctrl, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/40 last:border-0 group">
                      <span className="font-mono text-xs bg-black/80 border border-zinc-700 group-hover:border-zinc-500 px-2.5 py-1 rounded text-white transition-colors">
                        {ctrl.key}
                      </span>
                      <span className="text-zinc-400 text-xs text-right max-w-[55%]">{ctrl.action}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3 text-zinc-300">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map(t => (
                    <span key={t} className="tag text-xs">{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
