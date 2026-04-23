tsx
import { useState } from "react";
import { WoodColor } from "@/types/products";

interface ColorVisualizerProps {
  selectedColor: WoodColor | undefined;
  productLine: string;
}

// Configuração das imagens de alta qualidade (GitHub)
const SOLID_MAP: Record<string, { finish: string, profile: string }> = {
  "BRANCO": {
    finish: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20Branco%20para%20Site%20Realiza%20gmni.png?raw=true",
    profile: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/Branco.png?raw=true"
  },
  "PRETO": {
    finish: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20Preta%20para%20Site%20Realiza%20gmni.jpeg.png?raw=true",
    profile: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/Preto.jpg?raw=true"
  },
  "AÇO CORTEN": {
    finish: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20a%C3%A7o%20cort%C3%8Am%20para%20Site%20Realiza%20gmni.png?raw=true",
    profile: "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/A%C3%A7o%20Corten.png?raw=true"
  }
};

export default function ColorVisualizer({ selectedColor, productLine }: ColorVisualizerProps) {
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);

  // Identificar se a cor é sólida ou amadeirada
  const nameUpper = selectedColor?.name.toUpperCase() || "";
  const solidKey = (nameUpper === "ALUMÍNIO" || nameUpper === "ALUMINIO") ? "AÇO CORTEN" : nameUpper;
  const isSolid = !!SOLID_MAP[solidKey];

  // Lógica de Ripas (Original restaurada)
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 128, g: 128, b: 128 };
  };
  const colorRgb = selectedColor?.hexCode ? hexToRgb(selectedColor.hexCode as string) : { r: 128, g: 128, b: 128 };

  const generateRipas = () => {
    const ripas = [];
    for (let i = 0; i < 24; i++) {
      const brightness = 1 + (Math.sin(i * 0.5) * 0.15 + 0.1);
      ripas.push(
        <div key={i} className="flex-1 relative overflow-hidden" style={{
          backgroundImage: selectedColor?.imageName ? `url(/images/${selectedColor.imageName})` : `none`,
          backgroundColor: `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`,
          backgroundSize: "cover",
          filter: `brightness(${brightness})`,
          boxShadow: `inset -1px 0 0 rgba(0,0,0,0.1), inset 1px 0 0 rgba(255,255,255,0.1)`
        }} />
      );
    }
    return ripas;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Visualizador Principal */}
        <div 
          className="relative lg:col-span-7 aspect-video bg-black rounded-lg overflow-hidden border border-gray-800 cursor-zoom-in group"
          onClick={() => isSolid && setIsExpandedModalOpen(true)}
        >
          {isSolid ? (
            <img src={SOLID_MAP[solidKey].finish} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="flex h-full w-full gap-0.5 p-4 bg-black">{generateRipas()}</div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 text-white">
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">ACABAMENTO</p>
            <h3 className="text-2xl font-bold">{selectedColor?.name || "Selecione"}</h3>
            <p className="text-xs opacity-80">{productLine}</p>
          </div>

          {isSolid && (
            <div className="absolute top-4 right-4 bg-black/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </div>
          )}
        </div>

        {/* Perfil Técnico */}
        <div className="lg:col-span-3 relative aspect-square md:aspect-auto rounded-lg overflow-hidden border border-gray-100 bg-white flex items-center justify-center p-4">
          <img 
            src={isSolid ? SOLID_MAP[solidKey].profile : `/images/${selectedColor?.imageName}`}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[8px] font-bold text-gray-500 uppercase shadow-sm border border-gray-100">Perfil Técnico</div>
        </div>
      </div>
      
      {/* ... (Modal de Expansão) ... */}
    </div>
  );
}
