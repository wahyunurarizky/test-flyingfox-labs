import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { UpdateMenuDto } from './update-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('Menu') // Group the endpoints under "Menu"
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu', type: String })
  @ApiBody({ type: UpdateMenuDto })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu', type: String })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus in hierarchical order' })
  findAll() {
    return this.menuService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu', type: String })
  delete(@Param('id') id: string) {
    return this.menuService.delete(id);
  }
}
