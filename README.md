# Capstone Project - MySQL Setup Guide

This project has been updated to use **MySQL** as its primary database. Follow these instructions to set up and run the project locally.

## Prerequisite Requirements

### 1. Database
- **MySQL Server**: Ensure you have a MySQL server running locally.
- **Database Name**: `capstone_db`
- **Permissions**: Ensure your user (e.g., `root`) has full permissions to create/modify this database.

### 2. Python Environment
- **Python 3.8+**
- Packages in `backend/requirements.txt` (includes `mysqlclient`)

### 3. Node.js Environment
- **Node.js 16+**
- **npm** (included with Node)

---

## 🚀 Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/FakhraHassan/Capstone-project-
cd Capstone-project-
```

### Step 2: Backend Setup
1. **Navigate to backend**:
   ```bash
   cd backend
   ```
2. **Create a virtual environment** (if not already):
   ```bash
   python -m venv venv
   ```
3. **Activate it**:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Configure Database**: Update `backend/backend/settings.py` with your MySQL credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'capstone_db',
           'USER': 'your_mysql_user',
           'PASSWORD': 'your_mysql_password',
           'HOST': '127.0.0.1',
           'PORT': '3306',
       }
   }
   ```
6. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```
7. **Start Server**:
   ```bash
   python manage.py runserver
   ```

### Step 3: Frontend Setup
1. **Navigate to frontend**:
   ```bash
   cd ../frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm start
   ```

---

## 🛠️ Troubleshooting
- **MySQL Driver Error**: If you see "mysqlclient is not installed", run `pip install mysqlclient`. You may need the [MySQL Connector/C](https://dev.mysql.com/downloads/connector/c/) installed on your OS first.
- **Connection Refused**: Ensure your MySQL service is running (`systemctl status mysql` or check Windows Services).
