import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ArrowRight, ShieldCheck, Star, Zap, AlertTriangle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLocation } from "wouter";
import ColorSelector from "@/components/ColorSelector";
import ExclusiveBonus from "@/components/ExclusiveBonus";
import { PRODUCT_LINES } from "@/lib/colors";
import { WoodColor } from "@/types/products";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPage4Us() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<WoodColor | undefined>(undefined);
  const [, setLocation] = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Solicitação recebida! Entraremos em contato em breve.");
    setIsSubmitting(false);
    setLocation("/obrigado");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header Minimalista */}
      <header className="py-4 border-b border-border/50 bg-white sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <img src="/images/logo_realiza_atualizada.jpeg" alt="Realiza" className="h-10 w-auto" />
          <div className="text-sm font-bold text-primary hidden md:block">
            Especialistas em Obras de Alto Padrão
          </div>
        </div>
      </header>

      {/* Hero Section - 4Us: Útil, Urgente, Único, Ultra-específico */}
      <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/landing_hero_modern.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ultra-específico */}
            <div className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm font-bold mb-6 border border-secondary/50 shadow-lg shadow-secondary/20">
              Para proprietários exigentes em fase de acabamento
            </div>
            
            {/* Útil + Único */}
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Elimine 100% do risco de infiltrações e ruídos na sua obra de alto padrão com a tecnologia <span className="text-secondary">Perfetta</span>.
            </h1>
            
            {/* Urgente */}
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Não feche contrato de esquadrias antes de conhecer o sistema que garante vedação absoluta e design invisível. Sua casa merece durar gerações, não apenas até a primeira chuva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#oferta-exclusiva">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold h-16 px-8 text-xl shadow-xl shadow-secondary/20 w-full sm:w-auto transform hover:scale-105 transition-all">
                  Quero Blindar Minha Obra
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60">
              <Clock className="inline w-4 h-4 mr-1" />
              Agenda de produção limitada para este mês
            </p>
          </div>
        </div>
      </section>

      {/* Problema Agitado (Pain Points) */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-primary mb-4">
              O pesadelo invisível das obras de luxo
            </h2>
            <p className="text-muted-foreground text-lg">
              80% das patologias pós-obra vêm de esquadrias mal especificadas. Você está construindo um sonho ou uma dor de cabeça futura?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-xl border border-red-100">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-red-900 mb-3">Infiltrações Silenciosas</h3>
              <p className="text-red-800/80">
                Água entrando pelo contramarco, estragando pisos de madeira nobre e criando mofo em paredes recém-pintadas.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-orange-900 mb-3">Ruído Insuportável</h3>
              <p className="text-orange-800/80">
                Investir milhões em uma casa e ouvir o trânsito como se estivesse na rua. O isolamento acústico falho destrói o conforto.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-gray-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Manutenção Eterna</h3>
              <p className="text-gray-700">
                Roldanas que travam, trilhos que acumulam sujeira e pintura que descasca em menos de 2 anos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solução Única (Perfetta) */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary/20 rounded-xl rotate-2 group-hover:rotate-1 transition-all duration-500"></div>
              <img 
                src="/images/tecnologia_perfetta.jpg" 
                alt="Tecnologia Perfetta" 
                className="relative rounded-xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-border">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Tecnologia</div>
                <div className="text-xl font-bold text-primary">Perfetta™ System</div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                A Solução Definitiva
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-6">
                Por que a Linha Perfetta é a única escolha lógica?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Enquanto o mercado foca apenas em vender alumínio por quilo, nós vendemos engenharia de precisão. A Linha Perfetta foi desenvolvida para resolver os problemas crônicos da construção civil brasileira.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Perfis minimalistas que desaparecem na parede (visão 98% vidro)",
                  "Sistema de drenagem oculta patenteado (adeus trilhos molhados)",
                  "Roldanas de aço inox blindadas para deslizamento leve por décadas",
                  "Vidros acústicos laminados que bloqueiam até 45dB de ruído",
                  "Pintura eletrostática com garantia de 10 anos (Certificação Qualicoat)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="mt-1 bg-green-100 p-1 rounded-full text-green-700 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social + Autoridade */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Quem confia na Realiza</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <Star className="w-8 h-8 text-secondary fill-secondary" />
              <span className="font-bold text-primary text-xl">+2.000</span>
              <span className="text-sm text-muted-foreground">Obras Entregues</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-secondary fill-secondary" />
              <span className="font-bold text-primary text-xl">10 Anos</span>
              <span className="text-sm text-muted-foreground">Garantia Estendida</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="w-8 h-8 text-secondary fill-secondary" />
              <span className="font-bold text-primary text-xl">100%</span>
              <span className="text-sm text-muted-foreground">Instalação Própria</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-primary mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">Tire suas dúvidas sobre a Linha Perfetta e nosso processo de trabalho.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "A Linha Perfetta é compatível com qualquer projeto?",
                a: "Sim. A Linha Perfetta é modular e 100% personalizável, adaptando-se a vãos de grandes dimensões, cantos em L e diferentes tipologias arquitetônicas."
              },
              {
                q: "Qual a diferença entre vidro laminado e temperado?",
                a: "O vidro laminado oferece maior segurança e isolamento acústico, pois possui uma película interna que segura os estilhaços. O temperado é mais resistente a impactos frontais. Nossos engenheiros especificam o ideal para cada ambiente."
              },
              {
                q: "Vocês atendem fora da capital?",
                a: "Atendemos em todo o estado e regiões vizinhas para projetos de alto padrão. Consulte nossa equipe para verificar a logística para sua cidade."
              },
              {
                q: "Qual o prazo médio de entrega?",
                a: "Para a Linha Perfetta, o prazo médio é de 45 a 60 dias após a medição final, garantindo a cura adequada da pintura e a precisão na montagem."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                  <span className="text-secondary">?</span> {faq.q}
                </h3>
                <p className="text-muted-foreground pl-6">{faq.a}</p>
              </div>
            ))}
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
      {/* Oferta Irresistível (Formulário) */}
      <section id="oferta-exclusiva" className="py-24 bg-gradient-to-b from-white to-muted/50">
        <div className="container max-w-5xl">
          <div className="bg-primary rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-primary/50">
            <div className="md:w-1/2 p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/BT6xBlgLFFsl.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10">
                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">
                  Agende uma Consultoria Técnica Gratuita
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  Nossos engenheiros vão analisar sua planta e mostrar exatamente onde você pode economizar sem perder qualidade, evitando os erros que custam caro depois.
                </p>
                <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm font-bold text-secondary mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-secondary" />
                    BÔNUS EXCLUSIVO HOJE:
                  </p>
                  <p className="text-base text-white font-medium">
                    Receba o "Guia Técnico Perfetta: 7 Erros Fatais em Esquadrias" imediatamente após o cadastro.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white p-10 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">Nome Completo</Label>
                  <Input id="name" {...register("name")} placeholder="Seu nome" className={`h-12 ${errors.name ? "border-red-500" : ""}`} />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Melhor E-mail</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" className={`h-12 ${errors.email ? "border-red-500" : ""}`} />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">WhatsApp</Label>
                  <Input id="phone" {...register("phone")} placeholder="(11) 99999-9999" className={`h-12 ${errors.phone ? "border-red-500" : ""}`} />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold h-14 text-lg shadow-lg shadow-secondary/20 mt-4">
                  {isSubmitting ? "Enviando..." : "Quero Minha Consultoria Grátis"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Seus dados estão 100% seguros. Não fazemos spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
