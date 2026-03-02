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

export default function LandingPageAluminio() {
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
            Esquadrias em Alumínio de Qualidade
          </div>
        </div>
      </header>

      {/* Hero Section - Alumínio */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-900 to-orange-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/landing_hero_modern.jpg')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-500/50 shadow-lg shadow-orange-600/20">
              Qualidade Comprovada
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Esquadrias em alumínio que <span className="text-orange-300">duram décadas</span>.
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Combinamos tradição, tecnologia e precisão para oferecer esquadrias que protegem sua casa com elegância e durabilidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#oferta-exclusiva">
                <Button size="lg" className="bg-orange-400 text-orange-900 hover:bg-orange-300 font-bold h-16 px-8 text-xl shadow-xl shadow-orange-600/20 w-full sm:w-auto transform hover:scale-105 transition-all">
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

      {/* Vantagens do Alumínio */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-orange-900 mb-4">
              Alumínio: A Escolha Inteligente
            </h2>
            <p className="text-muted-foreground text-lg">
              Material versátil, resistente e econômico para residências e comércios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-200">
              <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-orange-900">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-orange-900 mb-3">Leveza e Resistência</h3>
              <p className="text-orange-800/80">
                Material leve que não compromete a estrutura, com resistência excepcional a corrosão.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-200">
              <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-orange-900">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-orange-900 mb-3">Baixa Manutenção</h3>
              <p className="text-orange-800/80">
                Não enferruja, não apodrece. Uma limpeza simples mantém a beleza por anos.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-200">
              <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-orange-900">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-orange-900 mb-3">Melhor Custo-Benefício</h3>
              <p className="text-orange-800/80">
                Investimento inteligente que oferece qualidade sem comprometer o orçamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Alumínio */}
      <section className="py-20 bg-orange-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-orange-900 mb-4">Dúvidas sobre Alumínio</h2>
            <p className="text-muted-foreground">Tudo que você precisa saber sobre esquadrias em alumínio.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-orange-200 px-6 py-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg text-orange-900">O alumínio enferruja?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Não. O alumínio é naturalmente resistente à corrosão. Forma uma camada de óxido que o protege, mesmo em ambientes litorâneos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg text-orange-900">Qual é a vida útil do alumínio?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Com manutenção básica, esquadrias em alumínio duram 30+ anos. Muitas estruturas antigas ainda funcionam perfeitamente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg text-orange-900">Como limpar e manter?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Simples: água, sabão neutro e pano macio. Anualmente, lubrifique as dobradiças e trilhos com óleo silicone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg text-orange-900">Qual é o prazo de entrega?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Prazo médio de 20 a 30 dias após confirmação do projeto. Instalação rápida: 2 a 5 dias dependendo da metragem.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Oferta Irresistível (Formulário) */}
      <section id="oferta-exclusiva" className="py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="container max-w-5xl">
          <div className="bg-gradient-to-r from-orange-900 to-orange-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-900/50">
            <div className="md:w-1/2 p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/BT6xBlgLFFsl.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10">
                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">
                  Orçamento Sem Compromisso
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  Receba um orçamento detalhado com todas as especificações técnicas em até 48 horas.
                </p>
                <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm font-bold text-orange-300 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-orange-300" />
                    BÔNUS EXCLUSIVO:
                  </p>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-300" />
                      Guia Completo de Cores
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-300" />
                      Catálogo de Modelos PDF
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-300" />
                      Dicas de Manutenção
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-300" />
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
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold h-14 text-lg shadow-lg shadow-orange-600/20 mt-4">
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
