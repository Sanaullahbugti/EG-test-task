import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {  // 'jwt' is the name of the strategy
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "abc778888"
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Return the validated user
  }
}