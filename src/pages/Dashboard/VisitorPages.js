import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

const IntroduceRow = React.lazy(() => import('./UserIntroduceRow'));
const SalesCard = React.lazy(() => import('./VisitorSalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));

@connect(({ userPic, loading }) => ({
  userPic,
  loading: loading,
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
  };
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: "userPic/fetchAllVisitorData",
    })
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
    const { salesType, currentTabKey,rangePickerValue2,rangePickerValue } = this.state;
    const { userPic, loading } = this.props;
    const {
      rateopt,
      rateopt2,
      oldnewOpt,
      deepOpt
    } = userPic;
    let salesPieData;
    return (
      <GridContent>
        <Suspense fallback={null}>
          <SalesCard
            // salesData={salesData}
            loading={oldnewOpt === undefined ? true : false}
            // selectDate={this.selectDate}
            // echart的数据
            rateopt={deepOpt}
            title={"近七日用户平均访问深度"}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <SalesCard
                  // salesData={salesData}
                  loading={oldnewOpt === undefined ? true : false}
                  // selectDate={this.selectDate}
                  // echart的数据
                  rateopt={oldnewOpt}
                  title={"新会员和旧会员人数"}
                />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
