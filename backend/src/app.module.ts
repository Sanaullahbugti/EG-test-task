import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from 'auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import * as fs from 'fs';

@Module({
  imports: [
    LoggerModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [JwtService,AppService, AuthService],
})
export class AppModule {}
