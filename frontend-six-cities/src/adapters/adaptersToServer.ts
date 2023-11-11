import { CreateUserDTO } from '../dto/user/create-user-request.dto';
import { LoginUserDTO } from '../dto/user/login-user.dto';
import { NewComment, NewOffer, UserAuth, UserRegister, Offer} from '../types/types';
import { CreateOfferRequestDTO } from '../dto/offer/create-offer-request.dto';
import { CreateCommentRequestDTO } from '../dto/comment/create-comment-request.dto';
import { UpdateOfferDTO } from '../dto/offer/update-offer.dto';

export const adaptSigninToServer = (user: UserRegister): CreateUserDTO => ({
  name: user.name,
  email: user.email,
  avatarURL: '',
  userType: user.type,
  password: user.password
});

export const adaptLoginToServer = (user: UserAuth): LoginUserDTO => ({
  email: user.email,
  password: user.password
});

export const adaptCreateOfferToServer = (offer: NewOffer): CreateOfferRequestDTO => ({
  title: offer.title,
  description: offer.description,
  city: offer.city.name,
  previewImageURL: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  coordinates: offer.location,
});

export const adaptEditOfferToServer = (offer: Offer): UpdateOfferDTO => ({
  title: offer.title,
  description: offer.description,
  city: offer.city.name,
  previewImageURL: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  coordinates: offer.location,
});

export const adaptCreateCommentToServer = (comment: NewComment): CreateCommentRequestDTO => ({
  text: comment.comment,
  rating: comment.rating
});
