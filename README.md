# Portfolio Lautaro Castellanos - React + TypeScript + Vite

Landing page profesional con tema oscuro, animaciones fluidas y diseño minimalista.

## 🚀 Guía de Instalación Paso a Paso

### 1. Descomprimir el archivo

```bash
tar -xzvf portfolio-react.tar.gz
cd portfolio-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

---

## 📧 Configuración del Formulario de Contacto

El formulario de contacto actualmente es solo visual. Para hacerlo funcional, tienes varias opciones:

### Opción 1: EmailJS (Recomendado - Gratis)

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Instala EmailJS en el proyecto:

```bash
npm install @emailjs/browser
```

5. Modifica `src/sections/Contact.tsx`:

```typescript
import emailjs from '@emailjs/browser';

// Reemplaza la función handleSubmit con:
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  emailjs.send(
    'TU_SERVICE_ID',      // Reemplaza con tu Service ID
    'TU_TEMPLATE_ID',     // Reemplaza con tu Template ID
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    },
    'TU_PUBLIC_KEY'       // Reemplaza con tu Public Key
  )
  .then(() => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error al enviar el mensaje. Intenta de nuevo.');
  });
};
```

### Opción 2: Formspree (Muy fácil)

1. Crea una cuenta en [Formspree](https://formspree.io/)
2. Crea un nuevo formulario y obtén tu endpoint
3. Modifica el formulario en `src/sections/Contact.tsx`:

```typescript
// Cambia el form a:
<form 
  action="https://formspree.io/f/TU_FORM_ID" 
  method="POST"
  onSubmit={handleSubmit}
>
```

### Opción 3: Netlify Forms (Si deployas en Netlify)

1. Agrega el atributo `netlify` al formulario:

```typescript
<form 
  name="contact"
  method="POST"
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* ... resto del formulario ... */}
</form>
```

2. Deploya en Netlify y configura las notificaciones en el panel

### Opción 4: Backend propio (Node.js/Express)

Crea un endpoint en tu backend:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'tu-email@gmail.com',
      pass: 'tu-app-password' // Usa App Password, no tu contraseña
    }
  });
  
  await transporter.sendMail({
    from: email,
    to: 'tu-email@gmail.com',
    subject: `Nuevo mensaje de ${name}`,
    text: message
  });
  
  res.json({ success: true });
});

app.listen(3000);
```

---

## 🎨 Personalización

### Cambiar colores

Edita `src/index.css` y modifica las variables CSS:

```css
:root {
  --primary: 210 100% 60%;  /* Cambia el tono aquí */
  /* ... */
}
```

### Cambiar información personal

Edita los siguientes archivos:

- `src/sections/Hero.tsx` - Nombre, título, descripción
- `src/sections/Contact.tsx` - Email, ubicación, links
- `src/sections/Projects.tsx` - Tus proyectos
- `src/sections/Technologies.tsx` - Tus habilidades

### Cambiar foto de perfil

Agrega tu imagen en `public/` y actualiza el componente Hero.

---

## 📁 Estructura del Proyecto

```
portfolio-react/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes UI (Button, Input, etc.)
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Technologies.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

---

## 🛠 Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **GSAP** - Animaciones
- **Lucide React** - Iconos
- **shadcn/ui** - Componentes UI

---

## 📱 Responsive

El portfolio es completamente responsive y se adapta a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Crea un repositorio en GitHub
2. Sube el código
3. Configura GitHub Actions para deploy automático

---

## 📄 Licencia

MIT - Libre para usar y modificar.

---

## 💬 Soporte

Si tienes dudas o problemas, revisa:
- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tailwind](https://tailwindcss.com/)
- [Documentación de GSAP](https://greensock.com/gsap/)
