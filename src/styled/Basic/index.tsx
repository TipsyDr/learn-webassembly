import { StyleProps } from './type';
import styled from 'styled-components';
import { Descriptions, Modal, Drawer, Breadcrumb, Table } from 'antd';

export const FullFlexCenter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PointLoadingCss = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    background: #fff;
  }
  div {
    color: #fff;
  }
`;

export const LoadingModal = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

export const TitleSticky = styled.div`
  position: sticky;
  z-index: 1000;
  display: flex;
  align-items: center;
  top: ${(props: StyleProps) => props.top || '-16px'};
  background: ${(props: StyleProps) => props.background || '#fff'};
  height: ${(props: StyleProps) => props.height || '50px'};
  margin-bottom: ${(props: StyleProps) => props.marginBottom || '10px'};
`;

export const StyleTitle = styled.span`
  display: ${(props: StyleProps) => props.display || 'block'};
  line-height: 100%;
  span {
    vertical-align: middle;
  }
  svg {
    margin-right: 10px;
  }
  b {
    vertical-align: middle;
    font-weight: ${(props: StyleProps) => props.fontWeight || 500};
    font-size: ${(props: StyleProps) => props.fontSize || '14px'};
  }
`;

export const Description = styled(Descriptions)`
  padding-left: 26px;
`;
export const DescItem = styled(Descriptions.Item)``;

export const DmpModal = styled(Modal)`
  border-radius: 10px;
  overflow: hidden;
`;

export const DmpDrawer = styled(Drawer)``;

export const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  color: #f10707;
`;

export const MsgLoading = styled.div`
  background: #f10707;
`;

export const BtnGroup = styled.div`
  display: ${(props: StyleProps) => props.display || 'flex'};
  align-items: ${(props: StyleProps) => props.alignItems || 'center'};
  justify-content: ${(props: StyleProps) => props.justifyContent || 'none'};
  margin: ${(props: StyleProps) => props.margin || '10px 0'};
  padding: ${(props: StyleProps) => props.padding || ''};
`;

export const DmpBreadcrumb = styled(Breadcrumb)`
  ol {
    padding: 0;
  }
`;

export const StyleTable = styled(Table)`
  padding: 0px;
`;
