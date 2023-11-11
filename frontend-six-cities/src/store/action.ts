import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserAuth, User, Offer, Comment, CommentAuth, FavoriteAuth, UserRegister, NewOffer, CityName, OfferShort } from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { Token } from '../utils';
import { OfferDTO } from '../dto/offer/offer.dto';
import { adaptCommentToClient, adaptOfferToClient, adaptOffersListToClient, adaptCommentsListToClient, adaptUserToClient } from '../adapters/adaptersToClient';
import { adaptCreateCommentToServer, adaptCreateOfferToServer, adaptEditOfferToServer, adaptLoginToServer, adaptSigninToServer } from '../adapters/adaptersToServer';
import { CommentDTO } from '../dto/comment/comment.dto';
import { UserDTO } from '../dto/user/user.dto';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const fetchOffers = createAsyncThunk<OfferShort[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDTO[]>(ApiRoute.Offers);
    const adaptedData = adaptOffersListToClient(data);
    return adaptedData;
  });

export const fetchFavoriteOffers = createAsyncThunk<OfferShort[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDTO[]>(ApiRoute.Favorite);
    const adaptedData = adaptOffersListToClient(data);
    return adaptedData;
  });

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], { extra: Extra }>(
  Action.FETCH_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<OfferDTO>(`${ApiRoute.Offers}/${id}`);
      const adaptedData = adaptOfferToClient(data);
      return adaptedData;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  });

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<OfferDTO>(ApiRoute.Offers, adaptCreateOfferToServer(newOffer));
    history.push(`${AppRoute.Property}/${data.id}`);
    const adaptedData = adaptOfferToClient(data);
    return adaptedData;
  });

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<Offer>(`${ApiRoute.Offers}/${offer.id}`, adaptEditOfferToServer(offer));
    history.push(`${AppRoute.Property}/${data.id}`);
    return data;
  });

export const deleteOffer = createAsyncThunk<void, Offer['id'], { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  });

export const fetchPremiumOffers = createAsyncThunk<OfferShort[], CityName, { extra: Extra }>(
  Action.FETCH_PREMIUM_OFFERS,
  async (cityName, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferDTO[]>(`${ApiRoute.Premium}/${cityName}`);
    const adaptedData = adaptOffersListToClient(data);
    return adaptedData;
  });

export const fetchComments = createAsyncThunk<Comment[], Offer['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CommentDTO[]>(`${ApiRoute.Comments}/${id}`);
    const adaptedData = adaptCommentsListToClient(data);
    return adaptedData;
  });

export const fetchUserStatus = createAsyncThunk<UserAuth['email'], undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<UserDTO>(ApiRoute.Login);
      const adaptedData = adaptUserToClient(data);
      return adaptedData.email;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        Token.drop();
      }

      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<Pick<User, 'email'| 'avatarUrl'> & { token: string }>(ApiRoute.Login, adaptLoginToServer({ email, password }));
    const { token } = data;

    Token.save(token);
    history.push(AppRoute.Root);

    return email;
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(ApiRoute.Logout);

    Token.drop();
  });

export const registerUser = createAsyncThunk<void, UserRegister, { extra: Extra }>(
  Action.REGISTER_USER,
  async ({ email, password, name, avatar, type }, { extra }) => {
    const { api, history } = extra;
    await api.post(ApiRoute.Register, adaptSigninToServer({
      email,
      password,
      name,
      type,
    }));
    if (avatar) {
      const payload = new FormData();
      payload.append('avatar', avatar);
      await api.post(ApiRoute.Avatar, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    history.push(AppRoute.Login);
  });


export const postComment = createAsyncThunk<Comment, CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<CommentDTO>(`${ApiRoute.Comments}/${id}`, adaptCreateCommentToServer({ comment, rating }));
    const adaptedData = adaptCommentToClient(data);
    return adaptedData;
  });

export const postFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.POST_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDTO>(
      `${ApiRoute.Favorite}/${id}`
    );
    const adaptedData = adaptOfferToClient(data);
    return adaptedData;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

export const deleteFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.DELETE_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDTO>(
      `${ApiRoute.Favorite}/${id}`
    );
    const adaptedData = adaptOfferToClient(data);
    return adaptedData;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});
