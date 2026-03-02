import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(10, "Mensagem muito curta"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-bold mb-6 border border-secondary/20">
                Fale com Especialistas
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Vamos conversar sobre sua obra?
              </h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Estamos prontos para oferecer a consultoria técnica que seu projeto de alto padrão merece. Não deixe para a última hora, garanta sua vaga na nossa agenda de produção.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-border">
                  <div className="bg-secondary/10 p-4 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-1">Telefone / WhatsApp</h3>
                    <p className="text-muted-foreground text-lg mb-1">(11) 99999-9999</p>
                    <p className="text-sm text-muted-foreground/80">Atendimento comercial ágil e direto</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-border">
                  <div className="bg-secondary/10 p-4 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-1">E-mail</h3>
                    <p className="text-muted-foreground text-lg mb-1">contato@realizaprojetos.com.br</p>
                    <p className="text-sm text-muted-foreground/80">Envie sua planta para orçamento detalhado</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-border">
                  <div className="bg-secondary/10 p-4 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-1">Endereço</h3>
                    <p className="text-muted-foreground text-lg mb-1">Rua Monica Scnavinatto, 57</p>
                    <p className="text-sm text-muted-foreground/80">Jardim Panorama, Itatiba - SP, 13251-785</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-border">
                  <div className="bg-secondary/10 p-4 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground text-lg mb-1">Segunda a Sexta: 08h às 18h</p>
                    <p className="text-sm text-muted-foreground/80">Sábado: 08h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/5 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display font-bold text-2xl text-primary">Envie uma mensagem</h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">Nome Completo</Label>
                  <Input id="name" {...register("name")} placeholder="Seu nome" className={`h-12 ${errors.name ? "border-red-500" : ""}`} />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">E-mail</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" className={`h-12 ${errors.email ? "border-red-500" : ""}`} />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">Telefone / WhatsApp</Label>
                  <Input id="phone" {...register("phone")} placeholder="(11) 99999-9999" className={`h-12 ${errors.phone ? "border-red-500" : ""}`} />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base">Como podemos ajudar?</Label>
                  <Textarea id="message" {...register("message")} placeholder="Conte sobre seu projeto, metragem aproximada e fase da obra..." className={`min-h-[150px] resize-none ${errors.message ? "border-red-500" : ""}`} />
                  {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg shadow-lg shadow-primary/20">
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem Agora"}
                  {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Contato */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-primary mb-4">Dúvidas sobre Atendimento</h2>
            <p className="text-muted-foreground">O que você precisa saber antes de entrar em contato.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-muted/10 rounded-xl shadow-sm border border-border px-6 py-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Qual o prazo de resposta do orçamento?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Para orçamentos preliminares baseados em medidas enviadas por e-mail ou WhatsApp, respondemos em até 48 horas úteis. Para projetos complexos que exigem análise técnica detalhada, o prazo é de 3 a 5 dias úteis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Vocês cobram pela visita técnica?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                A primeira visita para avaliação e medição técnica na região de Itatiba e arredores é gratuita. Para outras localidades, consulte nossa equipe comercial sobre a taxa de deslocamento (que é abatida no fechamento do contrato).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg text-primary">Quais as formas de pagamento?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Trabalhamos com condições facilitadas: parcelamento no cartão de crédito, boleto bancário ou desconto especial para pagamento à vista. Tudo formalizado em contrato para sua segurança.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Mapa */}
      <section className="h-[400px] w-full bg-muted relative border-t border-border">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.086963574864!2d-46.83856992386476!3d-23.16698997907246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf27c3c0a0a0a1%3A0x1c0c0c0c0c0c0c0c!2sR.%20Monica%20Scnavinatto%2C%2057%20-%20Jardim%20Panorama%2C%20Itatiba%20-%20SP%2C%2013251-785!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Realiza Projetos"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </section>
    </div>
  );
}
