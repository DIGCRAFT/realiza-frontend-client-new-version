import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, MapPin, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLocation } from "wouter";
import WhatsAppButton from "@/components/WhatsAppButton";
import ColorSelector from "@/components/ColorSelector";
import ColorVisualizer from "@/components/ColorVisualizer";
import { ProductLineConfig, WoodColor } from "@/types/products";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
  cep: z.string().min(8, "CEP inválido"),
  rua: z.string().min(3, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
  productLine: z.string().min(1, "Selecione uma linha"),
  color: z.string().min(1, "Selecione uma cor"),
});

type FormData = z.infer<typeof formSchema>;

// Configurações das linhas de produtos - ATUALIZADAS
const productConfigs: Record<string, ProductLineConfig> = {
  perfetta: {
    id: "perfetta",
    name: "Perfetta",
    displayName: "Linha Perfetta™",
    description:
      "Design minimalista invisível, isolamento acústico absoluto e vedação hermética.",
    colors: [
      {
        id: "1",
        name: "SAND ASH",
        hexCode: "#5C4033",
        category: "wood",
        imageName: "panel_sand-ash.png",
      },
      {
        id: "2",
        name: "BRANCO DECO",
        hexCode: "#6B4423",
        category: "wood",
        imageName: "panel_branco-deco.png",
      },
      {
        id: "3",
        name: "CARVALHO ASH",
        hexCode: "#8B6F47",
        category: "wood",
        imageName: "panel_carvalho-ash.png",
      },
      {
        id: "4",
        name: "CARVALHO ESCURO",
        hexCode: "#9B7653",
        category: "wood",
        imageName: "panel_carvalho-escuro.png",
      },
      {
        id: "5",
        name: "CARVALHO FIAMMATO",
        hexCode: "#A0826D",
        category: "wood",
        imageName: "panel_carvalho-fiammato.png",
      },
      {
        id: "6",
        name: "CARVALHO RANOLIT",
        hexCode: "#B87A5A",
        category: "wood",
        imageName: "panel_carvalho-ranolit.png",
      },
    ],
    solidColors: [
      {
        id: "7",
        name: "Branco",
        hexCode: "#FFFFFF",
        category: "solid",
        slatImage: "esquadria-cor-branco.png",
      },
      {
        id: "8",
        name: "Preto",
        hexCode: "#1A1A1A",
        category: "solid",
        slatImage: "esquadria-cor-preta.png",
      },
      {
        id: "9",
        name: "Alumínio",
        hexCode: "#C0C0C0",
        category: "solid",
        slatImage: "esquadria-cor-aluminio.jpeg",
      },
      {
        id: "10",
        name: "Aço Cortêm",
        hexCode: "#C0C0C0",
        category: "solid",
        slatImage: "esquadria-cor-aco_cortem.png",
      },
    ],
  },
  gold: {
    id: "gold",
    name: "Gold",
    displayName: "Linha Gold",
    description:
      "Qualidade superior com excelente custo-benefício. Ideal para projetos residenciais e comerciais.",
    colors: [
      {
        id: "10",
        name: "Carvalho Escuro",
        hexCode: "#5C4033",
        category: "wood",
      },
      { id: "11", name: "Nogueira", hexCode: "#6B4423", category: "wood" },
      { id: "12", name: "Teca", hexCode: "#8B6F47", category: "wood" },
      { id: "13", name: "Jatobá", hexCode: "#9B7653", category: "wood" },
    ],
    solidColors: [
      { id: "14", name: "Branco", hexCode: "#FFFFFF", category: "solid" },
      { id: "15", name: "Preto", hexCode: "#1A1A1A", category: "solid" },
      { id: "16", name: "Alumínio", hexCode: "#C0C0C0", category: "solid" },
    ],
  },
  portas: {
    id: "portas",
    name: "Portas de Entrada",
    displayName: "Portas de Entrada",
    description:
      "Portas pivotantes e de entrada em alumínio de alto padrão. Imponência e segurança.",
    colors: [
      {
        id: "17",
        name: "Carvalho Escuro",
        hexCode: "#5C4033",
        category: "wood",
      },
      { id: "18", name: "Nogueira", hexCode: "#6B4423", category: "wood" },
      { id: "19", name: "Teca", hexCode: "#8B6F47", category: "wood" },
      { id: "20", name: "Jatobá", hexCode: "#9B7653", category: "wood" },
      { id: "21", name: "Ipê", hexCode: "#A0826D", category: "wood" },
    ],
    solidColors: [
      { id: "22", name: "Branco", hexCode: "#FFFFFF", category: "solid" },
      { id: "23", name: "Preto", hexCode: "#1A1A1A", category: "solid" },
      { id: "24", name: "Bronze", hexCode: "#8B6914", category: "solid" },
    ],
  },
  brise: {
    id: "brise",
    name: "Brise/Painéis",
    displayName: "Brise/Painéis",
    description:
      "Brises e painéis decorativos em alumínio. Estética e funcionalidade para fachadas modernas.",
    colors: [
      {
        id: "25",
        name: "Carvalho Escuro",
        hexCode: "#5C4033",
        category: "wood",
      },
      { id: "26", name: "Nogueira", hexCode: "#6B4423", category: "wood" },
      { id: "27", name: "Teca", hexCode: "#8B6F47", category: "wood" },
      { id: "28", name: "Ipê", hexCode: "#A0826D", category: "wood" },
    ],
    solidColors: [
      { id: "29", name: "Branco", hexCode: "#FFFFFF", category: "solid" },
      { id: "30", name: "Preto", hexCode: "#1A1A1A", category: "solid" },
      { id: "31", name: "Alumínio", hexCode: "#C0C0C0", category: "solid" },
      { id: "32", name: "Bronze", hexCode: "#8B6914", category: "solid" },
    ],
  },
};

export default function OrcamentoInterativo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLine, setSelectedLine] = useState<
    "perfetta" | "gold" | "portas" | "brise"
  >("perfetta");
  const [selectedColor, setSelectedColor] = useState<WoodColor | undefined>(
    undefined
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productLine: "perfetta",
      color: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  // Ler parâmetro de URL para pré-selecionar a linha
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const lineParam = searchParams.get("linha");

    if (
      lineParam &&
      ["perfetta", "gold", "portas", "brise"].includes(lineParam)
    ) {
      setSelectedLine(lineParam as "perfetta" | "gold" | "portas" | "brise");
      setValue("productLine", lineParam);
    }
  }, [setValue]);

  const cepValue = watch("cep");

  // Buscar endereço pelo CEP
  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cepValue?.replace(/\D/g, "");
      if (cleanCep?.length === 8) {
        setIsLoadingCep(true);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`
          );
          const data = await response.json();

          if (!data.erro) {
            setValue("rua", data.logradouro || "");
            setValue("bairro", data.bairro || "");
            setValue("cidade", data.localidade || "");
            setValue("estado", data.uf || "");
            toast.success("Endereço encontrado!");
          } else {
            toast.error("CEP não encontrado");
          }
        } catch (error) {
          toast.error("Erro ao buscar CEP");
        } finally {
          setIsLoadingCep(false);
        }
      }
    };

    const timer = setTimeout(fetchAddress, 500);
    return () => clearTimeout(timer);
  }, [cepValue, setValue]);

  const lineColors: Record<
    string,
    { name: string; description: string; badge: string; badgeColor: string }
  > = {
    perfetta: {
      name: "Linha Perfetta™",
      description:
        "Design minimalista invisível, isolamento acústico absoluto e vedação hermética.",
      badge: "Premium",
      badgeColor: "bg-primary",
    },
    gold: {
      name: "Linha Gold",
      description:
        "Qualidade superior com excelente custo-benefício para projetos residenciais.",
      badge: "Intermediária",
      badgeColor: "bg-amber-600",
    },
    portas: {
      name: "Portas de Entrada",
      description: "Portas pivotantes e de entrada em alumínio de alto padrão.",
      badge: "Especial",
      badgeColor: "bg-blue-600",
    },
    brise: {
      name: "Brise/Painéis",
      description: "Brises e painéis decorativos para fachadas modernas.",
      badge: "Decorativo",
      badgeColor: "bg-green-600",
    },
  };

  const handleColorSelect = (color: WoodColor) => {
    setSelectedColor(color);
    setValue("color", color.name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/zip",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name}: Tipo de arquivo não suportado`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name}: Arquivo muito grande (máx 10MB)`);
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (!selectedColor) {
      toast.error("Por favor, selecione uma cor");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Solicitação recebida! Entraremos em contato em breve.");
    setIsSubmitting(false);
    setLocation("/obrigado");
  };

  const currentLine = lineColors[selectedLine];
  const currentLineConfig = productConfigs[selectedLine];

  return (
    <div className="min-h-screen bg-background font-sans">
      <WhatsAppButton />

      {/* Main Content */}
      <main className="py-12">
        <div className="container">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-primary">
              Crie Seu Orçamento Personalizado
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha a linha de produtos e a cor perfeita para seu projeto.
              Nossos especialistas analisarão sua solicitação e enviarão um
              orçamento detalhado em até 48 horas.
            </p>
          </div>

          {/* Three Column Layout with Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left: Product Line Selection - STICKY */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <h3 className="font-display font-bold text-2xl mb-6 text-primary">
                1. Escolha a Linha
              </h3>

              <div className="space-y-4">
                {Object.entries(lineColors).map(([key, line]) => {
                  const isDisabled =
                    key === "gold" || key === "portas" || key === "brise";
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (isDisabled) return;
                        setSelectedLine(
                          key as "perfetta" | "gold" | "portas" | "brise"
                        );
                        setSelectedColor(undefined);
                        setValue("productLine", key);
                      }}
                      disabled={isDisabled}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        isDisabled
                          ? "border-border bg-gray-100 opacity-60 cursor-not-allowed"
                          : selectedLine === key
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-lg">{line.name}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${line.badgeColor}`}
                        >
                          {line.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {line.description}
                      </p>
                      {selectedLine === key && (
                        <div className="mt-4 flex items-center gap-2 text-primary">
                          <Check className="h-5 w-5" />
                          <span className="text-sm font-bold">Selecionado</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center & Right: Color Selection and Form */}
            <div className="lg:col-span-2">
              <h3 className="font-display font-bold text-2xl mb-6 text-primary">
                2. Escolha a Cor
              </h3>

              <ColorSelector
                productLine={currentLineConfig}
                onColorSelect={handleColorSelect}
                selectedColor={selectedColor}
              />

              {/* Visualizador de Cores com Imagem de Casa */}
              {selectedColor && (
                <div className="mt-8">
                  <ColorVisualizer
                    selectedColor={selectedColor}
                    productLine={currentLine.name}
                  />
                </div>
              )}

              {/* Form */}
              <div className="mt-12">
                <h3 className="font-display font-bold text-2xl mb-6 text-primary">
                  3. Seus Dados
                </h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-6"
                >
                  {/* Dados Pessoais */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp *</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* CEP */}
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP *</Label>
                      <div className="relative">
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          {...register("cep")}
                          className={errors.cep ? "border-red-500" : ""}
                          maxLength={9}
                        />
                        {isLoadingCep && (
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-pulse text-primary" />
                        )}
                      </div>
                      {errors.cep && (
                        <p className="text-xs text-red-500">
                          {errors.cep.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="rua">Rua *</Label>
                      <Input
                        id="rua"
                        placeholder="Nome da rua"
                        {...register("rua")}
                        className={errors.rua ? "border-red-500" : ""}
                      />
                      {errors.rua && (
                        <p className="text-xs text-red-500">
                          {errors.rua.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numero">Número *</Label>
                      <Input
                        id="numero"
                        placeholder="123"
                        {...register("numero")}
                        className={errors.numero ? "border-red-500" : ""}
                      />
                      {errors.numero && (
                        <p className="text-xs text-red-500">
                          {errors.numero.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Complemento */}
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      placeholder="Apto, bloco, etc"
                      {...register("complemento")}
                    />
                  </div>

                  {/* Bairro, Cidade, Estado */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro *</Label>
                      <Input
                        id="bairro"
                        placeholder="Bairro"
                        {...register("bairro")}
                        className={errors.bairro ? "border-red-500" : ""}
                      />
                      {errors.bairro && (
                        <p className="text-xs text-red-500">
                          {errors.bairro.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        placeholder="Cidade"
                        {...register("cidade")}
                        className={errors.cidade ? "border-red-500" : ""}
                      />
                      {errors.cidade && (
                        <p className="text-xs text-red-500">
                          {errors.cidade.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado *</Label>
                      <Input
                        id="estado"
                        placeholder="SP"
                        {...register("estado")}
                        maxLength={2}
                        className={errors.estado ? "border-red-500" : ""}
                      />
                      {errors.estado && (
                        <p className="text-xs text-red-500">
                          {errors.estado.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Upload de Projetos */}
                  <div className="space-y-2">
                    <Label htmlFor="upload">
                      Upload de Projetos (Opcional)
                    </Label>
                    <label
                      htmlFor="upload"
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Clique para fazer upload ou arraste arquivos aqui
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, JPG, PNG, ZIP (máx 10MB por arquivo)
                        </p>
                      </div>
                      <input
                        id="upload"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.zip"
                      />
                    </label>

                    {/* Arquivos Enviados */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Resumo */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-bold mb-4">Resumo do Orçamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Linha:</span>
                        <span className="font-medium">{currentLine.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cor:</span>
                        <span className="font-medium">
                          {selectedColor?.name || "Não selecionada"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-bold"
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Seus dados estão 100% seguros. Não fazemos spam.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 border-t">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Dúvidas? Fale com nossos especialistas
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Nosso time está pronto para ajudar você a escolher a melhor solução
            para seu projeto.
          </p>
          <Button
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
            className="bg-white text-primary hover:bg-gray-100"
            size="lg"
          >
            Conversar no WhatsApp
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
