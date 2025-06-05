# Library Management System - NestJS API

A complete library management system built with NestJS, featuring three main modules: Authors, Books, and Members. The system uses in-memory array storage and implements full CRUD operations with proper TypeScript interfaces and DTOs.

## 🚀 Features

- **Authors Management**: Create, read, update, and delete authors
- **Books Management**: Manage library catalog with borrowing/returning functionality
- **Members Management**: Handle library member registration and book borrowing
- **RESTful API**: Clean REST endpoints following best practices
- **TypeScript**: Fully typed with interfaces and DTOs
- **In-Memory Storage**: Array-based storage for demonstration purposes
- **Modular Architecture**: Separate modules following NestJS patterns

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NestJS CLI (recommended)

## 🛠 Installation & Setup

### 1. Install NestJS CLI globally
```bash
npm install -g @nestjs/cli
```

### 2. Create new NestJS project
```bash
nest new library-management-system
cd library-management-system
```

### 3. Generate modules using NestJS CLI
```bash
# Generate Authors module
nest generate module authors
nest generate controller authors
nest generate service authors

# Generate Books module
nest generate module books
nest generate controller books
nest generate service books

# Generate Members module
nest generate module members
nest generate controller members
nest generate service members
```

### 4. Create directory structure
```bash
# Create dto and interfaces directories
mkdir src/authors/dto src/authors/interfaces
mkdir src/books/dto src/books/interfaces
mkdir src/members/dto src/members/interfaces
```

### 5. Replace generated files
Copy all the provided files to their respective locations in your project.

### 6. Install dependencies and run
```bash
npm install
npm run start:dev
```

The server will start on `http://localhost:3000` with API endpoints available at `http://localhost:3000/api`.

## 📁 Project Structure

```
src/
├── authors/
│   ├── dto/
│   │   ├── create-author.dto.ts
│   │   └── update-author.dto.ts
│   ├── interfaces/
│   │   └── author.interface.ts
│   ├── authors.controller.ts
│   ├── authors.service.ts
│   └── authors.module.ts
├── books/
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   └── update-book.dto.ts
│   ├── interfaces/
│   │   └── book.interface.ts
│   ├── books.controller.ts
│   ├── books.service.ts
│   └── books.module.ts
├── members/
│   ├── dto/
│   │   ├── create-member.dto.ts
│   │   └── update-member.dto.ts
│   ├── interfaces/
│   │   └── member.interface.ts
│   ├── members.controller.ts
│   ├── members.service.ts
│   └── members.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 🔌 API Endpoints

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create new author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books
- `GET /api/books` - Get all books
- `GET /api/books?authorId=:id` - Get books by author
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `POST /api/books/:id/borrow` - Borrow a book
- `POST /api/books/:id/return` - Return a book

### Members
- `GET /api/members` - Get all members
- `GET /api/members?email=:email` - Get member by email
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member
- `POST /api/members/:id/borrow/:bookId` - Member borrows book
- `POST /api/members/:id/return/:bookId` - Member returns book
- `POST /api/members/:id/renew` - Renew membership

## 📊 Data Models

### Author
```typescript
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  nationality: string;
  biography?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Book
```typescript
{
  id: number;
  title: string;
  isbn: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Member
```typescript
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  membershipType: 'STANDARD' | 'PREMIUM' | 'STUDENT';
  joinDate: Date;
  expiryDate: Date;
  isActive: boolean;
  borrowedBooks: number[];
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Testing

### Using REST Client (VS Code Extension)

1. Install the REST Client extension in VS Code
2. Use the provided `test.http` file
3. Click on "Send Request" above each HTTP request

### Sample API Calls

#### Create Author
```http
POST http://localhost:3000/api/authors
Content-Type: application/json

{
  "firstName": "Stephen",
  "lastName": "King",
  "email": "stephen.king@example.com",
  "birthDate": "1947-09-21",
  "nationality": "American",
  "biography": "American author of horror fiction."
}
```

#### Create Book
```http
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "The Shining",
  "isbn": "978-0307743657",
  "authorId": 1,
  "genre": "Horror",
  "publishedYear": 1977,
  "publisher": "Doubleday",
  "totalCopies": 5,
  "description": "A horror novel about a family isolated in a haunted hotel."
}
```

#### Create Member
```http
POST http://localhost:3000/api/members
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Wilson",
  "email": "alice.wilson@example.com",
  "phoneNumber": "+1234567893",
  "address": "321 Elm St, City, State 12348",
  "membershipType": "PREMIUM"
}
```

## 🎯 Key Learning Concepts Demonstrated

1. **NestJS Modules**: Organized code into feature modules
2. **Controllers**: Handle HTTP requests and responses
3. **Services**: Business logic and data manipulation
4. **DTOs**: Data Transfer Objects for API contracts
5. **Interfaces**: TypeScript type definitions
6. **Dependency Injection**: NestJS IoC container
7. **HTTP Status Codes**: Proper REST API responses
8. **Error Handling**: NotFoundException for missing resources
9. **Query Parameters**: Filtering data with query strings
10. **RESTful Design**: Following REST conventions

## 🔧 Available Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Testing
npm run test
npm run test:watch
npm run test:cov
```

## 🚀 Next Steps & Extensions

1. **Add Validation**: Implement class-validator for DTO validation
2. **Database Integration**: Replace in-memory storage with database
3. **Authentication**: Add JWT-based authentication
4. **Logging**: Implement comprehensive logging
5. **Swagger Documentation**: Add OpenAPI documentation
6. **Unit Tests**: Add comprehensive test coverage
7. **Docker**: Containerize the application
8. **Rate Limiting**: Add API rate limiting
9. **Caching**: Implement response caching
10. **File Upload**: Add book cover image upload functionality

## 📝 Notes

- Data is stored in memory and will be reset on server restart
- IDs are auto-incrementing integers
- All endpoints return JSON responses
- CORS is enabled for development
- Global API prefix `/api` is configured

## 🤝 Contributing

This is a learning project demonstrating NestJS concepts. Feel free to extend and modify as needed for your learning purposes.

## 📄 License

This project is for educational purposes.