# Laudo Pronto

Página de vendas com VSL + gerador de documentos psicológicos (Resolução CFP nº 06/2019) + liberação automática pela Cakto + melhoria de redação com DeepSeek.

**Stack:** Next.js 16 (App Router) · Tailwind · Supabase (login por link mágico + banco) · Cakto (webhook) · DeepSeek (rota no servidor). Tudo sobe na Vercel, sem servidor separado.

## Estrutura

| Rota | O que é |
|---|---|
| `/` | Página de vendas: VSL, demonstração ao vivo, CTAs, oferta, garantia, FAQ, barra fixa no celular |
| `/entrar` | Login sem senha (link no e-mail da compra) |
| `/app` | Painel com os documentos liberados e os bloqueados (upsell) |
| `/app/[documento]` | Gerador: campos guiados, prévia em tempo real, Word e PDF, IA |
| `/api/webhooks/cakto` | Recebe a compra/reembolso e libera/revoga o pacote |
| `/api/ia` | Melhora a redação via DeepSeek, com limite e rate limit |

### Funil já montado no código

| Pacote | Libera | Sugestão de preço |
|---|---|---|
| `essencial` (front) | Declaração, atestado, relatório, encaminhamento, anamnese | R$ 27,90 |
| `contratos` (order bump) | Contrato terapêutico, TCLE | R$ 14,90–17 |
| `completo` (upsell) | Laudo, parecer, registro de evolução | R$ 57–67 |
| `ia` (assinatura) | 200 melhorias de IA/mês | R$ 19–29/mês |

Quem compra só o front ganha 3 melhorias de IA de teste: é o gancho da assinatura.

## Privacidade (LGPD)

- O documento é montado **no navegador**. Nada do que o psicólogo digita é salvo no servidor.
- Antes de ir para a IA, o nome do paciente é trocado por `[PACIENTE]` e restaurado na volta.
- O banco guarda só: e-mail do comprador, pacotes liberados, pedidos (para idempotência) e contagem de uso da IA.

## Passo a passo para colocar no ar

### 1. DeepSeek
**Revogue a chave que foi colada no chat** e gere uma nova em platform.deepseek.com. Ela vai só na variável `DEEPSEEK_API_KEY` da Vercel, nunca no código.

### 2. Supabase
1. Crie um projeto em supabase.com.
2. SQL Editor → cole e rode `supabase/schema.sql`.
3. Authentication → URL Configuration:
   - Site URL: `https://SEU-DOMINIO`
   - Redirect URLs: `https://SEU-DOMINIO/auth/callback` (e `http://localhost:3000/auth/callback` para testar local)
4. Project Settings → API: copie a URL, a `anon key` e a `service_role key`.

### 3. Cakto
1. Crie os produtos: front (R$ 27,90), bump, upsell e a assinatura de IA. Configure o order bump e o upsell no checkout do front.
2. Na entrega/página de obrigado de cada produto, aponte para `https://SEU-DOMINIO/entrar`.
3. Apps → Webhooks → novo webhook:
   - URL: `https://SEU-DOMINIO/api/webhooks/cakto`
   - Eventos: `purchase_approved`, `refund`, `chargeback`, `subscription_created`, `subscription_renewed`, `subscription_canceled`
   - Produtos: marque os 4
   - Copie o **secret** para `CAKTO_WEBHOOK_SECRET`
4. Copie o ID de cada produto (ou o short_id / ID da oferta) para `CAKTO_PRODUTO_*`. Dá para colocar vários separados por vírgula.
5. Use "Testar webhook" da Cakto para conferir que a rota responde 200.

### 4. Vercel
1. Suba esta pasta para um repositório no GitHub e importe na Vercel.
2. Settings → Environment Variables: preencha tudo do `.env.example`.
3. `NEXT_PUBLIC_FIM_LANCAMENTO`: coloque uma **data real** de fim do preço de lançamento (ex.: `2026-11-30T23:59:00-03:00`) e cumpra. Sem data, o contador não aparece. Contador que reinicia sozinho é propaganda enganosa pelo CDC e derruba a confiança de público profissional.
4. Deploy.

### Rodar no seu PC (CMD)

```
cd laudo-pronto
npm install
copy .env.example .env.local
npm run dev
```

Edite o `.env.local` e abra http://localhost:3000.

## Onde mexer

- **Textos e documentos:** `lib/documentos.ts` (campos e montagem de cada modelo)
- **Preço, links de checkout e suporte:** variáveis `NEXT_PUBLIC_*` ou `lib/config.ts`
- **Página de vendas:** `app/page.tsx`
- **Cores e fontes:** `tailwind.config.ts`
- **VSL:** `public/vsl.mp4` e o roteiro em `VSL-ROTEIRO.md`

## Antes de rodar tráfego

- Peça para 2 ou 3 psicólogos revisarem os modelos. A estrutura segue a Resolução CFP 06/2019, mas o texto padrão precisa do olhar de quem assina.
- Depoimentos: a página não tem nenhum de propósito. Quando tiver clientes reais, adicione com autorização.
- Configure o Pixel da Meta (e a API de Conversões pela Cakto) antes do primeiro real gasto.
