import { IsNumber, IsString, Length, Min, Max, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentValidationMessage, CommentValidationParameters } from '../../../../const.js';

export class CreateCommentRequestDTO {

  @IsString({message: CommentValidationMessage.Text.InvalidFormat})
  @Length(
    CommentValidationParameters.Text.Length.Minimum,
    CommentValidationParameters.Text.Length.Maximum,
    {message: CommentValidationMessage.Text.InvalidLength}
  )
  public text!: string;

  @Type(() => Number)
  @IsNumber({}, {message: CommentValidationMessage.Rating.InvalidFormat})
  @IsInt({message: CommentValidationMessage.Rating.InvalidFormat})
  @Min(
    CommentValidationParameters.Rating.Value.Minimum,
    {message: CommentValidationMessage.Rating.InvalidValue}
  )
  @Max(
    CommentValidationParameters.Rating.Value.Maximum,
    {message: CommentValidationMessage.Rating.InvalidValue}
  )
  public rating!: number;
}
