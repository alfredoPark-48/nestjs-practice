import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors, // Tools to intercept the outgoing response
    ClassSerializerInterceptor, // Tools to intercept the outgoing response
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth') // Changes route name to /auth/
// @UseInterceptors(ClassSerializerInterceptor) NestJs recommended
@Serialize(UserDto) // Custom interceptor
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.authService.signup(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        // id is a string because the param is parsed as a string
        // We can choose to throw errors/exceptions in the service or controller
        const user = await this.userService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
