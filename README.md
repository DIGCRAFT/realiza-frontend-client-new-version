# 🚀 Realiza Alumínio - Landing Pages Otimizadas para Conversão.

Projeto de landing pages profissionais para a empresa **Realiza Projetos em Alumínio**, especializada em esquadrias de alto padrão (linhas SUPREMA, GOLD e PERFETTA).

## 📊 Visão Geral do Projeto

Este projeto implementa um conjunto completo de landing pages com foco em **conversão máxima**, incluindo:

- **ColorSelector**: Seletor interativo de cores amadeirado e sólidas
- **ExclusiveBonus**: Bônus exclusivo com guia de economia
- **BudgetPage**: Página de orçamento completa
- **Otimizações de Conversão**: Copywriting, design e UX otimizados

## 🎯 Funcionalidades Principais

### 1. Seletor de Cores Interativo
O **ColorSelector** permite que clientes visualizem as cores disponíveis em tempo real:
- 12 cores amadeirado (Sand Ash, Branco Ártico, Carvalho Claro, etc.)
- 3 cores sólidas (Branco, Preto, Alumínio)
- Preview em tempo real
- Integrado em todas as landing pages

### 2. Bônus Exclusivo
O **ExclusiveBonus** oferece valor imediato aos visitantes:
- 6 erros comuns em esquadrias com economia estimada
- Design atraente com gradientes
- CTA para download
- Aumenta taxa de captura de leads

### 3. Página de Orçamento
A **BudgetPage** completa o fluxo de conversão:
- Integração com ColorSelector
- Formulário de contato
- Resumo de seleção
- Rota dedicada (/orcamento)

## 🏗️ Estrutura do Projeto

```
realiza-aluminio/
├── src/
│   ├── components/
│   │   ├── ui/                    # 53 componentes Radix UI
│   │   ├── ColorSelector.tsx      # Seletor de cores
│   │   ├── ExclusiveBonus.tsx     # Bônus exclusivo
│   │   ├── Layout.tsx             # Layout principal
│   │   ├── WhatsAppButton.tsx     # Botão WhatsApp
│   │   └── ...
│   ├── pages/
│   │   ├── LandingPage.tsx        # LP-Alumínio (com ColorSelector)
│   │   ├── LandingPage4Us.tsx     # LP-Perfetta (com ColorSelector)
│   │   ├── BudgetPage.tsx         # Página de orçamento
│   │   ├── Home.tsx               # Página inicial
│   │   ├── Contato.tsx            # Página de contato
│   │   └── ...
│   ├── lib/
│   │   ├── colors.ts              # Paleta de cores (12 + 3)
│   │   ├── utils.ts               # Utilitários
│   │   └── const.ts               # Constantes
│   ├── context/
│   │   └── ThemeContext.tsx       # Contexto de tema
│   ├── hooks/
│   │   ├── useComposition.ts      # Hook de composição
│   │   ├── useMobile.tsx          # Hook de mobile
│   │   └── usePersistFn.ts        # Hook de persistência
│   ├── App.tsx                    # Rotas principais
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Estilos globais
├── public/
│   └── images/                    # 30+ imagens de alta qualidade
├── server/
│   └── index.ts                   # Backend Express
├── patches/
│   └── wouter@3.7.1.patch         # Patch de roteamento
└── README.md                      # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
cd realiza-aluminio
pnpm install
```

### Desenvolvimento
```bash
pnpm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção
```bash
pnpm run build
```

## 📱 Rotas Disponíveis

| Rota | Descrição | Componente |
|------|-----------|-----------|
| `/` | Página inicial | Home.tsx |
| `/landing` | LP-Alumínio | LandingPage.tsx |
| `/lp-4us` | LP-Perfetta | LandingPage4Us.tsx |
| `/orcamento` | Página de orçamento | BudgetPage.tsx |
| `/obrigado` | Página de agradecimento | ThankYou.tsx |
| `/sobre` | Sobre a empresa | Sobre.tsx |
| `/projetos` | Portfólio | Projetos.tsx |
| `/contato` | Formulário de contato | Contato.tsx |
| `/guia-esquadrias` | Guia técnico | Guide.tsx |
| `/guia-perffeta` | Guia Perfetta | GuidePerffeta.tsx |

## 🎨 Paleta de Cores

### Cores Amadeirado (12)
Sand Ash, Branco Ártico, Carvalho Claro, Carvalho Natural, Carvalho Dourado, Carvalho Escuro, Ébano, Wengé, Nogueira, Cereja, Mogno, Pau-Rosa

### Cores Sólidas (3)
Branco, Preto, Alumínio

## 🔧 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn
- **Roteamento**: Wouter
- **Forms**: React Hook Form + Zod
- **Notificações**: Sonner
- **Backend**: Express.js

## 📊 Otimizações de Conversão

### Copywriting
- Headlines com benefícios claros
- Subheadlines que criam urgência
- Prova social (+2.000 clientes)
- Garantias explícitas (10 anos)

### Design
- Cores contrastantes para CTAs
- Espaçamento visual adequado
- Imagens de alta qualidade
- Badges de urgência

### UX
- Formulários minimalistas
- Validação em tempo real
- ColorSelector interativo
- ExitIntentPopup

## 📈 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Taxa de Clique (CTR) | 4-6% |
| Taxa de Conversão | 8-12% |
| Tempo na Página | 2-3 min |
| Taxa de Abandono | 50-55% |

## 🧪 Testes

Consulte `GUIA_TESTES.md` para instruções completas de teste.

### Teste Rápido
```bash
pnpm run dev
# Abrir http://localhost:5173/landing
# Testar ColorSelector
# Preencher formulário
# Verificar redirecionamento
```

## 📝 Documentação Adicional

- **OTIMIZACOES_CONVERSAO.md**: Estratégias de conversão implementadas
- **GUIA_TESTES.md**: Checklist completo de testes
- **COMECE_AQUI.txt**: Guia rápido de início

## 🤝 Contribuindo

Para contribuir com melhorias:
1. Criar branch com nome descritivo
2. Fazer commits claros
3. Abrir Pull Request com descrição

## 📞 Suporte

Para dúvidas sobre o projeto, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Propriedade intelectual de Realiza Projetos em Alumínio.

---

**Projeto desenvolvido com ❤️ para conversão máxima!** 🚀
