import React, { useState, ReactElement, useEffect } from 'react';
// import { LeftArrow, RightArrow } from '@wisers/react-icons';
import styled from 'styled-components';
import { getRootClassName } from '../../modules/className';

export type PaginationClassKeys =
  | 'root'
  | 'ul'
  | 'li'
  | 'goto-page'
  | 'goto-page-input'
  | 'page-text'
  | 'total-page-text'
  | 'prev-dot-page'
  | 'next-dot-page'
  | 'prev-arrow-page'
  | 'next-arrow-page'
  | 'active-page';

const PaginationContainer = styled.div`
  text-align: right;
  margin: 0px 8px;
  position: relative;
  z-index: 1;
`;

const GotoPage = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  background-color: #fff;
`;

const SelectSize = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  background-color: #fff;
`;

const Ul = styled.ul`
  border-radius: 2px;
  background-clip: padding-box;
  z-index: 9999;
  display: inline-flex;
  padding-left: 0;
  list-style: none;
  border: 1px solid #ccc;
  position: relative;
  vertical-align: middle;
  margin-left: 4px;
  background-color: #fff;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 8px 10px;
  border-left: 1px solid #ccc;
  color: #999999;
  cursor: pointer;
  background-color: #fff;
`;

const ActivePage = styled(Li)`
  font-weight: bold;
  color: #0033ee;
`;

const PrevArrowPage = styled(Li)<{
  disabled?: boolean;
}>`
  border-left: transparent;
  cursor: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? '0.3' : '1'};
`;

const NextArrowPage = styled(Li)<{
  disabled?: boolean;
}>`
  cursor: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? '0.3' : '1'};
`;

const PrevDotPage = styled(Li)`
  &::after {
    content: '•••';
  }
  &:hover {
    &::after {
      content: '<<';
      color: 'red';
    }
  }
`;

const NextDotPage = styled(Li)`
  &::after {
    content: '•••';
  }
  &:hover {
    &::after {
      content: '>>';
      color: 'red';
    }
  }
`;

const PageText = styled.span`
  line-height: 32px;
  padding: 0 5px;
  font-size: 12px;
  color: #000000;
`;

const TotalPageText = styled.span`
  line-height: 32px;
  padding: 0 5px;
  font-size: 12px;
  color: #000000;
`;

const SelectPageSize = styled.select`
  text-align: center;
  &:focus {
    outline: none;
  }
  border: 1px solid #3f257c;
  color: #000000;
  padding: 6px 0;
  border-radius: 3px;
`;

const GotoPageInput = styled.input`
  text-align: center;
  &:focus {
    outline: none;
  }
  border: 1px solid #3f257c;
  width: 36px;
  color: #000000;
  padding: 6px 0;
  border-radius: 3px;
`;

const FIRST_PAGER = 1;

export type Classes = {
  root?: string;
  ul?: string;
  ['prev-dot-page']?: string;
  ['next-dot-page']?: string;
  li?: string;
  ['goto-page']?: string;
  ['page-text']?: string;
  ['goto-page-input']?: string;
  ['total-page-text']?: string;
  ['prev-arrow-page']?: string;
  ['next-arrow-page']?: string;
  ['active-page']?: string;
};

interface PaginationProps {
  limit: number;
  limitOptions?: number[];
  start: number;
  total: number;
  maxPagerCount: number;
  totalPageCount?: number;
  currentPager?: number;
  inputPager?: number;
  showGotoPager?: boolean;
  showSelectSize?: boolean;
  onChangePager?: (start: number, limit: number) => void | undefined;
  onShowSizeChange?: (currentPager: number, limit: number) => void | undefined;
  classes?: Classes;
  className?: string;
  leftArrayColor?: string;
  rightArrayColor?: string;
}

export const Pagination = (props: PaginationProps): ReactElement => {
  const {
    limit = 10,
    limitOptions = [10, 20, 50, 100],
    start,
    total,
    showGotoPager,
    showSelectSize,
    onChangePager,
    onShowSizeChange,
    maxPagerCount,
    classes,
    className,
    // leftArrayColor = '#000000',
    // rightArrayColor = '#000000',
  } = props;
  const [pageSize, setPageSize] = useState(limit);

  const [currentPager, setCurrentPager] = useState(
    start > 0 ? Math.ceil(start / limit) : FIRST_PAGER,
  );

  const [inputPager, setInputPager] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(
    Math.ceil(total / limit),
  );

  useEffect(() => {
    onShowSizeChange && onShowSizeChange(currentPager, pageSize);
    setCurrentPager(Math.ceil(start / pageSize));
    setTotalPageCount(Math.ceil(total / pageSize));
  }, [pageSize]);

  useEffect(() => {
    setPageSize(limit);
  }, [props.limit]);

  const handleClickPreviousPager = () => {
    if (currentPager && currentPager > FIRST_PAGER) {
      setCurrentPager(currentPager - 1);
      handleUpdatePagerState(currentPager - 1);
    }
  };

  const handleClickNextPager = () => {
    if (currentPager < totalPageCount) {
      setCurrentPager(currentPager + 1);
      handleUpdatePagerState(currentPager + 1);
    }
  };

  const handleClickPager = (pager: number) => {
    handleUpdatePagerState(pager);
  };

  const handleUpdatePagerState = (pager: number) => {
    if (onChangePager) {
      const start = (pager - 1) * limit;

      onChangePager(start, limit);
    }
    setCurrentPager(pager);
  };

  const handleClickDotPagerEnum = (type: 'prev' | 'next') => {
    let pager = FIRST_PAGER;

    if (type === 'prev') {
      pager = currentPager - maxPagerCount;
      if (pager <= FIRST_PAGER) {
        pager = FIRST_PAGER;
      }
    } else {
      pager = totalPageCount;
    }
    handleUpdatePagerState(pager);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickEnterKey = (e: any) => {
    if (e.charCode === 13) {
      let pager = inputPager;

      if (inputPager > totalPageCount) {
        pager = totalPageCount;
      }
      setInputPager(0);
      handleUpdatePagerState(pager);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputPagerChanged = (e: any) => {
    const pager = e.target.value;

    if (/^\d*$/.test(pager)) {
      setInputPager(+pager);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageSizeChanged = (e: any) => {
    const pager = e.target.value;

    if (parseInt(pager)) {
      setPageSize(parseInt(pager));
    }
  };

  function renderDotPager(type: 'prev' | 'next') {
    if (type === 'prev') {
      return (
        <PrevDotPage
          key={type}
          onClick={() => handleClickDotPagerEnum(type)}
          className={classes?.['prev-dot-page']}
        >
          <span />
        </PrevDotPage>
      );
    }

    return (
      <NextDotPage
        key={type}
        onClick={() => handleClickDotPagerEnum(type)}
        className={classes?.['next-dot-page']}
      >
        <span />
      </NextDotPage>
    );
  }

  function renderPagers() {
    const pagerEles = [];
    const middlePage = Math.floor(maxPagerCount / 2);
    let startPager = FIRST_PAGER;

    if (currentPager + middlePage >= totalPageCount) {
      startPager = totalPageCount - maxPagerCount;
      startPager += 1;
    } else if (currentPager - middlePage > 0) {
      startPager = currentPager - middlePage;
    }
    startPager = startPager > 0 ? startPager : FIRST_PAGER;
    let endPager = startPager + maxPagerCount;

    endPager = endPager > totalPageCount ? totalPageCount : endPager;

    for (let page = startPager; page < endPager; page += 1) {
      if (page === currentPager) {
        pagerEles.push(
          <ActivePage
            onClick={() => handleClickPager(page)}
            className={classes?.['active-page']}
          >
            {page}
          </ActivePage>,
        );
      } else {
        pagerEles.push(
          <Li onClick={() => handleClickPager(page)} className={classes?.li}>
            {page}
          </Li>,
        );
      }
    }

    if (startPager > 2) {
      pagerEles.unshift(renderDotPager('prev'));
    }
    if (startPager >= 2) {
      pagerEles.unshift(
        <Li onClick={() => handleClickPager(1)} className={classes?.li}>
          {1}
        </Li>,
      );
    }

    if (endPager < totalPageCount) {
      pagerEles.push(renderDotPager('next'));
    }
    if (endPager <= totalPageCount) {
      if (totalPageCount === currentPager) {
        pagerEles.push(
          <ActivePage
            onClick={() => handleClickPager(totalPageCount)}
            className={classes?.['active-page']}
          >
            {totalPageCount}
          </ActivePage>,
        );
      } else {
        pagerEles.push(
          <Li
            onClick={() => handleClickPager(totalPageCount)}
            className={classes?.li}
          >
            {totalPageCount}
          </Li>,
        );
      }
    }

    return pagerEles;
  }

  const rootClassName = getRootClassName(classes, className);

  return (
    <PaginationContainer className={rootClassName}>
      <Ul className={classes?.ul}>
        {totalPageCount > 1 && (
          <PrevArrowPage
            key="Left"
            disabled={currentPager === FIRST_PAGER}
            onClick={handleClickPreviousPager}
            className={classes?.['prev-arrow-page']}
          >
            {/* <LeftArrow size="md" color={leftArrayColor} /> */}
            <div>左边</div>
          </PrevArrowPage>
        )}
        {renderPagers()}
        {totalPageCount > 1 && (
          <NextArrowPage
            key="right"
            disabled={totalPageCount === currentPager}
            onClick={handleClickNextPager}
            className={classes?.['next-arrow-page']}
          >
            {/* <RightArrow size="md" color={rightArrayColor} />
             */}
            <div>右边</div>
          </NextArrowPage>
        )}
      </Ul>
      {showSelectSize && totalPageCount > 1 && (
        <SelectSize className={classes?.['goto-page']}>
          <SelectPageSize
            value={pageSize}
            onChange={e => handlePageSizeChanged(e)}
            className={classes?.['goto-page-input']}
          >
            {limitOptions.map((opt, i) => {
              return (
                <option key={i} value={opt}>
                  {`${opt}条/页`}
                </option>
              );
            })}
          </SelectPageSize>
        </SelectSize>
      )}
      {showGotoPager && totalPageCount > 1 && (
        <GotoPage className={classes?.['goto-page']}>
          <PageText className={classes?.['page-text']}>Page&nbsp;</PageText>
          <GotoPageInput
            type="text"
            value={inputPager && inputPager > 0 ? inputPager : ''}
            onKeyPress={e => handleClickEnterKey(e)}
            onChange={e => handleInputPagerChanged(e)}
            className={classes?.['goto-page-input']}
          />
          <TotalPageText>of {totalPageCount}</TotalPageText>
        </GotoPage>
      )}
    </PaginationContainer>
  );
};
