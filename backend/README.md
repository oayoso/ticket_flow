
# PROYECTO NESTJS

## Descripción

Es un proyecto de Gestion de ticket de soporte con roles y flujos de trabajo

## Tecnologías Utilizadas

-  **NestJS**: Framework para Node.js que permite construir aplicaciones eficientes y escalables del lado del servidor.

-  **Docker**: Para contenerización y despliegue de servicios.

-  **MySQL**: Gestor de base de datos.

-  **TypeOrm**: ORM para interactuar con la base de datos.

-  **Patrones de diseño**: Patrones que sea utilizado: modular, repository y factory .


---

# 📩 API de Gestión de Tickets

Esta colección de Postman define una serie de endpoints para un sistema de gestión de tickets. Las funcionalidades incluyen autenticación de usuarios, manejo de tickets, asignaciones, métricas, y comentarios.

---

## 🧾 Endpoints disponibles

### 🔐 AUTH

#### 1. `POST /auth/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "name": "junior1",
  "email": "junior23261@gmail.com",
  "password": "ojahojah11",
  "role": "admin"
}
```

---

#### 2. `POST /auth/login`
Inicia sesión con email y contraseña.

**Body:**
```json
{
  "email": "junior2326@gmail.com",
  "password": "ojahojah11"
}
```

---

### 🎫 TICKETS

#### 1. `POST /tickets`
Registra un nuevo ticket.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "No puedo acceder al sistema",
  "description": "He intentado varias veces y no entra.",
  "priority": "high"
}
```

---

#### 2. `GET /tickets`
Lista todos los tickets del sistema.

**Headers:**
```
Authorization: Bearer <token>
```

---

#### 3. `GET /tickets/metrics/admin`
Devuelve métricas relacionadas con los tickets (para rol admin).

**Headers:**
```
Authorization: Bearer <token>
```

---

#### 4. `GET /tickets/:id`
Obtiene la información de un ticket por ID.

**Headers:**
```
Authorization: Bearer <token>
```

---

#### 5. `PATCH /tickets/:id`
Actualiza el estado o prioridad de un ticket.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "in_progress",
  "priority": "medium"
}
```

---

#### 6. `PATCH /tickets/:id/assign`
Asigna un ticket a un agente.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "agentId": "uuid-del-agente"
}
```

---

### 💬 COMMENTS

#### 1. `POST /comments`
Agrega un comentario a un ticket.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "ticketId": "uuid-del-ticket",
  "content": "Contenido de prueba."
}
```

---

#### 2. `POST /comments/dm`
Envía un mensaje directo a otro usuario.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "receiverId": "uuid-destinatario",
  "content": "Mensaje de prueba"
}
```

---

#### 3. `GET /comments/:ticketId`
Obtiene los comentarios de un ticket por su ID.

**Headers:**
```
Authorization: Bearer <token>
```

---

#### 4. `GET /comments/dm/:userId`
Obtiene los mensajes directos enviados a un usuario por su ID.

**Headers:**
```
Authorization: Bearer <token>
```

---

### 💬 WEBSOCKET

#### 1. `join_ticke`

Unirse a un ticket específico.

**Front:**
```
socket.emit('join_ticket', ticketId);
```

---

#### 2. `comment`
Enviar comentario a ese ticket.

**Front:**
```
socket.emit('comment', {
  ticketId: ticketId,
  content: 'Hola, ¿cómo va esto?',
  user: { id: '...', name: 'Cliente' }
});
```

---

#### 3. `direct_message`
Enviar mensaje directo

**Front:**
```
socket.emit('direct_message', {
  receiverId: 'agent_id',
  content: 'Hola, ¿puedes ayudarme?',
  user: { id: 'cliente_id' }
});
```

---

#### 4. `new_comment`
Obtiene los mensajes directos enviados a un usuario por su ID.

**Front:**
```
socket.on('new_comment', (comment) => {
  console.log('Comentario nuevo:', comment);
});
```

---

## ✅ Requisitos

- Node.js backend ejecutándose en `localhost:3000`
- JWT Token en los headers para endpoints protegidos
- Levantar el servicio: docker-compose up

---
