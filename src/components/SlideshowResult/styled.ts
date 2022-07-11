import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: ${(props: { margin?: string; width?: string; height?: string }) =>
    props.margin};
  max-width: 1280px;
  width: ${(props: { width?: string; height?: string }) =>
    props.width || '256px'};
  height: ${(props: { width?: string; height?: string }) =>
    props.height || '174px'};
  background: #fff;
  resize: both;
  overflow: hidden;
`;

export const ImageWay = styled.div`
  padding: 0 4px;
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ffffffa4;
`;

export const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  max-width: 1280px;
  /* max-height: 750px; */
  width: 100%;
  height: 100%;
`;

export const Controller = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 30px;
  font-size: 12px;
  background: #000;
  text-align: center;
  span {
    width: 14px;
    height: 14px;
    margin: 4px;
    line-height: 14px;
    background: #fff;
    cursor: pointer;
  }
`;
