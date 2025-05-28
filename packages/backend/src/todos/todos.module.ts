import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [TodosController]
})
export class TodosModule {}
