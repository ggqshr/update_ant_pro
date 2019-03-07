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


@connect(({ userPic, loading }) => ({
  userPic,
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
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'userPic/fetchAllData',
      });
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userPic/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }






  render() {
    
    const topColResponsiveProps = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 14 },
    };
    const { userPic, loading } = this.props;
    const { ageOpt,
      employeeOpt,
      numOpt,
      educationOpt,
    } = userPic;
    let salesPieData;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard title={"性别比例"} bordered={false} footer={
              <ReactEcharts option={numOpt}></ReactEcharts>
            } />

          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard title={"学历分布"} footer={
              <ReactEcharts option={educationOpt}></ReactEcharts>
            } />

          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"年龄分布"} footer={
              <ReactEcharts option={ageOpt}></ReactEcharts>
            } />

          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={24}>
            <ChartCard title={"Top10职业分布"} footer={
      <ReactEcharts option={employeeOpt}></ReactEcharts>
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
