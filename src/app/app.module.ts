import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { EnterprisesModule } from '../enterprises/enterprises.module';
import { EnterprisesController } from '../enterprises/enterprises.controller';
import { LocationsModule } from '../locations/locations.module';
import { LocationsController } from '../locations/locations.controller';

@Module({
  imports: [AuthModule, EnterprisesModule, LocationsModule, UsersModule],
  controllers: [AppController, EnterprisesController, LocationsController],
  providers: [],
})
export class AppModule {}
