import { IsNumber, IsString, Length, Min, Max, IsMongoId, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentValidationMessage } from '../../../const.js';

export class CreateCommentDTO {

  @IsString({message: CommentValidationMessage.Text.InvalidFormat})
  @Length(5, 1024, {message: CommentValidationMessage.Text.InvalidLength})
  public text!: string;

  @Type(() => Number)
  @IsNumber({}, {message: CommentValidationMessage.Rating.InvalidFormat})
  @IsInt({message: CommentValidationMessage.Rating.InvalidFormat})
  @Min(1, {message: CommentValidationMessage.Rating.InvalidValue})
  @Max(5, {message: CommentValidationMessage.Rating.InvalidValue})
  public rating!: number;

  public authorId!: string;

  @IsMongoId({message: CommentValidationMessage.OfferId.InvalidValue})
  public offerId!: string;
}
