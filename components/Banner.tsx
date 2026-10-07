"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { Phone, FileText } from "lucide-react";

const videos = [
  "/banner1.mp4", 
  "/banner2.mp4", 
  "/banner3.mp4",
];

// Première image exacte de banner1.mp4 : affichée pendant le chargement (et seule si animations réduites)
const POSTER = "/banner1-poster.jpg";
const ROTATION_MS = 8000; // Réduit à 8s pour plus de dynamisme
const WARMUP_DELAY_MS = 2000; // Délai avant de précharger la vidéo suivante

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

export default function HeroBanner() {
  const [currentVideo, setCurrentVideo] = useState(0);
  // Vidéos autorisées à se charger : seule la première au départ, les suivantes à la demande
  const [loadedVideos, setLoadedVideos] = useState<number[]>([0]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  // Fonction pour mettre en pause toutes les vidéos sauf l'active
  const syncVideos = useCallback((activeIdx: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIdx) {
          video.currentTime = 0; // Recommencer
          video.play().catch(() => {}); // Gérer le blocage navigateur
        } else {
          video.pause();
        }
      }
    });
  }, []);

  // Cycle de changement de vidéo
  useEffect(() => {
    // Animations réduites : aucune lecture ni rotation, le poster reste affiché
    if (reducedMotion || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      videoRefs.current.forEach((video) => video?.pause());
      return;
    }

    syncVideos(currentVideo);

    const next = (currentVideo + 1) % videos.length;

    // Préchargement différé de la vidéo suivante uniquement
    const warmup = setTimeout(() => {
      setLoadedVideos((prev) => (prev.includes(next) ? prev : [...prev, next]));
    }, WARMUP_DELAY_MS);

    // On ne bascule que si la vidéo suivante peut être lue, sinon la vidéo courante continue en boucle
    const interval = setInterval(() => {
      const nextVideo = videoRefs.current[next];
      if (nextVideo && nextVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setCurrentVideo(next);
      }
    }, ROTATION_MS);

    return () => {
      clearTimeout(warmup);
      clearInterval(interval);
    };
  }, [currentVideo, reducedMotion, syncVideos]);

  return (
    <section className="relative w-full aspect-[16/10] md:aspect-video min-h-[550px] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Background Videos avec Fondu */}
      {videos.map((src, index) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[index] = el; }}
          // Sans src, aucune requête réseau : la vidéo n'est chargée que lorsqu'elle va être affichée
          src={loadedVideos.includes(index) ? src : undefined}
          poster={index === 0 ? POSTER : undefined}
          muted
          loop
          playsInline
          preload={index === 0 ? "metadata" : "auto"}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay sombre dégradé pour meilleure lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />

      {/* Contenu */}
      <div className="relative z-20 container mx-auto px-6 text-center text-white">
        
        {/* Petit badge local */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <span>Artisan couvreur · Lyon & métropole</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Couvreur à Décines-Charpieu <br />
          <span className="text-amber-400">et dans l&apos;Est lyonnais</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-200 max-w-2xl mx-auto mb-12">
          Rénovation, zinguerie, isolation et dépannage d&apos;urgence 7j/7. <br/>
          Travaux couverts par notre assurance décennale.
        </p>
        
        {/* Double CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/devis"
            className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-amber-500/20"
          >
            <FileText className="w-5 h-5" />
            Demander un devis gratuit
          </Link>
          
          <a 
            href="tel:0465848885" 
            className="flex items-center gap-2.5 bg-slate-100 hover:bg-white text-slate-950 font-extrabold py-4 px-8 rounded-xl transition-all shadow-xl"
          >
            <Phone className="w-5 h-5 text-amber-600" />
            04 65 84 88 85
          </a>
        </div>
      </div>
    </section>
  );
}