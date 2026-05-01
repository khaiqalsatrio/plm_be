import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevokedToken } from 'src/entities/revoked-token.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RevokedToken])],
  providers: [JwtAuthGuard],
  exports: [TypeOrmModule, JwtAuthGuard],
})
export class AuthModule {}
