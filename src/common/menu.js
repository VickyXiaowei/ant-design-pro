import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'analysis',
        path: 'analysis',
      },
      {
        name: 'monitor',
        path: 'monitor',
      },
      {
        name: 'workplace',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'form',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: 'basicform',
        path: 'basic-form',
      },
      {
        name: 'stepform',
        path: 'step-form',
      },
      {
        name: 'advancedform',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: 'list',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: 'searchlist',
        path: 'table-list',
      },
      {
        name: 'basiclist',
        path: 'basic-list',
      },
      {
        name: 'cardlist',
        path: 'card-list',
      },
      {
        name: 'searchlist',
        path: 'search',
        children: [
          {
            name: 'articles',
            path: 'articles',
          },
          {
            name: 'projects',
            path: 'projects',
          },
          {
            name: 'applications',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: 'profile',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: 'basic',
        path: 'basic',
      },
      {
        name: 'advanced',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: 'result',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: 'success',
        path: 'success',
      },
      {
        name: 'fail',
        path: 'fail',
      },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: 'not-permission',
        path: '403',
      },
      {
        name: 'not-find',
        path: '404',
      },
      {
        name: 'server-error',
        path: '500',
      },
      {
        name: 'trigger',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'user',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'login',
        path: 'login',
      },
      {
        name: 'register',
        path: 'register',
      },
      {
        name: 'register-result',
        path: 'register-result',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: 'account',
    children: [
      {
        name: 'center',
        path: 'center',
      },
      {
        name: 'settings',
        path: 'settings',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
