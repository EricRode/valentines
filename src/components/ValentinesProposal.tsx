import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

const images = Array.from({ length: 36 }, (_, i) => `/game-photos/${i + 1}.jpg`);

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 60 + 20;
    const randomLeft = Math.random() * 60 + 20;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white overflow-hidden">
      
      {/* IMPROVED IMAGE GRID VISIBILITY */}
      {(step === 2 || step === 3) && (
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 z-0">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full border-[0.5px] border-black/20">
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                fill
                // Changed opacity to 50% and added brightness control
                className="object-cover opacity-70 brightness-[0.7] contrast-[1.1]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Subtle Dark Gradient Overlay to ensure text visibility */}
      {(step === 2 || step === 3) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1] pointer-events-none" />
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl md:text-5xl font-semibold text-center px-6 z-10 ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Congratulations! You have completed the game.
          </motion.h2>
        )}

        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl md:text-5xl font-semibold text-center px-6 z-10 ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            I have a surprise for you!
          </motion.h2>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            className="z-10 flex flex-col items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className={`text-5xl md:text-7xl font-bold mb-10 text-center drop-shadow-lg ${playfairDisplay.className}`}>
              Will you be my Valentine?
            </h2>
            
            <Image src="/heart.png" alt="Heart" width={140} height={140} className="animate-pulse drop-shadow-2xl" />

            <div className="flex space-x-6 mt-12">
              <button
                className="px-8 py-3 text-xl font-bold text-white bg-rose-600 rounded-full hover:bg-rose-700 shadow-2xl transform hover:scale-110 transition-all border border-rose-400/50"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>
              <button
                className="px-8 py-3 text-xl font-semibold text-white bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg transition-all border border-white/20"
                style={position ? { position: "absolute", top: position.top, left: position.left } : {}}
                onMouseEnter={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            className="z-20 flex flex-col items-center max-w-2xl mx-4 p-8 rounded-3xl bg-black/80 backdrop-blur-lg border border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className={`text-3xl md:text-4xl text-rose-400 font-bold mb-6 ${playfairDisplay.className}`}>
              ¡Te amo, Dani! ❤️
            </h2>
            
            <div className={`text-lg md:text-xl leading-relaxed text-center space-y-4 max-h-[45vh] overflow-y-auto px-2 custom-scrollbar ${playfairDisplay.className}`}>
              <p>Querida Dani,</p>
              <p>Espero que te encante el juego. Quiero decirte cómo me siento en español. Tú eres el amor de mi vida. Mi tesoro. Mi preciosa. Mi cielo. Mi cariño. Mi corazón. Mi persona favorita.</p>
              <p>Eres la persona más lista, preciosa, amable, cariñosa, simpática, maravillosa y guapísima del mundo. Cuando ríes, todo el mundo se detiene y todo está bien. Me siento seguro.</p>
              <p>Tú eres mi sol. Cuando no estamos juntos, te extraño más de lo que puedes imaginar.</p>
              <p className="font-bold text-rose-400 text-2xl mt-4">Te amo hasta la luna, ida y vuelta, con pasitos de caracol❤️.</p>
            </div>

            <div className="mt-8">
              <Image src="/dino.png" alt="Dino" width={160} height={160} unoptimized className="drop-shadow-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Fireworks options={{ autoresize: true, intensity: 30 }} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
    </div>
  );
}