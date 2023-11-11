import { UserDTO } from '../user/user.dto';

export class CommentDTO {

  public id!: string;

  public text!: string;

  public rating!: number;

  public postDate!: string;

  public user!: UserDTO;
}
