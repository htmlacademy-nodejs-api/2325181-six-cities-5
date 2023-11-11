import { UserDTO } from '../dto/user/user.dto';
import { LoggedUserDTO } from '../dto/user/logged-user.dto';
import { Comment, Offer, OfferShort, User } from '../types/types';
import { OfferDTO } from '../dto/offer/offer.dto';
import { getCity } from '../components/offer-form/offer-form';
import { CommentDTO } from '../dto/comment/comment.dto';
import { CityLocation } from '../const';

export const adaptUserToClient = (user: UserDTO): User => ({
  name: user.name,
  avatarUrl: user.avatarURL,
  type: user.userType,
  email: user.email
});

export const adaptLoggedUserToClient = (user: LoggedUserDTO): Pick<User, 'email'| 'avatarUrl'> & {token: string } => ({
  avatarUrl: user.avatarURL,
  email: user.email,
  token: user.token
});

export const adaptOffersListToClient = (offers: OfferDTO[]): OfferShort[] =>
  offers.map((offer: OfferDTO) => ({
    id: offer.id,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    location: CityLocation[offer.city],
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: getCity(offer.city),
    previewImage: offer.previewImageURL,
    type: offer.type,
  }));


export const adaptOfferToClient = (offer: OfferDTO): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: getCity(offer.city),
  location: offer.coordinates,
  previewImage: offer.previewImageURL,
  type: offer.type,
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  host: adaptUserToClient(offer.host),
  images: offer.images,
  maxAdults: offer.maxAdults,
});

export const adaptCommentToClient = (comment: CommentDTO): Comment => ({
  id: comment.id,
  comment: comment.text,
  date: comment.postDate,
  rating: comment.rating,
  user: adaptUserToClient(comment.user)
});

export const adaptCommentsListToClient = (comments: CommentDTO[]): Comment[] =>
  comments.map((comment) => ({
    id: comment.id,
    comment: comment.text,
    date: comment.postDate,
    rating: comment.rating,
    user: adaptUserToClient(comment.user)
  }));

