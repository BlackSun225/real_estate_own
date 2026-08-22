import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { LocationsModule } from './locations/locations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PropertiesModule, LocationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
