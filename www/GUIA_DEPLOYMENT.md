# Guia de Deployment - Site Permanente v26

## 🚀 Como Publicar o Site

Este guia mostra como publicar seu site permanente em diferentes plataformas.

---

## 📋 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `index-v26.html` | Página inicial do site |
| `sala3d.html` | Ambiente 3D imersivo com Three.js |
| `demo.html` | Demonstração interativa |
| `servicos-pavimentos.js` | Lógica de serviços |
| `integracao-rt-estoque.js` | Integração RT ↔ Estoque |

---

## 🌐 Opção 1: Vercel (Recomendado)

### Passo 1: Preparar Repositório
```bash
git init
git add .
git commit -m "Initial commit - Sistema Controle Obras v26"
```

### Passo 2: Criar Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório chamado `sistema-controle-obras-v26`
3. Siga as instruções para fazer push

### Passo 3: Deploy no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Clique em "Deploy"

### Configuração (vercel.json)
```json
{
  "buildCommand": "echo 'Static site'",
  "outputDirectory": ".",
  "cleanUrls": true
}
```

**URL Final:** `https://seu-projeto.vercel.app`

---

## 🌐 Opção 2: Netlify

### Passo 1: Conectar ao GitHub
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Selecione GitHub
4. Escolha seu repositório

### Passo 2: Configurar Build
- **Build command:** (deixe vazio)
- **Publish directory:** `.` (raiz)

### Passo 3: Deploy
Clique em "Deploy site"

**URL Final:** `https://seu-site.netlify.app`

---

## 🌐 Opção 3: GitHub Pages

### Passo 1: Configurar Repositório
1. Vá para Settings do repositório
2. Procure por "Pages"
3. Selecione "Deploy from a branch"
4. Escolha branch `main` e pasta `/ (root)`

### Passo 2: Deploy
O site será publicado automaticamente

**URL Final:** `https://seu-usuario.github.io/sistema-controle-obras-v26`

---

## 🌐 Opção 4: Servidor Próprio (VPS/Hosting)

### Passo 1: Conectar via SSH
```bash
ssh usuario@seu-servidor.com
cd /var/www/html
```

### Passo 2: Fazer Upload
```bash
# Opção 1: Git
git clone https://github.com/seu-usuario/sistema-controle-obras-v26.git

# Opção 2: FTP/SFTP
sftp usuario@seu-servidor.com
put -r projeto_novo/* /var/www/html/
```

### Passo 3: Configurar Servidor Web

#### Nginx
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/html;
    index index-v26.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Passo 4: Reiniciar Servidor
```bash
# Nginx
sudo systemctl restart nginx

# Apache
sudo systemctl restart apache2
```

---

## 🔒 SSL/HTTPS

### Vercel/Netlify
✅ Automático (Let's Encrypt)

### Servidor Próprio
```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --nginx -d seu-dominio.com

# Renovação automática
sudo systemctl enable certbot.timer
```

---

## 📝 Configuração do Domínio

### 1. Registrar Domínio
- GoDaddy, Namecheap, Registro.br, etc.

### 2. Apontar DNS
Para Vercel/Netlify:
```
CNAME seu-dominio.com → seu-projeto.vercel.app
```

Para Servidor Próprio:
```
A seu-dominio.com → 123.45.67.89 (seu IP)
```

### 3. Aguardar Propagação
Pode levar até 48 horas

---

## 🔧 Configuração Pós-Deploy

### 1. Testar Funcionalidades
- [ ] Abrir `index-v26.html`
- [ ] Acessar `sala3d.html`
- [ ] Testar `demo.html`
- [ ] Verificar responsividade

### 2. Otimizar Performance
```html
<!-- Adicionar ao HEAD de index-v26.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Sistema de Controle de Obras">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
```

### 3. Adicionar Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🔐 Segurança

### Headers de Segurança
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### CORS (se necessário)
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

---

## 📊 Monitoramento

### Uptime Monitoring
- UptimeRobot (gratuito)
- Pingdom
- StatusPage.io

### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

---

## 🚨 Troubleshooting

### Problema: Página em branco
**Solução:** Verificar console (F12) para erros

### Problema: Three.js não carrega
**Solução:** Verificar CDN do Three.js

### Problema: Fotos não salvam
**Solução:** Verificar localStorage (privado/incógnito não funciona)

### Problema: Lento
**Solução:** Ativar compressão GZIP, minificar CSS/JS

---

## 📈 Próximos Passos

1. **Deploy:** Escolha uma plataforma e publique
2. **Domínio:** Configure seu domínio personalizado
3. **SSL:** Ative HTTPS
4. **Monitoramento:** Configure alertas
5. **Backup:** Faça backup regular
6. **Integração:** Integre com Firebase (opcional)

---

## 📞 Suporte

Se tiver dúvidas sobre deployment:
- Consulte documentação da plataforma
- Verifique console do navegador (F12)
- Teste em ambiente local primeiro

---

## ✅ Checklist de Deploy

- [ ] Arquivos prontos
- [ ] Repositório criado
- [ ] Plataforma escolhida
- [ ] Deploy realizado
- [ ] Domínio configurado
- [ ] SSL ativado
- [ ] Funcionalidades testadas
- [ ] Analytics configurado
- [ ] Monitoramento ativado
- [ ] Backup configurado

---

**Data:** 06/04/2026  
**Versão:** 26  
**Status:** ✅ Pronto para Deploy
