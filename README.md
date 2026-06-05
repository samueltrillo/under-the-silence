# Under The Silence

Sitio estático (HTML, CSS, JS) inspirado en sitios de bandas de metal extremo.

## Estructura

```
under-the-silence/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Secciones

- **Bio** — Historia y datos de la banda
- **Video** — Reproductor de YouTube embebido
- **Links** — Redes y plataformas de streaming
- **Contact** — Email y formulario de contacto

## Cómo verlo en local

Sirve la carpeta con un servidor estático (necesario para que el embed de YouTube funcione; abrir `index.html` con `file://` provoca el error 153):

```bash
npx serve .
```

Luego abre la URL que muestra la terminal (por ejemplo `http://localhost:3000`).

## Personalizar

1. Edita el texto de la bio en `index.html`
2. Actualiza los `href` de la sección Links con tus URLs reales
3. Cambia `contact@underthesilence.com` por tu email
4. Para envío real del formulario, conecta un backend o servicio como [Formspree](https://formspree.io)
