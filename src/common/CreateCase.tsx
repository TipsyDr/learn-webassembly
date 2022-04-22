import { FC, useState } from 'react';
import { Modal, Input, Tooltip, DatePicker } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { Description, DescItem } from '@/styled/Basic';
import { BagInfo, CreateCaseParams } from '@/types';
import moment, { Moment } from 'moment';
import { notice } from '@/components';
import { useLoginContext } from '@/context';
const DatePickerNode: any = DatePicker;

interface Props {
  bagSetId?: string;
  submitCaseInfo?: BagInfo;
  visible?: boolean;
  ok: (val: CreateCaseParams) => void;
  cancel: () => void;
}

const CreateCase: FC<Props> = props => {
  const [occurrenceTime, setOccurrenceTime] = useState<number>(0);
  const [remark, setRemark] = useState<string>('');
  const { bagSetId, submitCaseInfo, visible, ok, cancel } = props;
  const { userInfo } = useLoginContext();

  const handleOk = function () {
    if (occurrenceTime) {
      return ok({
        bagSetId: bagSetId,
        userId: userInfo?.userName,
        informant: userInfo?.userName,
        dateTime: occurrenceTime,
        remark: remark,
      });
    }
    return notice({
      type: 'warning',
      mes: '发生时间为必填项',
    });
  };

  const range = (startTime: number, endTime: number) => {
    const result = [];
    if (startTime && endTime) {
      for (let i = startTime; i < endTime; i++) {
        result.push(i);
      }
      return result;
    }
    return [];
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title="创建case"
        visible={visible}
        onOk={handleOk}
        onCancel={cancel}
      >
        <Description
          size="small"
          column={1}
          labelStyle={{ width: '80px', color: '#9c9c9c', fontSize: '14px' }}
          contentStyle={{ fontSize: '14px' }}
        >
          <DescItem label="bag集合ID">{bagSetId}</DescItem>
          {/* <DescItem label="bagId">{caseInfo?.fileId}</DescItem> */}
          {/* <DescItem label="车牌号">{carLicense}</DescItem> */}
          {/* <DescItem label="上报人">{userName}</DescItem> */}
          <DescItem label="时间">{`${submitCaseInfo?.start || '0'}——${
            submitCaseInfo?.end || '0'
          }`}</DescItem>
          <DescItem label="上报人">{userInfo?.userName || ''}</DescItem>
          <DescItem label="发生时间">
            <DatePickerNode
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择发生时间"
              defaultPickerValue={moment(
                submitCaseInfo?.start,
                'YYYY-MM-DD HH:mm:ss',
              )}
              defaultValue={moment(
                submitCaseInfo?.start,
                'YYYY-MM-DD HH:mm:ss',
              )}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              onChange={(value: Moment | null) =>
                setOccurrenceTime(moment(value).valueOf())
              }
            />
            <Tooltip title="发生时间为必填项" color="#be0f0f">
              <WarningOutlined
                style={{ color: '#ffbb00', marginLeft: '6px' }}
              />
            </Tooltip>
          </DescItem>
          {/* <DescItem label="优先级">{caseInfo?.priority}</DescItem> */}
          {/* <DescItem label="任务类型">{caseInfo?.taskType}</DescItem> */}
          {/* <DescItem label="场景标签">
            {caseInfo?.sceneFeatures?.map(item => {
              return <Tag key={item.value}>{item.title}</Tag>;
            })}
          </DescItem> */}
          <DescItem label="备注">
            {
              <Input
                size="middle"
                placeholder="请填写备注"
                onChange={(e: { target: { value: string } }) =>
                  setRemark(e.target.value)
                }
              />
            }
          </DescItem>
        </Description>
      </Modal>
    </>
  );
};

export default CreateCase;
