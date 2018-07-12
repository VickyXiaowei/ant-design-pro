import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table,
} from 'antd';

import AWS from 'aws-sdk';

import styles from './AwsSearch.less';

AWS.config.update({
  region: 'us-east-2',
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: 'AKIAIR4N6UE4RVWIOJAQ',
  // secretAccessKey default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: 'BIUMX1G/l0gpsxOJpesdIdQS0k43luHbw1EpZUTm',
});

let docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'TEST_TABLE';

@connect(({ awsModel }) => ({
  awsModel,
}))
export default class AwsSearch extends PureComponent {
  state = {};

  componentDidMount() {
    this.queryItems();
  }

  success = () => {
    message.success('Add one data success!!!');
  };

  addItem = () => {
    const _this = this;
    const {
      dispatch,
      awsModel: { id },
    } = this.props;

    const params = {
      TableName: TableName,
      Item: {
        ID: id.toString(),
        desc: 'this is a description',
        calltimes: '180000002',
        status: 'closed',
        time: '2017-07-01 00:00:00',
        flag: '1',
      },
    };

    docClient.put(params, function(err, data) {
      if (err) {
        // console.log("Error", err);
      } else {
        _this.success();

        dispatch({
          type: 'awsModel/addItem',
          payload: id,
        });

        _this.queryItems();
      }
    });
  };

  queryItems = () => {
    const { dispatch } = this.props;

    const query = {
      TableName: TableName,
      Limit: 1000,
    };

    docClient.scan(query, function(err, data) {
      if (err) {
        // console.log("Error", err);
      } else {
        dispatch({
          type: 'awsModel/queryItems',
          payload: data.Items,
        });
      }
    });
  };

  render() {
    const {
      awsModel: { items },
      loading,
    } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
      },
      {
        title: 'time',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'flag',
        dataIndex: 'flag',
        key: 'flag',
      },
      {
        title: 'calltimes',
        dataIndex: 'calltimes',
        key: 'calltimes',
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
      },
    ];

    return (
      <div>
        <div className={styles.addButton}>
          <Button type="primary" onClick={this.addItem} icon="plus">
            Add
          </Button>
        </div>
        <Table dataSource={items} columns={columns} loading={loading} />
      </div>
    );
  }
}
