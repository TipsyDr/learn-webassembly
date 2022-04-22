import { Tag, Input, Tooltip } from 'antd';
import { EditBtn } from '@/components';
import { FC, useEffect, useState } from 'react';

interface Props {
  tags: string[];
  submit: (val: string[]) => void;
}

export const EditTags: FC<Props> = props => {
  const { tags, submit } = props;
  const [defaultTags, setDefaultTags] = useState<string[]>([]);
  const [updateTags, setUpdateTags] = useState<string[]>();
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState<number>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');

  const handleClose = (removedTag: string) => {
    const tags = (updateTags || defaultTags).filter(tag => tag !== removedTag);
    setUpdateTags(tags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tags: string[] = [];
    if (inputValue && (updateTags || defaultTags).indexOf(inputValue) === -1) {
      tags = [...(updateTags || defaultTags), inputValue];
      setUpdateTags(tags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: any) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...(updateTags || defaultTags)];
    newTags[editInputIndex] = editInputValue;

    setUpdateTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  useEffect(() => {
    setDefaultTags(tags || []);
  }, [tags]);

  useEffect(() => {
    updateTags && submit(updateTags);
  }, [updateTags]);

  return (
    <>
      {(updateTags || defaultTags).map((tag, index) => {
        // if (editInputIndex === index) {
        //   return (
        //     <Input
        //       key={tag}
        //       autoFocus
        //       size="small"
        //       style={{
        //         width: '78px',
        //         marginRight: '8px',
        //         verticalAlign: 'top',
        //       }}
        //       value={editInputValue}
        //       onChange={handleEditInputChange}
        //       onBlur={handleEditInputConfirm}
        //       onPressEnter={handleEditInputConfirm}
        //     />
        //   );
        // }

        const isLongTag = tag.length > 10;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
            // onDoubleClick={() => {
            //   setEditInputIndex(index);
            //   setEditInputValue(tag);
            // }}
            >
              {isLongTag
                ? `${(updateTags || defaultTags).slice(0, 10)}...`
                : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{
            width: '78px',
            marginRight: '8px',
            verticalAlign: 'top',
          }}
          value={inputValue}
          autoFocus
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && <EditBtn onClick={showInput} />}
    </>
  );
};
