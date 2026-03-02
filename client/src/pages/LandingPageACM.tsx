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
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
});

type FormData = z.infer<typeof formSchema>;

export default function LandingPageACM() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      <WhatsAppButton />
      
      {/* Header Minimalista */}
      <header className="py-4 border-b border-border/50 bg-white sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <img src="/images/logo_realiza_atualizada.jpeg" alt="Realiza" className="h-10 w-auto" />
          <div className="text-sm font-bold text-primary hidden md:block">
            Revestimentos em ACM para Fachadas Modernas
          </div>
        </div>
      </header>

      {/* Hero Section - ACM */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-900 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ruido_high_quality.jpg')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 border border-amber-500/50 shadow-lg shadow-amber-600/20">
              Revestimento Premium para Fachadas
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Fachadas que impressionam com <span className="text-amber-300">durabilidade e design</span>.
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              O ACM (Alumínio Composto) oferece a perfeita combinação entre estética contemporânea e resistência estrutural. Ideal para projetos comerciais e residenciais de alto padrão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#oferta-exclusiva">
                <Button size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300 font-bold h-16 px-8 text-xl shadow-xl shadow-amber-600/20 w-full sm:w-auto transform hover:scale-105 transition-all">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60">
              <Clock className="inline w-4 h-4 mr-1" />
              Consulta técnica gratuita
            </p>
          </div>
        </div>
      </section>

      {/* Vantagens do ACM */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-amber-900 mb-4">
              Por que escolher ACM?
            </h2>
            <p className="text-muted-foreground text-lg">
              Material versátil que combina beleza, durabilidade e funcionalidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-8 rounded-xl border border-amber-200">
              <div className="bg-amber-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-amber-900">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3">Design Versátil</h3>
              <p className="text-amber-800/80">
                Cores e acabamentos personalizáveis que se adaptam a qualquer estilo arquitetônico.
              </p>
            </div>
            <div className="bg-amber-50 p-8 rounded-xl border border-amber-200">
              <div className="bg-amber-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-amber-900">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3">Resistência Comprovada</h3>
              <p className="text-amber-800/80">
                Suporta variações climáticas extremas, UV intenso e maresia sem perder qualidade.
              </p>
            </div>
            <div className="bg-amber-50 p-8 rounded-xl border border-amber-200">
              <div className="bg-amber-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-amber-900">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3">Instalação Rápida</h3>
              <p className="text-amber-800/80">
                Sistema modular que reduz tempo de obra e custos de mão de obra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACM */}
      <section className="py-20 bg-amber-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-amber-900 mb-4">Dúvidas sobre ACM</h2>
            <p className="text-muted-foreground">Tudo que você precisa saber sobre este material premium.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-amber-200 px-6 py-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg text-amber-900">O ACM é resistente a intempéries?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim. O ACM é altamente resistente a chuva, vento, UV e variações de temperatura. Mantém suas propriedades por 20+ anos com manutenção mínima.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg text-amber-900">Qual é o custo-benefício comparado a outros materiais?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                O ACM oferece excelente relação custo-benefício. Mais econômico que vidro estrutural, mais durável que pintura tradicional, e com design superior.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg text-amber-900">Pode ser instalado em qualquer clima?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim. O ACM é testado para climas tropicais, desérticos e temperados. Funciona perfeitamente em regiões litorâneas com alta salinidade.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg text-amber-900">Qual é o prazo de entrega?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Prazo médio de 30 a 45 dias após confirmação do projeto. Instalação rápida: 5 a 10 dias dependendo da metragem.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Oferta Irresistível (Formulário) */}
      <section id="oferta-exclusiva" className="py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container max-w-5xl">
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-900/50">
            <div className="md:w-1/2 p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/BT6xBlgLFFsl.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10">
                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">
                  Projeto em ACM? Comece Aqui
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  Receba uma análise técnica completa e orçamento detalhado em até 48 horas.
                </p>
                <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-300" />
                    BÔNUS EXCLUSIVO:
                  </p>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      Guia de Cores e Acabamentos
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      Catálogo Técnico Completo
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      Especificações de Instalação
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      Acesso ao Seletor de Cores
                    </li>
                  </ul>
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
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-14 text-lg shadow-lg shadow-amber-600/20 mt-4">
                  {isSubmitting ? "Enviando..." : "Solicitar Orçamento Agora"}
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
