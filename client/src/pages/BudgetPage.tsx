import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ColorSelector from "@/components/ColorSelector";
import ExclusiveBonus from "@/components/ExclusiveBonus";
import { PRODUCT_LINES } from "@/lib/colors";
import { ProductLine, WoodColor } from "@/types/products";
import WhatsAppButton from "@/components/WhatsAppButton";

const budgetFormSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.email({ message: "E-mail inválido" }),
  phone: z.string().min(10, "Telefone inválido"),
  productLine: z.string().min(1, "Selecione uma linha"),
  message: z.string().optional(),
});

type BudgetFormData = z.infer<typeof budgetFormSchema>;

export default function BudgetPage() {
  const [selectedLine, setSelectedLine] = useState<ProductLine>("perfetta");
  const [selectedColor, setSelectedColor] = useState<WoodColor | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      productLine: "perfetta",
    },
  });

  const currentLine = PRODUCT_LINES[selectedLine];
  const watchedLine = watch("productLine") as unknown as ProductLine;

  React.useEffect(() => {
    // se o form trouxer algo inesperado, não deixa selectedLine ficar inválida
    if (watchedLine && watchedLine in PRODUCT_LINES) {
      setSelectedLine(watchedLine);
    } else {
      setSelectedLine("perfetta");
    }
    setSelectedColor(undefined);
  }, [watchedLine]);

  const onSubmit = async (data: BudgetFormData) => {
    if (!selectedColor) {
      toast.error("Por favor, selecione uma cor");
      return;
    }

    setIsSubmitting(true);

    try {
      //       // Simular envio para WhatsApp
      //       const message = `
      // *Solicitação de Orçamento - Realiza Alumínio*
      //
      // *Dados do Cliente:*
      // Nome: ${data.name}
      // Email: ${data.email}
      // Telefone: ${data.phone}
      //
      // *Produto:*
      // Linha: ${currentLine.displayName}
      // Cor Selecionada: ${selectedColor.name} (${selectedColor.hexCode})
      //
      // ${data.message ? `*Observações:*\n${data.message}` : ""}
      //
      // Clique no link para responder: https://wa.me/seu-numero
      //       `.trim();

      // Aqui você pode integrar com a API do WhatsApp ou enviar email
      console.log("Orçamento enviado:", { ...data, selectedColor });

      toast.success(
        "Orçamento enviado com sucesso! Entraremos em contato em breve."
      );
      setSubmitted(true);

      // Reset form após 2 segundos
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error("Erro ao enviar orçamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <WhatsAppButton />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white py-6 sticky top-0 z-40">
        <div className="container">
          <h1 className="text-3xl font-bold text-slate-900">
            Solicitar Orçamento
          </h1>
          <p className="mt-2 text-slate-600">
            Escolha a linha de produto, selecione a cor e envie sua solicitação
          </p>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulário e Seletor */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seleção de Linha */}
            <Card>
              <CardHeader>
                <CardTitle>1. Escolha a Linha de Produto</CardTitle>
                <CardDescription>
                  Selecione a linha que melhor atende suas necessidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="product-line"
                      className="text-base font-semibold"
                    >
                      Linha de Produto
                    </Label>
                    <Select
                      value={selectedLine}
                      onValueChange={value => {
                        setSelectedLine(value as unknown as ProductLine);
                        setValue("productLine", value);
                      }}
                    >
                      <SelectTrigger
                        id="product-line"
                        className="mt-2 text-base"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PRODUCT_LINES).map(([key, line]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {line.displayName}
                              </span>
                              <span className="text-xs text-slate-500">
                                ({line.name})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descrição da linha */}
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-sm text-slate-700">
                      {currentLine.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seletor de Cores */}
            <ColorSelector
              productLine={currentLine}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            {/* Formulário de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>2. Seus Dados</CardTitle>
                <CardDescription>
                  Preencha seus dados para receber o orçamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Mensagem Adicional (Opcional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Descreva seu projeto, quantidade, prazos, etc."
                      rows={4}
                      {...register("message")}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 gap-2"
                    disabled={isSubmitting || !selectedColor}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Orçamento"}
                    <Send className="h-4 w-4" />
                  </Button>

                  {submitted && (
                    <div className="rounded-lg bg-green-50 p-4 flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span>Orçamento enviado com sucesso!</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Resumo e Bônus */}
          <div className="space-y-6">
            {/* Resumo da Seleção */}
            <Card className="sticky top-24 border-2 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo da Seleção</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Linha Selecionada
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {currentLine.displayName}
                  </p>
                </div>

                {selectedColor && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Cor Selecionada
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-lg border-2 border-slate-200 shadow-sm"
                        style={{ backgroundColor: selectedColor.hexCode }}
                      />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {selectedColor.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {selectedColor.hexCode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedColor && (
                  <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Selecione uma cor acima
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bônus Exclusivo para LP-Alumínio */}
            {selectedLine === "aluminio" && (
              <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
                  <span className="text-xs font-bold text-amber-700">
                    EXCLUSIVO
                  </span>
                </div>
                <h3 className="font-bold text-amber-900">
                  Receba um Bônus Especial!
                </h3>
                <p className="mt-2 text-sm text-amber-800">
                  Ao solicitar orçamento pela linha Alumínio, você recebe nosso
                  guia exclusivo:
                  <strong className="block mt-2">
                    "Erros que Economizam Milhares"
                  </strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bônus Exclusivo Full Width */}
        {selectedLine === "aluminio" && (
          <div className="mt-16">
            <ExclusiveBonus
              onDownload={() => {
                toast.success("Guia enviado para seu e-mail!");
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
