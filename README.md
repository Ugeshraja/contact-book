# Contact Book — Java Full Stack Project

A simple CRUD contact management app. Beginner-friendly, no authentication.

**Stack:** React (Vite) + Spring Boot + MySQL + Maven

```
contact-book/
├── backend/     Spring Boot REST API
├── frontend/    React + Vite app
└── database/    MySQL setup script
```

## 1. Database Setup

1. Install MySQL and start the service.
2. Run the script to create the database + table + sample data:
   ```
   mysql -u root -p < database/contacts_table.sql
   ```
   (Spring Boot will also auto-create the table on first run since
   `spring.jpa.hibernate.ddl-auto=update` is set — the script is just for
   convenience / manual setup.)

## 2. Backend Setup

```
cd backend
```

Set environment variables (or edit `application.properties` defaults directly for local dev):

```
DB_URL=jdbc:mysql://localhost:3306/contact_book_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run it:

```
mvn spring-boot:run
```

Backend starts on **http://localhost:8080**. Test it: `GET http://localhost:8080/api/contacts`

## 3. Frontend Setup

```
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if needed (defaults to `http://localhost:8080/api`), then:

```
npm run dev
```

Frontend starts on **http://localhost:5173**

## 4. Using the App

1. Open http://localhost:5173
2. Click **Add Contact** to create your first contact
3. Click **View Contacts** to see the list, search, edit, or delete

## API Endpoints

| Method | Endpoint                        | Description          |
|--------|----------------------------------|-----------------------|
| GET    | /api/contacts                   | Get all contacts     |
| GET    | /api/contacts/{id}               | Get one contact      |
| POST   | /api/contacts                   | Create a contact     |
| PUT    | /api/contacts/{id}               | Update a contact     |
| DELETE | /api/contacts/{id}               | Delete a contact     |
| GET    | /api/contacts/search?keyword=xxx | Search by name/mobile |

## Deployment

**Backend (Render / Railway):**
- Set env vars: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `FRONTEND_URL` (your deployed frontend URL)
- Build command: `mvn clean package`
- Start command: `java -jar target/contact-book.jar`

**Frontend (Vercel):**
- Set env var: `VITE_API_URL=https://your-backend-url.onrender.com/api`
- Build command: `npm run build`
- Output directory: `dist`

## Notes

- No login/authentication — this is intentionally a single-module CRUD app.
- Lombok is used in the backend to remove boilerplate getters/setters (`@Data`).
- Mobile number is validated as exactly 10 digits, both on the frontend and backend.
