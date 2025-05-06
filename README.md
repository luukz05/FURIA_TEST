# 🐾 FURIA QG – Plataforma de Engajamento para Fãs

Bem-vindo ao **QG da FURIA**, a central de **missões, desafios e recompensas** da torcida mais furiosa do Brasil. Este projeto é uma **plataforma web fullstack** criada para aproximar os fãs da organização FURIA por meio de **interatividade, gamificação, chat global, rankings e comunidade ativa**.

---

## 📸 Preview

![Preview da Plataforma](https://cdn.discordapp.com/attachments/968229431988604940/1368712816479047831/Captura_de_tela_2025-05-04_192014.png?ex=681938a4&is=6817e724&hm=60f60c7873ecfaa4ecf4112a317eea008dc6dd16b94769edad32763be8869e86&)

---

## 🚀 Funcionalidades

- ✅ Página inicial com design imersivo e responsivo
- 🔐 Cadastro e login com autenticação JWT
- 🧠 Quiz semanal com sistema de pontuação
- 📅 Desafios e missões com sistema de pontos e recompensas
- 🏆 Rankings local e global com gamificação
- 👥 Chat global para interação entre usuários (polling e futura integração com WebSocket)
- 📷 Verificação de CPF via imagem com OCR (pytesseract)
- 🎮 Personalização com redes sociais e interesses dos usuários
- 🌟 Recompensas exclusivas (como skins, produtos e mais)

---

## 🎯 Objetivo do Projeto

Este projeto foi idealizado como uma **plataforma de engajamento digital** para fãs da FURIA, transformando a paixão pela organização em **experiências gamificadas** e interativas. A proposta une **tecnologia, esportes eletrônicos e comunidade**, conectando fãs de todo o Brasil em um ambiente moderno, divertido e seguro.

---

## 🛠️ Tecnologias Utilizadas

### 🖥️ Frontend (React)

| Tecnologia      | Descrição |
|----------------|-----------|
| React + Vite   | Interface SPA rápida e modular |
| React Router   | Navegação entre rotas |
| Tailwind CSS   | Estilização com utilitários modernos |
| React Icons    | Ícones escaláveis e personalizáveis |
| JavaScript     | Lógica de interação |
| Axios          | Requisições HTTP com a API |
| js-cookie      | Armazenamento de sessão no navegador |

### 🧪 Backend (Flask + MongoDB)

| Tecnologia        | Descrição |
|------------------|-----------|
| Flask            | Framework web leve em Python |
| Flask-PyMongo    | Integração com banco MongoDB |
| JWT              | Autenticação com tokens |
| bcrypt           | Hash seguro de senhas |
| pytesseract      | OCR para leitura de CPF por imagem |
| Pillow           | Manipulação de imagens |
| Flask-CORS       | Permitir comunicação frontend-backend |

---

## 📁 Estrutura de Pastas (Simplificada)

```
furia-qg/
├── backend/              # API Flask com OCR, autenticação e banco de dados
│   ├── app.py
│   └── ...
│
├── frontend/             # Aplicação React com páginas e componentes
│   ├── src/
│   │   ├── assets/       # Imagens e logos
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas: Home, Login, Dashboard etc.
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
└── README.md
```

---

## 📦 Instalação

### 🔧 Clone o repositório:

```bash
https://github.com/luukz05/FURIA_TEST.git
cd furia-qg
```

### ▶️ Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse em `http://localhost:5173`.

### 🧩 Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Certifique-se de ter o **MongoDB** local rodando e o **Tesseract OCR** instalado no sistema.

---

## 🧠 Instalação do Tesseract OCR

Para que a funcionalidade de **leitura de CPF por imagem** funcione corretamente, é necessário instalar o **Tesseract OCR**, uma engine de reconhecimento óptico de caracteres utilizada com a biblioteca `pytesseract`.

### 🔽 Instalar o Tesseract

#### 🪟 Windows

1. Acesse: [https://github.com/tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract)
2. Baixe o instalador da versão mais recente para Windows.
3. Durante a instalação, **marque o idioma português (por)** se disponível.
4. Após instalar, **adicione o caminho de instalação** à variável de ambiente `PATH`.

   Exemplo:
   ```
   C:\Program Files\Tesseract-OCR
   ```

#### 🐧 Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install tesseract-ocr
sudo apt install tesseract-ocr-por  # Instala suporte ao idioma português
```

#### 🍎 macOS (com Homebrew)

```bash
brew install tesseract
brew install tesseract-lang  # Para instalar idiomas adicionais, como português
```

---

### 🧪 Testando a Instalação

Para verificar se a instalação foi bem-sucedida, execute no terminal:

```bash
tesseract --version
```

Se estiver instalado corretamente, será exibida a versão atual do Tesseract.

---

### 📦 Requisitos Python

A funcionalidade de OCR utiliza as bibliotecas Python abaixo:

- `pytesseract` – Interface Python para o Tesseract OCR
- `Pillow` – Manipulação de imagens

Instale com:

```bash
pip install pytesseract pillow
```

No código Python, especifique o caminho do executável do Tesseract caso necessário:

```python
import pytesseract

# Exemplo para Windows:
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

---

## 📌 Próximas Funcionalidades

- Notificações ao vivo por conquistas e eventos
- Área de perfil com histórico de missões
- Sistema de conquistas colecionáveis
- Dashboard administrativo para gerenciar quizzes e rankings

---

## 👨‍💻 Desenvolvedor

**Lucas Vargas**  
🎓 Estudante de Engenharia da Computação (FACENS)  
💻 Técnico em Desenvolvimento de Jogos e Web  
🚀 Participante de bootcamp da NASA (Kennedy Space Center)  
📱 Apaixonado por tecnologia, eSports e experiências digitais interativas

---

## 💜 Agradecimentos

A **FURIA** sempre foi uma grande inspiração. Este projeto é a minha forma de retribuir, com tecnologia, esforço e criatividade, tudo que essa organização representa para mim e para milhares de fãs.  
**#FURIA 💪🔥**

Sempre fui apaixonado por games e motivado pela vontade de crescer e fazer parte de algo grande. Durante a pandemia, assistindo campeonatos de Fortnite, conheci a FURIA, que tinha acabado de contratar meu jogador favorito. Com o tempo, meus interesses mudaram: passei do Fortnite para o Rainbow Six e depois para o CS, mas a FURIA sempre continuou sendo minha maior referência. Hoje, com o FALLEN vestindo esse manto, minha admiração só aumentou: meu jogador favorito agora está no meu time do coração. Quero muito fazer parte dessa história que ainda está sendo escrita, não só como fã, mas entregando tudo o que posso: dedicação, energia, boas ideias e a vontade de somar com quem sempre me inspirou.
