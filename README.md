# Life Chat

Rede social estilo microblog full-stack onde usuários podem criar posts
com texto, imagem ou vídeo, seguir pessoas, curtir, comentar e
personalizar o perfil.

Projeto desenvolvido com:

Frontend: React + TypeScript
Backend: Django + Django REST Framework


# Funcionalidades

- Cadastro e login com autenticação JWT
- Feed personalizado (posts de quem você segue)
- Criar posts com texto, imagem ou vídeo
- Curtir (like) posts
- Comentar posts
- Seguir / deixar de seguir usuários
- Busca de usuários
- Editar perfil (avatar, bio, username e senha)
- Painel admin do Django


# Tecnologias

## Frontend

-   React
-   TypeScript
-   TailwindCSS
-   Axios
-   npm

## Backend

-   Django
-   Django REST Framework
-   Simple JWT
-   SQLite
-   uv (gerenciador de dependências Python)


# Estrutura do projeto

LIFE CHAT/
    
    back_end/
       back_end/
        users/
        media/
        manage.py
        pyproject.toml
        uv.lock
       db.sqlite3
    
    front_end/life-chat/
        src/
        public/
        package.json
        tailwind.config.mjs
        tsconfig.json
    
    README.md


# Como rodar o projeto

## Pré-requisitos

### Backend

-   Python 3.11+
-   uv instalado

Instalar:

-   pip install uv

### Frontend

-   Node 18+
-   npm


# Rodando o Backend

cd back_end
uv sync
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Backend: http://localhost:8000

Admin: http://localhost:8000/admin/


# Rodando o Frontend

cd front_end/life-chat
npm install
npm start

Frontend: http://localhost:3000


# Variáveis de ambiente (Projeto)

Criar `.env`:

    REACT_APP_API_URL=http://localhost:8000/api/


# Principais Endpoints

## Auth

POST /api/login/
POST /api/register/

## Feed

GET /api/feed/

## Posts

POST /api/posts/
POST /api/posts/:id/like/
POST /api/posts/:id/comment/
GET /api/posts/:id/comments/

## Usuários

GET /api/search/users/
POST /api/follow/:id/

## Perfil

PATCH /api/profile/
PATCH /api/profile/username/
PATCH /api/profile/password/


# Autor

Samuel Sattiro
