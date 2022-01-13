import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({username, password}: IAuthenticateClient) {

    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error('Username or password invalid!');  
    }

    const passwordMacth = await compare(password, client.password);

    if (!passwordMacth) {
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, 'e58136588a5a91ce766f6bf3b33973a7', {
      subject: client.id,
      expiresIn: '1d'
    });

    return token;
  }
}