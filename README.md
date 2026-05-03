# Chill Chat

Projeto desenvolvido com:

Frontend: React + TypeScript
Backend: Django + Django REST Framework

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

configurar o env:

    DATABASE_URL=URL DO BANCO DE DADOS
    DEBUG=True
    SECRET_KEY=SENHA

    CLOUDINARY_CLOUD_NAME=NOME
    CLOUDINARY_API_KEY=API KEY
    CLOUDINARY_API_SECRET=API SECRET

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Backend: http://localhost:8000

Admin: http://localhost:8000/admin/


# Rodando o Frontend

cd front_end/life-chat
npm install
npm start

# Variáveis de ambiente (Projeto)

Criar `.env`:

    REACT_APP_API_URL=LINK DO BANCO DE DADOS


# Endpoints

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
