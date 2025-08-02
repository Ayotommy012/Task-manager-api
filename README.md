

````markdown
# 🗂️ Task Manager API

A simple and modular RESTful API for managing tasks, built using **Node.js**, **Express**, and **PostgreSQL**, with Sequelize ORM and Jest for testing.

---

## 📖 Project Description

This Task Manager API allows users to:

- Create new tasks
- Retrieve all tasks or by ID
- Update task details
- Delete tasks

It’s structured to be modular and maintainable, with a repository pattern separating database logic, and includes unit tests for all core repository functions.

---

## 🛠️ Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api
````

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment**

No `.env` required, but ensure the database credentials in `initDb.js` match your PostgreSQL setup:

```js
const sequelize = new Sequelize("Taskmanagerapp", "postgres", "your_password", {
  host: "localhost",
  dialect: "postgres"
});
```

---

## 🔃 How to Run Migrations

This project does **not use Sequelize CLI migrations**.
If you're using Sequelize's `sync()` method (e.g., `sequelize.sync()`), the tables are created automatically when the server starts.

To manually create your database and tables:

```sql
CREATE DATABASE "Taskmanagerapp";
-- Sequelize will handle table creation if sync is called
```

If you want to integrate migrations, consider using Sequelize CLI in future projects.

---

## 🚀 How to Start the Server

Make sure your PostgreSQL server is running, then:

```bash
npm start
```

This will run your app using Node and connect it to your local PostgreSQL database.

---

## 🧪 How to Test the Endpoints

Use Postman or cURL to test the following endpoints:

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Get all tasks     |
| GET    | `/tasks/:id` | Get a task by ID  |
| POST   | `/tasks`     | Create a new task |
| PUT    | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

---

## 📬 Sample Request/Response

### `POST /tasks`

#### Request Body:

```json
{
  "title": "Do laundry",
  "description": "Wash and fold clothes",
  "status": "pending",
  "due_date": "2025-08-10"
}
```

#### Response:

```json
{
  "id": 1,
  "title": "Do laundry",
  "description": "Wash and fold clothes",
  "status": "pending",
  "due_date": "2025-08-10T00:00:00.000Z"
}
```

---

## ✅ How to Run Unit Tests

This project uses **Jest** to unit test all repository functions.

```bash
npm test
```

This runs the test suite located in `app/test/task.test.js`, covering:

* `getAllTasks`
* `getTaskById`
* `createTask`
* `modifyTaskById`
* `deleteTaskById`

All database calls are mocked using `jest.mock()`.

---

## 📘 API Documentation (Postman)

* 👉 [Click here to view Postman API Documentation](https://ayotommy012-4288519.postman.co/workspace/Tomiwa's-Workspace~7c052598-ca3f-41db-868b-f30a24ed4ad1/collection/47120294-62b2d457-ece3-4d03-8590-884df4d2a990?action=share&source=copy-link&creator=47120294)

This includes all endpoints, request bodies, responses, and status codes. You can also **import the collection** into Postman.

---

## 👨‍💻 Author

**Apelegan Israel**
Backend Developer & Mathematical Science Student
GitHub: [@ayotommy012](https://github.com/ayotommy012)

---

## 📄 License

MIT

```

---

### ✅ Final Step

Save the above content in a file named `README.md` at the **root** of your project folder.

Let me know if you'd like to generate a Postman environment file, or push everything to GitHub — we can finish strong.
```
