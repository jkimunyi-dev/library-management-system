// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for development
  app.enableCors();
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
  console.log('Library Management System API is running on http://localhost:3000');
  console.log('API endpoints available at http://localhost:3000/api');
}
bootstrap();