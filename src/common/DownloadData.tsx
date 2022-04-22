import { FC, useState, useEffect } from 'react';
import { Modal, Radio } from 'antd';
import { Description, DescItem } from '@/styled/Basic';
import { ResultsType } from '@/types/mark';

interface Props {
  projects: ResultsType[];
  visible?: boolean;
  ok: () => void;
  cancel: () => void;
}

const DownloadData: FC<Props> = props => {
  const { projects } = props;

  const [dataFrame, setDataFrame] = useState<number>(0);
  const [dataMount, setDataMount] = useState<number>(0);
  const { visible, ok, cancel } = props;

  useEffect(() => {
    let dataFrame = 0;
    let dataMount = 0;
    // console.log(projects);

    projects?.forEach(item => {
      dataFrame += item.framesCount!;
      dataMount += item.annotationCount!;
    });
    setDataFrame(dataFrame);
    setDataMount(dataMount);
  }, [projects]);

  const handleOk = function () {
    // console.log({ dataFrame, dataMount });
    ok();
  };

  return (
    <>
      <Modal
        title="数据下载"
        visible={visible}
        onOk={handleOk}
        onCancel={cancel}
      >
        <Description
          size="small"
          column={1}
          labelStyle={{ width: '120px', color: '#9c9c9c', fontSize: '14px' }}
          contentStyle={{ fontSize: '14px' }}
        >
          <DescItem label="标注数据量(帧)">{dataFrame}</DescItem>
          <DescItem label="标注量(个)">{dataMount}</DescItem>
          <DescItem label="下载内容">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>全部</Radio>
              <Radio value={2}>仅原数据</Radio>
              <Radio value={3}>仅成果数据</Radio>
            </Radio.Group>
          </DescItem>
        </Description>
      </Modal>
    </>
  );
};

export { DownloadData };
