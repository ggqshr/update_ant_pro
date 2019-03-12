import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Content, Button, Alert, Badge } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import ReactEcharts from 'echarts-for-react';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field, TagCloud } from '@/components/Charts';
import { getExcel } from '@/services/api';

@connect(({ userPic, loading }) => ({
  userPic,
  loading: loading,
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
  };
  handleClick(flag) {
    var url = "/api/getexcel"
    var filename;
    if (flag === 'user') {
      url = "/api/getexcel";
      filename = "用户行为分析报表.xls"
    } else if (flag === 'agent') {
      url = "/api/getexcelagent";
      filename = "终端分析报表.xls"
    } else {
      url = "/api/getexcelproduct"
      filename = "产品分析报表.xls"
    }
    console.log(url,filename)
    fetch(url).then(res => res.blob()).then((blob) => {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }




  render() {

    const topColResponsiveProps = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 14, "textAlign": "center" },
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
            <ChartCard title={"用户操作报表导出"} bordered={false} footer={
              <Button onClick={() => this.handleClick("user")} >导出</Button>
            } />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard title={"产品分析报表导出"} bordered={false} footer={
              <Button onClick={() => this.handleClick("product")} >导出</Button>
            } />
          </Col>
        </Row>
        <Row gutter={24} >
          <Col {...topColResponsiveProps}>
            <ChartCard title={"终端分析报表导出"} bordered={false} footer={
              <Button onClick={() => this.handleClick("agent")} >导出</Button>
            } />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard bordered={false} title={"敬请期待"} footer={
              <Button  >敬请期待</Button>
            }
            >

            </ChartCard>
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
