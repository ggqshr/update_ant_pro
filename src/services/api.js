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
    res.beformonth.pvData,
    "对应时间的PV量"
  );
  const uvOption = getPvOption(
    res.today.uvData,
    res.yestoday.uvData,
    res.beforseven.uvData,
    res.beformonth.uvData,
    "对应时间的UV量"
  );
  const vvOption = getPvOption(
    res.today.vvData,
    res.yestoday.vvData,
    res.beforseven.vvData,
    res.beformonth.vvData,
    "对应时间的VV量"
  );
  const ipOption = getPvOption(
    res.today.ipData,
    res.yestoday.ipData,
    res.beforseven.ipData,
    res.beformonth.ipData,
    "对应时间的IP量"
  );
  const jumpOpt = getPvOption(
    res.today.jumprate,
    res.yestoday.jumprate,
    res.beforseven.jumprate,
    res.beformonth.jumprate,
    "对应时间的跳出率"
  )
  const avgTime = getPvOption(
    res.today.avgtime,
    res.yestoday.avgtime,
    res.beforseven.avgtime,
    res.beformonth.avgtime,
    "对应时间的平均访问时间"
  )
  return { pvOption, uvOption, vvOption, ipOption,jumpOpt,avgTime };
}

export function getPvOption(todayData, yestodayData, sevenData, monthData, label) {
  return {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: ['今天', '昨天', '7天前', '30天前'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 1
      },
      name: "时间",
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
      name: label
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
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: ['新增用户', '活跃用户'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.rangdates,
      name: "对应日期",
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
      name: "新增用户和活跃用户占总用户比例",
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
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
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
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
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
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
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

export function getfunnelOpt(datalabel, data) {
  return {
    title: {
      subtext: "排名从上到下递增"
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: datalabel
    },
    calculable: true,
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    series: [
      {
        name: '漏斗图',
        type: 'funnel',
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

export async function getAgentData(data) {
  return request("/api/agen/data", {
    method: 'POST',
    body: data,
  }
  )
}
export async function getRemainData() {
  return request("/api/report/remain");
}

export function getRemainOpt(data) {
  return {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: data.datalabel
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.data,
      type: 'line'
    }]
  };
}

export function getAvgDeepOpt(data) {
  return {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    title: {
      text:"该指标代表用户平均访问的深度，越深代表用户的粘性越大"
    },
    xAxis: {
      type: 'category',
      data: data.datalabel,
      name: "日期"
    },
    tooltip: {
      trigger: 'axis',
      formatter: "日期:{b}<br/>平均访问深度为{c}"
    },
    yAxis: {
      type: 'value',
      name: "用户平均访问深度（PV/UV）"
    },
    series: [{
      data: data.data,
      type: 'line'
    }]
  };
}

export async function getProductData() {
  return request("/api/product/data")
}

export async function getVisitorData() {
  return request("/api/visitor/data");
}

export function getnewAndoldOpt(data) {
  return {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['新用户', '老用户']
    },
    yAxis: {
      type: 'value',
      name: "人数",
    },
    series: [{
      data: data,
      type: 'bar',
      barWidth: 150
    }]
  };


}

export async function getActionData(){
  return request("/api/product/actiondata")
}

export async function getNewAndActiveRemain(){
  return request("/api/report/newandactiveremain")
}

export function getRemainOpt2(data,name) {
  var moment = require("moment");
  const datalabel = [
    moment().add(-6, 'days').format("YYYY-MM-DD"),
    moment().add(-5, 'days').format("YYYY-MM-DD"),
    moment().add(-4, 'days').format("YYYY-MM-DD"),
    moment().add(-3, 'days').format("YYYY-MM-DD"),
    moment().add(-2, 'days').format("YYYY-MM-DD"),
    moment().add(-1, 'days').format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]
  return {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: datalabel
    },
    tooltip: {
      trigger: 'axis',
      formatter: (parm)=>{
        const d = moment(parm[0].axisValue).diff(moment().add(-6, 'days').format("YYYY-MM-DD"),'day')
        return d+1+"日留存:"+parm[0].data+"%"
    }
    },
    yAxis: {
      type: 'value',
      name:name,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    series: [{
      data: data,
      type: 'line'
    }]
  };
}

export function getExcel(){
  return request("/api/getexcel")
}