import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Content, Button } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import ReactEcharts from 'echarts-for-react';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field, TagCloud } from '@/components/Charts';
import {
  getExcel
} from '@/services/api';

@connect(({ userPic, loading }) => ({
  userPic,
  loading: loading,
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
  };
  handleClick() {
    fetch('/api/getexcel').then(res => res.blob()).then((blob) => {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      var filename = '用户行为分析报表.xls';
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }




  render() {

    const topColResponsiveProps = {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 3,
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
        <Row gutter={24} >
          <Col {...topColResponsiveProps}>
            <ChartCard title={"报表导出"} bordered={false} footer={
              <Button onClick={this.handleClick} >导出</Button>
            } />

          </Col>
          {/* <Col {...topColResponsiveProps}>
            <ChartCard title={"报表导出"} bordered={false} footer={
              <a href="/api/getexcel" download="filename.xls">Download file</a>
            } />

          </Col> */}
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
