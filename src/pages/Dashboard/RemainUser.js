import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Content } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import ReactEcharts from 'echarts-for-react';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field, TagCloud } from '@/components/Charts';


@connect(({ monitor, loading }) => ({
  monitor,
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
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:'monitor/fetchNewAndActiveRemainData'
    })
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'monitor/fetchRemainData',
      });
    });
  }
  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'userPic/clear',
  //   });
  //   cancelAnimationFrame(this.reqRef);
  //   clearTimeout(this.timeoutId);
  // }






  render() {
    
    const topColResponsiveProps = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 14 },
    };
    const { monitor, loading } = this.props;
    const { remainOpt,newOpt,activeOpt} = monitor;
    console.log(newOpt,activeOpt)
    let salesPieData;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"7日存留分析"} 
            loading={loading.effects['monitor/fetchRemainData']}
            footer={
      <ReactEcharts option={remainOpt}></ReactEcharts>
            } />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"近七日新增用户留存比例"} 
            loading={loading.effects['monitor/fetchNewAndActiveRemainData']}
            footer={
      <ReactEcharts option={newOpt}></ReactEcharts>
            } />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"近七日活跃用户留存比例"} 
            loading={loading.effects['monitor/fetchNewAndActiveRemainData']}
            footer={
      <ReactEcharts option={activeOpt}></ReactEcharts>
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
