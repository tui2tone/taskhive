import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
