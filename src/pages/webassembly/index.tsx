import { FC } from 'react';
import { Button } from '@/stories/Button/Button';
import { Pagination } from '@/stories/PageNation/pagination';
import './index.less';

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
      <div>
        <Pagination
          start={1}
          limit={10}
          total={199}
          maxPagerCount={5}
          showGotoPager
          showSelectSize
          // onChangePager={action('onChangePager')}
          classes={{
            root: 'root',
            ul: 'ul',
            'prev-dot-page': 'prev-dot-page',
            'next-dot-page': 'next-dot-page',
            li: 'li',
            'goto-page': 'goto-page',
            'page-text': 'page-text',
            'goto-page-input': 'goto-page-input',
            'total-page-text': 'total-page-text',
            'prev-arrow-page': 'prev-arrow-pag',
            'next-arrow-page': 'next-arrow-page',
            'active-page': 'active-page',
          }}
        />
      </div>
    </>
  );
};

export default Webassembly;
