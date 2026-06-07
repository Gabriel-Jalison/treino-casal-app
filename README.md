# Treino em Casa

Mini app de treinos desenvolvido em React, com foco em treinos realizados em casa, usando equipamentos simples como halteres, elásticos, step, roda abdominal, mini jump e peso corporal.

O projeto foi criado como uma versão inicial funcional, com treinos para homem e mulher, cronograma semanal, execução por séries, cronômetro de descanso, vídeos incorporados, sistema de XP, sequência de dias e recursos de gamificação.

## Link do app online

https://treino-casal-app.vercel.app/

## Funcionalidades

- Login simples local
- Escolha de perfil: homem ou mulher
- Cronograma semanal de treinos
- Treino guiado exercício por exercício
- Controle por séries
- Cronômetro de descanso entre séries
- Som ao finalizar descanso
- Vibração em dispositivos compatíveis
- Vídeos incorporados do YouTube
- Sistema de XP
- Nível do usuário
- Sequência de dias
- Popups gamificados de progresso
- Tela de perfil e configurações
- Personalização dos nomes dos perfis
- Ativar/desativar som
- Ativar/desativar vibração
- Botão para zerar progresso
- Suporte a PWA
- Instalável na tela inicial do celular
- Layout responsivo para mobile

## Tecnologias usadas

- React
- Vite
- JavaScript
- CSS
- Framer Motion
- Lucide React
- LocalStorage
- PWA
- Git
- GitHub
- Vercel

## Objetivo do projeto

O objetivo deste projeto é criar uma ferramenta simples, prática e motivacional para acompanhar treinos em casa.

Além da parte fitness, o projeto também tem como objetivo servir como prática de desenvolvimento front-end, aplicando conceitos como:

- componentização
- estados com React
- eventos de clique
- temporizadores
- persistência local
- responsividade
- publicação online
- versionamento com Git
- deploy com Vercel

## Como funciona

O usuário acessa o app, faz um login simples e escolhe entre o plano masculino ou feminino.

Depois disso, o app exibe o treino da semana, com os exercícios organizados por dia. Durante o treino, o usuário conclui cada série, recebe feedback visual, descanso cronometrado e progresso gamificado.

Os dados são salvos no navegador usando LocalStorage, permitindo manter XP, sequência e treinos concluídos no mesmo dispositivo.

## Observação sobre a versão atual

Esta é a versão 1 do projeto.

Nesta versão, os dados são salvos localmente no navegador do usuário. Isso significa que o progresso pode variar entre dispositivos, navegadores ou caso o cache/dados do navegador sejam apagados.

Uma versão futura poderá incluir login real e banco de dados usando ferramentas como Supabase ou Firebase.

## Próximas melhorias planejadas

- Login real com cadastro de usuário
- Banco de dados na nuvem
- Histórico completo de treinos
- Calendário mensal de treinos
- Ranking de evolução
- Upload de foto de perfil
- Controle de peso e medidas
- Painel administrativo para cadastrar novos treinos
- Notificações de lembrete
- Melhor curadoria dos vídeos dos exercícios
- Modo offline mais completo
- Relatórios de progresso

## Como rodar o projeto localmente

Clone o repositório:

```bash
git clone https://github.com/Gabriel-Jalison/treino-casal-app.git
```
