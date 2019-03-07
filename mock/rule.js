import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getRule(req, res, u);
}
const data = [{"acdate":"2019-02-25","actime":"13","anum":55,"dnum":55,"platform":"pc","pnum":55,"referdomain":"localhost","useragent":"Mozilla/5.0 (Windows NT 6.2; Win64; x64; Trident/7.0; rv:11.0) like Gecko"},{"acdate":"2019-02-25","actime":"16","anum":160,"dnum":200,"platform":"pc","pnum":200,"referdomain":"localhost","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"},{"acdate":"2019-02-25","actime":"16","anum":40,"dnum":200,"platform":"pc","pnum":200,"referdomain":"localhost","useragent":"Mozilla/5.0 (Windows NT 6.2; Win64; x64; Trident/7.0; rv:11.0) like Gecko"},{"acdate":"2019-02-28","actime":"23","anum":128,"dnum":128,"platform":"pc","pnum":128,"referdomain":"localhost","useragent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"},{"acdate":"2019-03-04","actime":"20","anum":32,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/1080 Core/UIWebView Device/Apple(iPhone 7Plus) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-04","actime":"20","anum":32,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/1080 Core/UIWebView Device/Apple(iPhone 7Plus) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-04","actime":"20","anum":32,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/1080 Core/UIWebView Device/Apple(iPhone 7Plus) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-04","actime":"20","anum":104,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/54"},{"acdate":"2019-03-04","actime":"20","anum":104,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/54"},{"acdate":"2019-03-04","actime":"20","anum":104,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/54"},{"acdate":"2019-03-04","actime":"20","anum":24,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":24,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":24,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":12,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":12,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":12,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":28,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/2G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":28,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/2G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":28,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/2G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"20","anum":20,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"},{"acdate":"2019-03-04","actime":"20","anum":20,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"},{"acdate":"2019-03-04","actime":"20","anum":20,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"},{"acdate":"2019-03-04","actime":"20","anum":56,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; COR-AL10 Build/HUAWEICOR-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":56,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; COR-AL10 Build/HUAWEICOR-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":56,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; COR-AL10 Build/HUAWEICOR-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/90"},{"acdate":"2019-03-04","actime":"20","anum":16,"dnum":292,"platform":"android","pnum":244,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"},{"acdate":"2019-03-04","actime":"20","anum":16,"dnum":292,"platform":"ios","pnum":32,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"},{"acdate":"2019-03-04","actime":"20","anum":16,"dnum":292,"platform":"pc","pnum":16,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"},{"acdate":"2019-03-04","actime":"21","anum":12,"dnum":28,"platform":"android","pnum":28,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-04","actime":"21","anum":16,"dnum":28,"platform":"android","pnum":28,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-05","actime":"10","anum":1,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/750 Core/UIWebView Device/Apple(iPhone 7) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-05","actime":"10","anum":1,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/750 Core/UIWebView Device/Apple(iPhone 7) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-05","actime":"10","anum":1,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/750 Core/UIWebView Device/Apple(iPhone 8) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-05","actime":"10","anum":1,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/750 Core/UIWebView Device/Apple(iPhone 8) NetType/WIFI QBWebViewType/1"},{"acdate":"2019-03-05","actime":"10","anum":6,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Plus Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044502 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/54"},{"acdate":"2019-03-05","actime":"10","anum":6,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Plus Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044502 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/54"},{"acdate":"2019-03-05","actime":"10","anum":5,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 7.1.2; Redmi Note 5A Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/720 StatusBarHeight/50"},{"acdate":"2019-03-05","actime":"10","anum":5,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 7.1.2; Redmi Note 5A Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/720 StatusBarHeight/50"},{"acdate":"2019-03-05","actime":"10","anum":11,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; PRA-AL00X Build/HONORPRA-AL00X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-05","actime":"10","anum":11,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.0; PRA-AL00X Build/HONORPRA-AL00X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-05","actime":"10","anum":16,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/2G WebP/0.3.0 Pixel/1440 StatusBarHeight/96"},{"acdate":"2019-03-05","actime":"10","anum":16,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/2G WebP/0.3.0 Pixel/1440 StatusBarHeight/96"},{"acdate":"2019-03-05","actime":"10","anum":9,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; PBEM00 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/80"},{"acdate":"2019-03-05","actime":"10","anum":9,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 8.1; PBEM00 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/80"},{"acdate":"2019-03-05","actime":"10","anum":34,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-05","actime":"10","anum":34,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-05","actime":"10","anum":8,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"},{"acdate":"2019-03-05","actime":"10","anum":8,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"},{"acdate":"2019-03-05","actime":"10","anum":4,"dnum":95,"platform":"android","pnum":93,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; Nokia X7 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.4.1 Pixel/1080 StatusBarHeight/86"},{"acdate":"2019-03-05","actime":"10","anum":4,"dnum":95,"platform":"ios","pnum":2,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; Nokia X7 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.4.1 Pixel/1080 StatusBarHeight/86"},{"acdate":"2019-03-05","actime":"12","anum":7,"dnum":7,"platform":"android","pnum":7,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; CLT-AL00 Build/HUAWEICLT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/81"},{"acdate":"2019-03-05","actime":"19","anum":7,"dnum":7,"platform":"android","pnum":7,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9.0; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 V1_AND_SQ_7.9.8_999_YYB_D QQ/7.9.8.3935 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/72"},{"acdate":"2019-03-06","actime":"09","anum":7,"dnum":7,"platform":"android","pnum":7,"referdomain":"47.102.140.85","useragent":"Mozilla/5.0 (Linux; Android 9; ALP-AL00 Build/HUAWEIALP-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044504 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/2.3.1.1834 QQ/6.5.5  NetType/4G WebP/0.3.0 Pixel/1080"}]

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  "POST /api/agen/data":data,
  
};
