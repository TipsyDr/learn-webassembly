import styled from 'styled-components';

export const TextWrap = styled.div`
  text-align: center;
  cursor: pointer;
`;

export const Bubble = styled.div`
  position: relative;
  .particle {
    opacity: 0;
    position: absolute;
    z-index: -1;
    background-color: rgba(33, 150, 243, 0.8);
    -webkit-animation: bubbles 3s ease-in infinite;
    animation: bubbles 3s ease-in infinite;
    border-radius: 100%;
  }
  @-webkit-keyframes bubbles {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
      -webkit-transform: translate(0, -20%);
      transform: translate(0, -20%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate(0, -1000%);
      transform: translate(0, -1000%);
    }
  }
  @keyframes bubbles {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
      -webkit-transform: translate(0, -20%);
      transform: translate(0, -20%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate(0, -1000%);
      transform: translate(0, -1000%);
    }
  }
`;

export const Text = styled.div`
  min-width: 100px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: normal;
  align-items: center;
  color: #fff;
  font-weight: bold;
`;
