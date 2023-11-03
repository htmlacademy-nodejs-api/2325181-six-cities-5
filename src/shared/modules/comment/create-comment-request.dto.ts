import { IsNumber, IsString, Length, Min, Max, IsMongoId, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentValidationMessage } from '../../../const.js';

export class CreateCommentRequestDTO {

  @IsString({message: CommentValidationMessage.text.invalidFormat})
  @Length(5, 1024, {message: CommentValidationMessage.text.invalidLength})
  public text!: string;

  @Type(() => Number)
  @IsNumber({}, {message: CommentValidationMessage.rating.invalidFormat})
  @IsInt({message: CommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CommentValidationMessage.rating.invalidValue})
  @Max(5, {message: CommentValidationMessage.rating.invalidValue})
  public rating!: number;

  @IsMongoId({message: CommentValidationMessage.offerId.invalidValue})
  public offerId!: string;
}
