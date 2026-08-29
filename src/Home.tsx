import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { games } from './data';
import './index.css';

// ─── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const viewport = { once: true, amount: 0.2 };

// ─── Star Rating ──────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-current text-yellow-400' : 'text-zinc-700'}`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Game Section ─────────────────────────────────────────────
function GameSection({ game, index }: { game: typeof games[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      className="relative min-h-screen w-full flex items-center py-24 overflow-hidden"
      style={{ '--accent': game.accentColor } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 z-0"
        style={{ backgroundImage: `url('${game.coverUrl}')` }}
      />
      <div className="absolute inset-0 z-0" style={{
        background: isEven
          ? 'linear-gradient(to right, rgba(0,0,0,0.97) 50%, rgba(0,0,0,0.5))'
          : 'linear-gradient(to left, rgba(0,0,0,0.97) 50%, rgba(0,0,0,0.5))',
      }} />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: isEven
          ? `radial-gradient(ellipse at 80% 50%, ${game.accentDim} 0%, transparent 60%)`
          : `radial-gradient(ellipse at 20% 50%, ${game.accentDim} 0%, transparent 60%)`,
      }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 relative">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}>
          <motion.div
            variants={isEven ? fadeRight : fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-6"
          >
            <p className="font-display text-7xl font-bold opacity-10 -mb-4 leading-none" style={{ color: game.accentColor }}>
              0{index + 1}
            </p>

            <div className="flex flex-wrap gap-2">
              {game.tags.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <h2
              className="font-display font-bold leading-none tracking-tight glitch"
              data-text={game.title}
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                color: game.accentColor,
                textShadow: `0 0 40px ${game.accentDim.replace('0.12', '0.4')}`,
              }}
            >
              {game.title}
            </h2>

            <p className={`text-lg font-semibold italic ${game.textClass} opacity-80`}>
              "{game.tagline}"
            </p>

            <div className="h-px w-16" style={{ background: game.accentColor }} />

            <p className="text-zinc-300 leading-relaxed text-base max-w-md">
              {game.description}
            </p>

            <div className="flex items-center gap-4 p-3 border rounded-lg" style={{ borderColor: game.accentColor + '33', background: game.accentDim }}>
              <Stars rating={parseFloat(game.rating)} />
              <span className={`text-sm font-bold ${game.textClass}`}>{game.rating}</span>
              <span className="text-zinc-500 text-sm">({game.ratingCount} ratings)</span>
              <span className="ml-auto text-zinc-400 text-xs font-semibold tracking-wider uppercase">{game.platform}</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <a href={game.url} target="_blank" rel="noreferrer" className={`btn ${game.btnClass}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                {game.cta}
              </a>
              <Link to={`/game/${game.slug}`} className="btn border border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-colors">
                View Details
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={isEven ? fadeLeft : fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative"
          >
            <div
              className="absolute -inset-3 rounded-xl opacity-30 blur-xl z-0"
              style={{ background: game.accentColor }}
            />
            <Link to={`/game/${game.slug}`} className={`relative z-10 rounded-xl border overflow-hidden img-lift block ${game.borderClass}`}>
              <img
                src={game.screenshotUrl}
                alt={game.title}
                className="w-full h-auto block"
                loading="lazy"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="noise w-full min-h-screen bg-black overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 flex items-center justify-between mix-blend-difference">
        <a href="#" className="font-display font-bold text-2xl tracking-widest text-white uppercase">
          Imran Aziz
        </a>
        <div className="flex gap-8 text-xs font-bold tracking-widest text-white uppercase">
          <a href="#games" className="hover:opacity-60 transition-opacity">Games</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
        </div>
      </nav>

      <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,77,77,0.08) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse at 80% 80%, rgba(255,77,77,0.05) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="tag" style={{ borderColor: 'rgba(255,77,77,0.4)', color: '#ff4d4d' }}>
            Indie Game Developer
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4"
        >
          <h1
            className="shimmer-text font-display font-bold tracking-tighter uppercase leading-none"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 11rem)' }}
          >
            Imran Aziz
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-4 text-zinc-400 text-sm md:text-lg font-semibold tracking-widest uppercase text-center px-4"
        >
          Crafting atmospheric horror experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex gap-8 md:gap-16 text-center"
        >
          {[['2', 'Games Released'], ['4.8★', 'Avg Rating'], ['2000+', 'Downloads']].map(([val, label]) => (
            <div key={label}>
              <div className="font-display font-bold text-3xl text-white">{val}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-zinc-600 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-zinc-700 flex justify-center items-start p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-brand scroll-dot" />
          </div>
        </div>
      </header>

      <main id="games">
        {games.map((game, i) => (
          <GameSection key={game.id} game={game} index={i} />
        ))}
      </main>

      <footer id="about" className="relative py-32 bg-black border-t border-zinc-900 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand/5 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-500/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Left Col: Bio */}
            <div className="text-left">
              <h2 className="font-display font-bold text-6xl md:text-8xl tracking-tighter text-white mb-6 uppercase">
                Imran Aziz
              </h2>
              <div className="w-16 h-1 bg-brand mb-8" />
              <p className="text-zinc-300 leading-relaxed text-xl mb-6 font-medium">
                I'm a solo indie game developer focused on crafting highly atmospheric, story-driven horror games.
              </p>
              <p className="text-zinc-500 leading-relaxed text-lg mb-6">
                Every project is an opportunity to build a unique, terrifying experience that stays with players long after the credits roll. I design games that push the boundaries of atmosphere and tension.
              </p>
              <p className="text-zinc-500 leading-relaxed text-base">
                I genuinely appreciate every piece of feedback, comment, and let's play video. It's what helps me grow and make better games for the community.
              </p>
            </div>

            {/* Right Col: Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://imranaziz.itch.io/" target="_blank" rel="noreferrer" className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#fa5c5c] hover:bg-[#fa5c5c]/10 transition-all p-8 rounded-3xl group flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                <svg className="w-10 h-10 text-zinc-500 group-hover:text-[#fa5c5c] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                <span className="font-display font-bold text-2xl tracking-widest uppercase text-white group-hover:text-[#fa5c5c] transition-colors">Itch.io</span>
              </a>
              <a href="https://www.youtube.com/@imrexstudios" target="_blank" rel="noreferrer" className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all p-8 rounded-3xl group flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                <svg className="w-10 h-10 text-zinc-500 group-hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 6.186a2.784 2.784 0 00-1.959-1.96C17.896 3.75 12 3.75 12 3.75s-5.896 0-7.623.476a2.784 2.784 0 00-1.959 1.96C1.94 7.914 1.94 12 1.94 12s0 4.086.478 5.814a2.784 2.784 0 001.959 1.96C6.104 20.25 12 20.25 12 20.25s5.896 0 7.623-.476a2.784 2.784 0 001.959-1.96C22.06 16.086 22.06 12 22.06 12s0-4.086-.478-5.814zM9.91 15.518V8.482L15.924 12l-6.014 3.518z"/></svg>
                <span className="font-display font-bold text-2xl tracking-widest uppercase text-white group-hover:text-[#FF0000] transition-colors">YouTube</span>
              </a>
              <a href="https://www.patreon.com/cw/imranaziz" target="_blank" rel="noreferrer" className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#FF424D] hover:bg-[#FF424D]/10 transition-all p-8 rounded-3xl group flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                <svg className="w-10 h-10 text-zinc-500 group-hover:text-[#FF424D] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.957 7.21c-.004-3.064-2.391-5.576-5.191-6.482-3.478-1.125-8.064-.962-11.384.604-3.132 1.482-5.715 4.673-6.383 8.182-.41 2.146-.356 4.606 1.156 6.38 1.48 1.737 4.148 2.067 6.136 1.442 2.802-.88 4.382-3.411 6.845-4.836 1.849-1.07 4.004-1.394 5.962-.513 1.956.88 3.197 3.023 3.149 5.163-.046 2.029-1.343 3.996-3.181 4.966-2.02.946-4.603.962-6.505-.286-1.123-.622-2.394-1.89-1.688-3.238.647-1.233 2.508-1.196 3.73-.834 1.344.397 2.883.673 4.15-.121 1.054-.662 1.482-1.916 1.295-3.093-.205-1.296-1.39-2.355-2.665-2.585-1.921-.345-3.856.402-5.525 1.425-2.128 1.306-3.844 3.32-6.108 4.417-2.368 1.144-5.32.964-7.391-.703-1.815-1.458-2.665-3.83-2.637-6.138.03-2.628 1.436-5.065 3.354-6.841 2.658-2.463 6.643-3.321 10.155-2.827 2.923.411 5.688 2.123 7.026 4.743 1.037 2.03 1.157 4.621.135 6.745-.989 2.057-3.208 3.393-5.394 3.659-1.066.131-2.175.05-3.12-.449-.785-.414-.85-1.579-.43-2.302.383-.655 1.258-.87 1.968-.695 1.09.27 2.37.135 3.321-.594.887-.678 1.266-1.874 1.157-2.97-.101-1.026-.816-1.91-1.742-2.27-1.564-.607-3.385-.308-4.912.42-2.162 1.033-4.116 2.587-6.105 3.864-2.146 1.378-4.733 2.222-7.234 1.543-2.695-.731-5.006-2.943-5.651-5.698-.616-2.639.123-5.467 1.83-7.464 2.155-2.52 5.679-3.799 8.972-4.004 3.513-.217 7.228.468 10.021 2.633 2.23 1.73 3.623 4.417 3.626 7.25z"/></svg>
                <span className="font-display font-bold text-2xl tracking-widest uppercase text-white group-hover:text-[#FF424D] transition-colors">Patreon</span>
              </a>
              <a href="mailto:mimranaziz09@gmail.com" className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-white hover:bg-white/10 transition-all p-8 rounded-3xl group flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                <svg className="w-10 h-10 text-zinc-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="font-display font-bold text-2xl tracking-widest uppercase text-white group-hover:text-white transition-colors">Email</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-32 pt-10 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs tracking-widest uppercase font-bold">
            © 2026 Imran Aziz · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
