import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getTotalDate() {
  return request('/api/totaldata');
}

export async function getDetailData() {
  return request('/api/detaildata');
}

export async function getDataPerHour() {
  const res = request('/api/dataperhour');
  return res;
}

export function getOption(res) {
  res = res.dataperhour;
  const pvOption = getPvOption(
    res.today.pvData,
    res.yestoday.pvData,
    res.beforseven.pvData,
    res.beformonth.pvData
  );
  const uvOption = getPvOption(
    res.today.uvData,
    res.yestoday.uvData,
    res.beforseven.uvData,
    res.beformonth.uvData
  );
  const vvOption = getPvOption(
    res.today.vvData,
    res.yestoday.vvData,
    res.beforseven.vvData,
    res.beformonth.vvData
  );
  const ipOption = getPvOption(
    res.today.ipData,
    res.yestoday.ipData,
    res.beforseven.ipData,
    res.beformonth.ipData
  );
  return { pvOption, uvOption, vvOption, ipOption };
}

export function getPvOption(todayData, yestodayData, sevenData, monthData) {
  return {
    legend: {
      data: ['今天', '昨天', '7天前', '30天前'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        name: '今天',
        data: todayData,
        type: 'line',
      },
      {
        name: '昨天',
        data: yestodayData,
        type: 'line',
      },
      {
        name: '7天前',
        data: sevenData,
        type: 'line',
      },
      {
        name: '30天前',
        data: monthData,
        type: 'line',
      },
    ],
  };
}


export async function getUserData() {
  return request("/api/userdata")
}

export async function getRateData(payload) {
  return request("/api/ratedata", {
    method: 'POST',
    body: { "startDate": payload.startDate, "endDate": payload.endDate },
  }
  )
}

export async function getRateData2(payload) {
  return request("/api/oldandnewdata", {
    method: 'POST',
    body: { "startDate": payload.startDate, "endDate": payload.endDate },
  }
  )
}

export function getRateOption(data) {
  return {
    legend: {
      data: ['新增用户', '活跃用户'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.rangdates,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        name: '新增用户',
        data: data.newrate,
        type: 'line',
      },
      {
        name: '活跃用户',
        data: data.activerate,
        type: 'line',
      },
    ],
  };
}

export function getOldAndNewOpt(data) {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      source: data
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar' },
      { type: 'bar' },
    ]
  }
}

export async function getAllData() {
  return request("/api/userpic/getalldata");
}

export function getBingOpt(datalabel, data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: datalabel
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }
    ]
  };
}

export function getLineOpt(datalabel, data) {
  return {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: datalabel
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人'
      }
    },
    series: [{
      name: "年龄分布",
      data: data,
      type: 'bar',
      markPoint: {
        data: [
          { type: 'max', name: '最多人数' },
          { type: 'min', name: '最小人数' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }]
  }

}

export function getfunnelOpt(datalabel,data){
  return {
    title: {
        subtext:"排名从上到下递增"
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        data: datalabel
    },
    calculable: true,
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '100%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '40%',
            maxSize: '150%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: data,
        }
    ]
};

}