import { useState } from "react";
import { WoodColor } from "@/types/products";

interface ColorVisualizerProps {
  selectedColor: WoodColor | undefined;
  productLine: string;
}

export default function ColorVisualizer({
  selectedColor,
  productLine,
}: ColorVisualizerProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);

  // Calcular cor RGB a partir do hex
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const colorRgb = selectedColor?.hexCode
    ? hexToRgb(selectedColor.hexCode as string)
    : { r: 128, g: 128, b: 128 };

  // Gerar ripas com variação de brilho usando textura da imagem
  const generateRipas = () => {
    const ripas = [];
    const numberOfRipas = 24;

    for (let i = 0; i < numberOfRipas; i++) {
      // Criar variação de brilho para simular veios de madeira
      const variation = Math.sin(i * 0.5) * 0.15 + 0.1;
      const brightness = 1 + variation;

      ripas.push(
        <div
          key={i}
          className="flex-1 relative overflow-hidden"
          style={{
            backgroundImage: selectedColor?.imageName
              ? `url(/images/${selectedColor.imageName})`
              : `linear-gradient(rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}), rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: `inset -1px 0 0 rgba(0, 0, 0, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.1)`,
            filter: `brightness(${brightness})`,
          }}
        />
      );
    }
    return ripas;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg text-primary flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Visualize Sua Escolha
        </h4>
      </div>

      {/* Modal de Compartilhamento */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Visualizar no Telemóvel</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="bg-neutral-100 p-2 rounded-full hover:bg-neutral-200 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Informações da Cor */}
            {selectedColor && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Seleção Atual:</strong>
                </p>
                <p className="text-sm text-gray-800">
                  {productLine} - {selectedColor.name}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visualizador de Ripas + Referência */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <div className="relative lg:col-span-7 aspect-video bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-gray-800">
          {/* Ripas Verticais */}
          <div className="flex h-full w-full gap-0.5 p-4 bg-black">
            {selectedColor ? (
              generateRipas()
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <p className="text-sm">Selecione uma cor para visualizar</p>
                </div>
              </div>
            )}
          </div>

          {/* Informações da Cor (Canto Inferior Direito) */}
          {selectedColor && (
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700">
              <p className="text-xs font-bold text-gray-300 mb-1">ACABAMENTO</p>
              <p className="text-sm font-semibold text-white">
                {selectedColor.name}
              </p>
              <p className="text-xs text-gray-400">{selectedColor.hexCode}</p>
            </div>
          )}

          {/* Ícone de Expansão */}
          {selectedColor && (
            <button
              onClick={() => setIsExpandedModalOpen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-lg transition-colors"
              title="Expandir visualização"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          )}
        </div>

        {selectedColor?.imageName ? (
          <div className="lg:col-span-3 rounded-lg overflow-hidden border border-gray-200 bg-white min-h-[180px]">
            <img
              src={`/images/${selectedColor.imageName}`}
              alt="Referência de cor cerejeira escura"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        * Visualização em ripas de alumínio. As cores podem variar conforme
        iluminação, acabamento e material aplicado.
      </p>

      {selectedColor && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Dica:</strong> A cor {selectedColor.name} é ideal para{" "}
            {selectedColor.category === "wood"
              ? "ambientes que buscam aconchego e sofisticação natural, com veios de madeira autênticos"
              : "projetos modernos e minimalistas"}
            .
          </p>
        </div>
      )}

      {/* Modal de Expansão */}
      {isExpandedModalOpen && selectedColor && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setIsExpandedModalOpen(false)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* Botão de Fechar */}
            <button
              onClick={() => setIsExpandedModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              title="Fechar"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Visualizador Expandido */}
            <div
              className="relative w-full aspect-video bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              {/* Ripas Verticais */}
              <div className="flex h-full w-full gap-0.5 p-8 bg-black">
                {generateRipas()}
              </div>

              {/* Informações da Cor */}
              <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-2xl border border-gray-600">
                <p className="text-xs font-bold text-gray-300 mb-1">
                  ACABAMENTO
                </p>
                <p className="text-lg font-semibold text-white">
                  {selectedColor.name}
                </p>
                <p className="text-sm text-gray-400">{selectedColor.hexCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
