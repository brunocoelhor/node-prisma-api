import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../database/prismaClient';



interface IAuthenticateDeliveryman{
  password: string;
  username: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({password, username}: IAuthenticateDeliveryman) {

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliveryman) {
      throw new Error('Username or password invalid!');
    }

    const passwordMacth = compare(password, deliveryman.password);

    if (!passwordMacth) {
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, 'e58136588a5a91ce799f6bf3b33973a7', {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return token;

  }

}