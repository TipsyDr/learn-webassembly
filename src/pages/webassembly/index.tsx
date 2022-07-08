import { FC } from 'react';
import { Button } from '@/stories/Button/Button';
import { Pagination } from '@/stories/PageNation/pagination';

const Webassembly: FC = () => {
  return (
    <>
      <span>webassembly</span>
      <Button
        primary={true}
        label={'按钮'}
        size="small"
        backgroundColor="#22a30e"
      />
      <Pagination
        start={0}
        limit={10}
        total={199}
        maxPagerCount={5}
        showGotoPager
        showSelectSize
        // onChangePager={action('onChangePager')}
      />
    </>
  );
};

export default Webassembly;
