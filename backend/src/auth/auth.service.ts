import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService : JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await user.validatePassword(password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(req:LoginUserDto): Promise<{ access_token: string, name:String, success:Boolean }> {
    const {email,password} = req
    // Check if user exists
    console.log(req);
    const user = await this.usersService.findOne(email?.toLowerCase());
    
    if (!user) {
        throw new UnauthorizedException('User not found.');
    }  
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials.');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user._id };
    return {
        access_token: "",//this.jwtService.sign(payload),
        name:user?.name,
        success:true
    };
}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user =await  this.usersService.create(createUserDto);
      return user;
      
    } catch (error) {
      throw new UnauthorizedException("User Already Exists with this Email")
      
    }
    
  }
}
