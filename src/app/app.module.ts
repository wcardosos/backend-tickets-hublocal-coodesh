import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { EnterprisesModule } from 'src/enterprises/enterprises.module';
import { EnterprisesController } from 'src/enterprises/enterprises.controller';

@Module({
  imports: [AuthModule, EnterprisesModule, UsersModule],
  controllers: [AppController, EnterprisesController],
  providers: [],
})
export class AppModule {}
