import styled from 'styled-components';
import { Descriptions, Modal, Drawer } from 'antd';
import { TitleProps } from './type';

export const FullFlexCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleTitle = styled.span`
  display: ${(props: TitleProps) => props.display || 'block'};
  margin-bottom: 10px;
  line-height: 100%;
  span {
    vertical-align: middle;
  }
  svg {
    margin-right: 10px;
  }
  b {
    vertical-align: middle;
    font-weight: ${(props: TitleProps) => props.fontWeight || 500};
    font-size: ${(props: TitleProps) => props.fontSize || '14px'};
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
