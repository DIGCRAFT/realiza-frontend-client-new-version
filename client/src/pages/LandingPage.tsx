import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, AlertTriangle, ArrowRight, ShieldCheck, Clock, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useLocation } from "wouter";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ColorSelector from "@/components/ColorSelector";
import ExclusiveBonus from "@/components/ExclusiveBonus";
import { PRODUCT_LINES } from "@/lib/colors";
import { WoodColor } from "@/types/products";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().min(2, "Cidade é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<WoodColor | undefined>(undefined);
  const [, setLocation] = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Solicitação recebida com sucesso!");
    setIsSubmitting(false);
    setLocation("/obrigado");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <ExitIntentPopup />
      {/* Header Simplificado para LP */}
      <header className="py-6 border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white/80"></div>
                <div className="w-1.5 h-1.5 bg-white/80"></div>
                <div className="w-1.5 h-1.5 bg-white/80"></div>
                <div className="w-1.5 h-1.5 bg-secondary"></div>
              </div>
            </div>
            <img src="/images/logo_realiza_atualizada.jpeg" alt="Realiza Projetos em Alumínio" className="h-12 w-auto rounded-full" />
          </div>
          <a href="#form-orcamento">
            <Button size="sm" className="bg-secondary text-primary hover:bg-secondary/90 font-bold">
              Solicitar Orçamento
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section LP */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide mb-6">
                <AlertTriangle className="w-3 h-3" />
                Evite dores de cabeça na obra
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
                Conheça a Linha <span className="text-secondary">Perfetta</span>: O ápice da tecnologia em alumínio
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Não é apenas uma esquadria, é uma revolução. Perfis invisíveis, isolamento acústico superior e a garantia de uma obra que impressiona em cada detalhe.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Vedação perfeita contra água e ruído",
                  "Acabamento impecável de alto padrão",
                  "Entrega no prazo garantida em contrato",
                  "Atendimento em todo Estado de SP"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#form-orcamento" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg shadow-lg shadow-primary/20">
                    Quero um Orçamento Seguro
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-2xl rotate-3 transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/landing_hero_modern.jpg" 
                alt="Obra de alto padrão Realiza" 
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-lg shadow-xl border border-border max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                        User
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-primary">+2.000</div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Clientes satisfeitos com a entrega da Realiza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-6">
              Por que a Linha Perfetta está anos-luz à frente?
            </h2>
            <p className="text-muted-foreground text-lg">
              Enquanto o mercado oferece o básico, a Perfetta entrega engenharia de precisão. Veja a diferença entre o comum e o extraordinário.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/images/infiltracao_high_quality.jpg",
                title: "Infiltrações e Mofo",
                text: "Esquadrias mal vedadas permitem a entrada de água, estragando pisos, móveis e pintura."
              },
              {
                image: "/images/ruido_high_quality.jpg",
                title: "Ruído Excessivo",
                text: "Sem o isolamento acústico adequado, sua casa perde o conforto e a privacidade que você merece."
              },
              {
                image: "/images/desvalorizacao_high_quality.jpg",
                title: "Desvalorização",
                text: "Acabamentos ruins depreciam o valor do imóvel na hora da revenda. O alto padrão exige excelência."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-red-100 hover:border-red-300 transition-all overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-red-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full z-20 shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display font-bold text-xl mb-4 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Solução / Diferenciais */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Por que a Realiza é a escolha segura para seu projeto
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Não vendemos apenas esquadrias de alto padrão. Entregamos engenharia, design e a garantia de que tudo funcionará perfeitamente por décadas.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <ShieldCheck />, title: "Garantia Real", desc: "Contrato formal de produto e instalação." },
                  { icon: <Clock />, title: "Prazo Cumprido", desc: "Cronograma seguido à risca para não atrasar sua obra." },
                  { icon: <ThumbsUp />, title: "Instalação Própria", desc: "Nada de terceirizados sem qualificação." },
                  { icon: <Check />, title: "Linhas Premium", desc: "Gold, Suprema e linhas minimalistas de alta performance." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-secondary mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
              <img 
                src="/images/COb8XUwfX6NN.jpg" 
                alt="Obra Realiza" 
                className="rounded-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seletor de Cores */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4 text-center">Escolha a Cor Perfeita para Sua Obra</h2>
            <p className="text-muted-foreground text-lg text-center mb-12">
              Visualize como a Linha Perfetta ficará em seu projeto com nossas cores amadeirado premium e acabamentos sólidos.
            </p>
            <ColorSelector
              productLine={PRODUCT_LINES.perfetta}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </div>
        </div>
      </section>

      {/* Bônus Exclusivo */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-white">
        <div className="container">
          <ExclusiveBonus
            title="Bônus Exclusivo: 7 Erros Fatais em Esquadrias"
            onDownload={() => {
              toast.success("Guia enviado para seu e-mail!");
            }}
          />
        </div>
      </section>

      {/* Formulário de Captura */}
      <section id="form-orcamento" className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-3xl mb-4">Solicite sua Avaliação</h3>
                <p className="text-white/70 mb-8">
                  Preencha o formulário e um de nossos consultores técnicos entrará em contato para entender seu projeto.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="text-secondary w-5 h-5" />
                    Orçamento detalhado sem compromisso
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="text-secondary w-5 h-5" />
                    Visita técnica se necessário
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="text-secondary w-5 h-5" />
                    Consultoria de estilo e performance
                  </li>
                </ul>
              </div>
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-xs text-white/50">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" {...register("name")} placeholder="Seu nome" className={errors.name ? "border-red-500" : ""} />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" className={errors.email ? "border-red-500" : ""} />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input id="phone" {...register("phone")} placeholder="(11) 99999-9999" className={errors.phone ? "border-red-500" : ""} />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade da Obra</Label>
                  <Input id="city" {...register("city")} placeholder="Ex: Campinas, Alphaville..." className={errors.city ? "border-red-500" : ""} />
                  {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold h-12 text-lg">
                  {isSubmitting ? "Enviando..." : "Solicitar Contato Agora"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display font-bold text-3xl text-center mb-12 text-primary">Perguntas Frequentes</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Qual a diferença real entre a Linha Perfetta e a Gold comum?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                A Linha Gold é um padrão de mercado de 20 anos atrás. A Linha Perfetta é engenharia moderna: perfis 40% mais finos (minimalistas), roldanas blindadas que suportam o dobro do peso e vedação tripla com EPDM (borracha automotiva) em vez de felpa comum. É a diferença entre uma janela que "fecha" e uma esquadria que "blinda" sua casa.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Vocês instalam o contramarco ou só a esquadria?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Fazemos questão de instalar o contramarco. É a "fundação" da esquadria. Se o pedreiro instalar torto, a melhor janela do mundo não vai funcionar. Nossa equipe técnica instala o contramarco com nível a laser para garantir que o vão esteja geometricamente perfeito para receber a caixilharia final.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">O vidro acústico realmente funciona?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim, mas apenas se a esquadria for compatível. Não adianta colocar um vidro grosso em um perfil que vaza ar. Nossas linhas são projetadas com câmaras acústicas que, combinadas com vidros laminados ou insulados, podem reduzir até 45dB de ruído externo, transformando sua casa em um santuário de silêncio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Qual o prazo de entrega para uma casa completa?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Trabalhamos com cronograma travado em contrato. Para obras completas de alto padrão, o prazo médio é de 45 a 60 dias após a medição final dos vãos. Não pegamos mais obras do que nossa capacidade fabril permite, justamente para honrar a data de entrega da sua chave.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer Simplificado */}
      <footer className="bg-primary text-white py-8 text-center text-sm">
        <div className="container">
          <p>© {new Date().getFullYear()} Realiza Projetos em Alumínio. Todos os direitos reservados.</p>
          <p className="text-white/50 mt-2">CNPJ: 00.000.000/0001-00 | Itatiba - SP</p>
        </div>
      </footer>
    </div>
  );
}
