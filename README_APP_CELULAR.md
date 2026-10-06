# 📱 Aplicativo Celular - Sistema de Controle de Obras v26

## ✅ Arquivos Adicionados à Pasta `www/`

Todos os novos arquivos foram copiados para sua pasta `www/` do Capacitor:

| Arquivo | Descrição |
|---------|-----------|
| `predio3d-completo.html` | **NOVO** - Prédio 3D com Sala 3D integrada |
| `sala3d.html` | Sala 3D standalone |
| `index-v26.html` | Página inicial do site |
| `demo.html` | Demonstração interativa |
| `servicos-pavimentos.js` | Lógica de serviços |
| `integracao-rt-estoque.js` | Integração RT ↔ Estoque |

## 🚀 Como Usar no Aplicativo

### 1. Atualizar o Capacitor
```bash
cd seu-projeto-capacitor
npx cap sync
```

### 2. Acessar no Aplicativo
- **Página inicial:** `index-v26.html`
- **Prédio 3D:** `predio3d-completo.html`
- **Sala 3D:** `sala3d.html`
- **Demo:** `demo.html`

### 3. Fluxo de Uso

```
Abrir Aplicativo
    ↓
Página Inicial (index-v26.html)
    ↓
Clique em "Acessar Sistema"
    ↓
Prédio 3D (predio3d-completo.html)
    ↓
Clique em um pavimento
    ↓
Abre Sala 3D daquele pavimento
    ↓
Clique em parede/teto/piso
    ↓
Abre janela de serviço
    ↓
Adicione fotos, datas e marque como concluído
    ↓
Salva no Firebase automaticamente
```

## 🔧 Configuração do Capacitor

### Arquivo: `capacitor.config.json`
```json
{
  "appId": "com.planoeplano.obras",
  "appName": "Plano & Plano",
  "webDir": "www",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  }
}
```

### Arquivo: `www/index.html` (Entry Point)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
  <title>Plano & Plano</title>
  <script src="cordova.js"></script>
</head>
<body>
  <script>
    // Redirecionar para página inicial
    window.location.href = 'index-v26.html';
  </script>
</body>
</html>
```

## 📱 Testar no Celular

### Android
```bash
# Build
npx cap build android

# Abrir no Android Studio
npx cap open android

# Ou instalar direto
adb install-multiple ./android/app/build/outputs/apk/debug/*.apk
```

### iOS
```bash
# Build
npx cap build ios

# Abrir no Xcode
npx cap open ios
```

## 🔌 Funcionalidades Disponíveis

✅ **Prédio 3D 3D**
- Câmera interativa (toque + arraste)
- Múltiplas torres e pavimentos
- Clique para abrir Sala 3D

✅ **Sala 3D**
- Ambiente 3D realista
- 5 áreas clicáveis
- Janelas de serviços flutuantes

✅ **Serviços**
- Checklist de conclusão
- Datas de início e previsão
- Até 5 fotos por serviço
- Observações

✅ **Firebase**
- Sincronização em tempo real
- Dados persistem automaticamente
- Funciona offline (com sincronização ao reconectar)

## 🎮 Controles no Celular

| Ação | Gesto |
|------|-------|
| Rotacionar câmera | Arraste com 1 dedo |
| Zoom | Pinça (2 dedos) |
| Abrir serviço | Toque |
| Fechar janela | Toque no X |
| Arrastar janela | Arraste pela barra de título |

## 🔐 Permissões Necessárias

### Android (`AndroidManifest.xml`)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS (`Info.plist`)
```xml
<key>NSCameraUsageDescription</key>
<string>Necessário para adicionar fotos aos serviços</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Necessário para acessar galeria de fotos</string>
```

## 📦 Build para Produção

### Android
```bash
# Build release
npx cap build android --release

# Assinar APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore my-release-key.keystore \
  app-release-unsigned.apk alias_name

# Alinhar APK
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

### iOS
```bash
# Build release
npx cap build ios --release

# Usar Xcode para assinar e distribuir
```

## 🚨 Troubleshooting

### Problema: Câmera não funciona
**Solução:** Verificar permissões no `AndroidManifest.xml` ou `Info.plist`

### Problema: Firebase não sincroniza
**Solução:** Verificar conexão de internet e credenciais Firebase

### Problema: Fotos não salvam
**Solução:** Verificar permissões de armazenamento

### Problema: Lento no celular
**Solução:** Reduzir qualidade das fotos, usar compressão

## 📊 Estrutura de Pastas

```
seu-projeto-capacitor/
├── www/                          ← Arquivos web
│   ├── index.html               ← Entry point (redireciona para index-v26.html)
│   ├── index-v26.html           ← Página inicial
│   ├── predio3d-completo.html   ← Prédio 3D
│   ├── sala3d.html              ← Sala 3D
│   ├── demo.html                ← Demo
│   ├── firebase-controle-usuarios.js
│   ├── servicos-pavimentos.js
│   ├── integracao-rt-estoque.js
│   ├── logo.png
│   └── logotipo.jpg
├── android/                      ← Projeto Android
├── ios/                          ← Projeto iOS
├── capacitor.config.json
└── package.json
```

## 🔄 Sincronizar Mudanças

Sempre que fizer mudanças nos arquivos da pasta `www/`:

```bash
# Copiar arquivos para plataformas
npx cap sync

# Ou apenas copiar (sem instalar dependências)
npx cap copy
```

## 📱 Testar Localmente

### No Navegador
```bash
# Abrir www/index-v26.html no navegador
# Funciona como site normal
```

### No Emulador
```bash
# Android
npx cap run android

# iOS
npx cap run ios
```

## ✅ Checklist de Deployment

- [ ] Todos os arquivos copiados para `www/`
- [ ] `capacitor.config.json` configurado
- [ ] Permissões adicionadas
- [ ] Testado no emulador
- [ ] Testado no celular físico
- [ ] Firebase funcionando
- [ ] Fotos salvando
- [ ] Build release criado
- [ ] APK/IPA assinado
- [ ] Publicado na loja

## 📞 Suporte

Para dúvidas sobre:
- **Capacitor:** https://capacitorjs.com/docs
- **Firebase:** https://firebase.google.com/docs
- **Three.js:** https://threejs.org/docs

---

**Seu aplicativo celular está pronto! 📱✅**

Todos os arquivos estão na pasta `www/` e sincronizados com Firebase.

**Próximos passos:**
1. Executar `npx cap sync`
2. Testar no emulador
3. Testar no celular físico
4. Build para produção
5. Publicar na loja
