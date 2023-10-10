import { prop, Ref, Severity, defaultClasses, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    default: '',
    trim: true
  }) public text!: string;

  @prop({
    required: false,
    default: 0
  }) public rating!: number;

  @prop({
    required: true,
    ref: OfferEntity,
    _id: false,
  }) public offerId!: Ref<OfferEntity>;

  @prop({
    required: true,
    ref: UserEntity,
    _id: false,
  }) public authorId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
