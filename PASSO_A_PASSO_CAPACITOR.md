# Controle de Materiais - pronto para Capacitor

## O que baixar no computador

### Windows / Android
- Node.js LTS
- Android Studio

### iPhone / iOS
- Mac com macOS
- Node.js LTS
- Xcode

## Como transformar em APK Android

1. Extraia este pacote em uma pasta do computador.
2. Abra a pasta e digite `cmd` na barra de endereço.
3. Rode:

```bash
npm install
npx cap add android
npx cap sync
npx cap open android
```

4. O Android Studio vai abrir.
5. No Android Studio, gere o APK em:

**Build > Build Bundle(s) / APK(s) > Build APK(s)**

## Sempre que alterar o site

Se você mexer no `index.html`, `firebase.js` ou outros arquivos do projeto, rode de novo:

```bash
npx cap sync
```

## Como abrir novamente no Android Studio

```bash
npx cap open android
```

## Como transformar em app iOS

> Para iOS, você precisa de um Mac.

Depois do `npm install`, rode:

```bash
npx cap add ios
npx cap sync
npx cap open ios
```

O Xcode vai abrir. A partir dele você consegue testar no simulador ou no iPhone.

## Arquivo principal usado

O `index.html` deste pacote já foi ajustado para usar a versão mais recente do seu site disponível no pacote: `index-controle-usuarios-v11.html`.
