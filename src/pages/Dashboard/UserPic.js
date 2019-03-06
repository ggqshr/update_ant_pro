import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Content } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import ReactEcharts from 'echarts-for-react';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';

const IntroduceRow = React.lazy(() => import('./UserIntroduceRow'));
const SalesCard = React.lazy(() => import('./UserSalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading,
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
  };
  componentWillMount() {
    var moment = require('moment');
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDataPerHour',
    });
    dispatch({
      type: "chart/fetchRateData",
      payload: {
        startDate: moment().add(-7, 'days').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      }
    })
    dispatch({
      type: "chart/fetchRateData2",
      payload: {
        startDate: moment().add(-7, 'days').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      }
    })
  }
  componentDidMount() {
    var moment = require('moment');
    const rangePickerValue = [moment().add(-7, 'days'), moment()]
    const rangePickerValue2 = [moment().add(-7, 'days'), moment()]
    this.setState({
      rangePickerValue,
      rangePickerValue2
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDetailData',
    });
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetchUserData',
      });
    });
  }
  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    if (rangePickerValue[0] != undefined) {
      dispatch({
        type: 'chart/fetchRateData',
        payload: {
          startDate: rangePickerValue[0].format("YYYY-MM-DD"),
          endDate: rangePickerValue[1].format("YYYY-MM-DD")
        }
      });
    }
  };
  handleRangePickerChange2 = rangePickerValue2 => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue2,
    });
    if (rangePickerValue2[0] != undefined) {
      dispatch({
        type: 'chart/fetchRateData2',
        payload: {
          startDate: rangePickerValue2[0].format("YYYY-MM-DD"),
          endDate: rangePickerValue2[1].format("YYYY-MM-DD")
        }
      });
    }

  };
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  //切换tab
  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };


  isActive = type => {

    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };
    const topColResponsiveProps = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 14 },
    };
    const { chart, loading } = this.props;
    const {
    } = chart;
    let salesPieData;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard title={"性别比例"} bordered={false} footer={
              <ReactEcharts option={option}></ReactEcharts>
            } />

          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard title={"学历分布（用饼图）"} footer={
              <ReactEcharts option={option}></ReactEcharts>
            } />

          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"年龄分布（用柱状图）"} footer={
              <ReactEcharts option={option}></ReactEcharts>
            } />

          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"Top10职业分布"} footer={
              <ReactEcharts option={option}></ReactEcharts>
            } />
          </Col>
        </Row>
      </GridContent>

    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
