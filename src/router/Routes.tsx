import * as Loadable from 'react-loadable';
import * as React from 'react';
import Loading from '../components/Loading';

export const AsyncHome = Loadable({
    loader: () => import('../containers/Main'),
    loading: Loading
});

export const AsyncShop = Loadable({
    loader: () => import('../containers/page/ShopPage'),
    loading: Loading
});

export const AsyncAccount = Loadable({
    loader: () => import('../containers/page/AccountPage'),
    loading: Loading
});

export const AsyncList = Loadable({
    loader: () => import('../containers/page/ListPage'),
    loading: Loading
});

export default {AsyncHome, AsyncShop, AsyncAccount, AsyncList};