@echo off
chcp 65001 >nul
echo.
echo === Laudo Pronto: deploy na Vercel ===
echo.
echo 1/4 Login na Vercel (abre o navegador)
call npx vercel@latest login || goto erro

echo.
echo 2/4 Criando o projeto na sua conta
call npx vercel@latest link --yes || goto erro

echo.
echo 3/4 Variaveis de ambiente. Cada comando vai pedir o valor: cole e aperte Enter.
echo     (deixe em branco o que ainda nao tiver; da pra adicionar depois no painel)
for %%V in (DEEPSEEK_API_KEY NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY CAKTO_WEBHOOK_SECRET CAKTO_PRODUTO_ESSENCIAL CAKTO_PRODUTO_CONTRATOS CAKTO_PRODUTO_COMPLETO CAKTO_PRODUTO_IA NEXT_PUBLIC_CHECKOUT_URL NEXT_PUBLIC_CHECKOUT_CONTRATOS_URL NEXT_PUBLIC_CHECKOUT_COMPLETO_URL NEXT_PUBLIC_CHECKOUT_IA_URL NEXT_PUBLIC_FIM_LANCAMENTO NEXT_PUBLIC_EMAIL_SUPORTE) do (
  echo.
  echo -- %%V
  call npx vercel@latest env add %%V production
)

echo.
echo 4/4 Publicando em producao
call npx vercel@latest --prod || goto erro
echo.
echo Pronto! O link de producao aparece acima.
goto fim

:erro
echo.
echo Algo falhou no passo acima. Leia a mensagem de erro e rode o deploy.cmd de novo.

:fim
pause
