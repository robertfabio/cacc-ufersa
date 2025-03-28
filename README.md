# Portal de Recepção - CACC UFERSA

## Sobre o Projeto

Este é um portal de recepção para calouros do curso de Ciência da Computação da UFERSA. O projeto utiliza React com TypeScript e foi construído com Vite para oferecer uma experiência moderna e responsiva tanto para dispositivos móveis quanto para desktop.

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (para animações)
- Vite (como bundler)

## Estrutura do Projeto

```
/src
  /components       # Componentes React
  /styles           # Arquivos CSS e estilos
  /mcp-knowledge    # Dados estruturados
/public             # Arquivos estáticos
```

## Funcionalidades

- Layout responsivo para desktop e mobile
- Tema espacial com animações
- Contagem regressiva para o evento
- Timeline de atividades
- Informações sobre o curso

## Como Executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

3. Acesse o projeto em [http://localhost:3000](http://localhost:3000)

## Build para Produção

Para gerar a versão de produção:

```
npm run build
```

Os arquivos serão gerados na pasta `dist`.