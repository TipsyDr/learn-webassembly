import { FC, useEffect, useState } from 'react';
import { Checkbox, Modal } from 'antd';
import { Description, DescItem } from '@/styled/Basic';
import { TagGroup, TagType } from '@/types';
import { useGetSceneDescription } from '@/api';

interface Props {
  tags?: TagType[];
  visible: boolean;
  ok: (val: TagType[]) => void;
  cancel: () => void;
}

export const TagsModal: FC<Props> = props => {
  const { visible, ok, cancel, tags } = props;
  const [editTags, setEditTags] = useState<string[]>([]);
  const [submitTags, setSubmitTags] = useState<TagType[]>([]);
  const [tagOptions, setTagOptions] = useState<TagGroup[]>([]);
  const { data, error, isLoading, refetch } = useGetSceneDescription();

  const getCheckboxItem = function (tagGroup: TagGroup) {
    return (
      <div key={tagGroup.value}>
        <h3 style={{ marginLeft: '26px' }}>{tagGroup?.title}</h3>
        <Description
          size="small"
          column={1}
          labelStyle={{ width: '80px', color: '#9c9c9c', fontSize: '14px' }}
          contentStyle={{ fontSize: '14px', flexWrap: 'wrap' }}
        >
          {tagGroup?.children?.map(values => {
            return (
              <DescItem
                label={values.title || tagGroup.title}
                key={values.value}
              >
                {values.children.map(value => {
                  return (
                    <Checkbox
                      style={{ marginLeft: 0, marginRight: '10px' }}
                      value={value.value + '|' + value.title}
                      key={value.value}
                    >
                      {value.title}
                    </Checkbox>
                  );
                })}
              </DescItem>
            );
          })}
        </Description>
      </div>
    );
  };
  const onChange = function (checkedValues: any) {
    const editTags = checkedValues.map((tag: string) => {
      const tagArr = tag.split('|');
      return {
        value: tagArr[0],
        key: tagArr[0],
        title: tagArr[1],
      };
    });
    setEditTags(checkedValues);
    setSubmitTags(editTags);
  };
  const handleOk = () => {
    ok(submitTags!);
  };

  const handleCancel = () => {
    cancel();
  };

  useEffect(() => {
    const defaultTags = tags?.map(tag => tag.value + '|' + tag.title);
    setTagOptions(data?.data);
    setEditTags(defaultTags || []);
  }, [tags]);

  return (
    <>
      <Modal
        width="80%"
        title="更新场景标签"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group
          onChange={onChange}
          value={editTags as unknown as string[]}
        >
          {tagOptions?.map(item => {
            return getCheckboxItem(item);
          })}
        </Checkbox.Group>
      </Modal>
    </>
  );
};
