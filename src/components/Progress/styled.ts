import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  position: relative;
  z-index: 999999;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background: #ffffffa6;
`;

interface ProgressPointProps {
  left?: number | string;
  width?: number | string;
  background?: number | string;
}

export const ProgressBar = styled.div`
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 10px;
  opacity: 0.7;
  cursor: pointer;
`;

export const FrameInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  left: ${(props: ProgressPointProps) => props.left || 0};
  bottom: 10px;
  padding: 10px 4px;
  width: 100px;
  height: 100px;
  font-size: 12px;
  border-radius: 10px;
  background-color: #fff;
`;

export const ProgressLine = styled.canvas`
  pointer-events: none;
  width: 100%;
  margin: 10px 0;
  position: absolute;
  top: -10px;
  height: 10px;
  background-color: #ccc;
  cursor: pointer;
`;

export const ProgressPoint = styled.div`
  pointer-events: none;
  position: absolute;
  left: ${(props: ProgressPointProps) => props.left || 0};
  top: -5px;
  z-index: 1;
  opacity: 0.6;
  width: 1px;
  height: 20px;
  background-color: #7e16cd;
  border: 1px solid #7e16cd;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  height: 20px;
`;

export const Speed = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

export const SpeedSelect = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 20px;
  right: 0px;
  text-align: center;
  background: #000;
  color: #fff;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0;
    :hover {
      background-color: #ffffff5a;
    }
  }
`;

export const Play = styled.div`
  margin-left: -3px;
  height: 20px;
  cursor: pointer;
`;
