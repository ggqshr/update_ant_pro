import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha,login } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import router from 'umi/router';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    showTip: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload); //从后端拿数据的时候就设置权限的字段
      yield put({  
        type: 'changeLoginStatus',
        payload: response,
      });
      if(response.status === 'ok'){
        router.push("/dashboard/analysis")
      }
      // Login successfully
      // if (response.status === 'ok') {
      //   reloadAuthorized();
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = redirect;
      //       return;
      //     }
      //   }
      //   yield put(routerRedux.replace(redirect || '/'));
      // }
      
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload)
      setAuthority(payload.currentAuthority); //设置当前用户的权限
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    showTip(state) {
      console.log('tessss');
      return {
        ...state,
        showTip: true,
      };
    },
  },
};
