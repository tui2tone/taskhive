import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Todo } from './entities/todo.entity';

const tableName = 'todos';

@Controller('todos')
export class TodosController {
  constructor(private readonly supabase: SupabaseService) {}
  @Get()
  async getTodos(): Promise<{
    data: Todo[];
  }> {
    const result = await this.supabase
      .getSupabaseClient()
      .from(tableName)
      .select();

    return {
      data: result.data as Todo[],
    };
  }

  @Post()
  async createTodo(@Body() dto: Todo): Promise<{
    data: Todo;
  }> {
    const result = await this.supabase
      .getSupabaseClient()
      .from(tableName)
      .upsert({
        ...dto,
      })
      .select()
      .single();
    return {
      data: result.data as Todo,
    };
  }

  @Put(':id')
  async udpateTodo(
    @Param('id') uuid: string,
    @Body() dto: Todo,
  ): Promise<{
    data: Todo;
  }> {
    const result = await this.supabase
      .getSupabaseClient()
      .from(tableName)
      .upsert({
        ...dto,
        uuid,
      })
      .select()
      .single();
    return {
      data: result.data as Todo,
    };
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<{
    data: Todo;
  }> {
    const result = await this.supabase
      .getSupabaseClient()
      .from(tableName)
      .delete()
      .eq('uuid', id);
    return {
      data: result.data as Todo,
    };
  }
}
