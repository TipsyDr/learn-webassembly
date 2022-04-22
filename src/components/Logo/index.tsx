import { FC } from 'react';
import { TextWrap, Bubble, Text } from './styled';
import { useNavigate } from 'react-router-dom';

interface Props {
  path?: string;
  title: string;
  subTitle?: string;
}

export const Logo: FC<Props> = props => {
  const { path, title, subTitle } = props;
  const navigate = useNavigate();
  const rnd = function (m: string, n: string) {
    const m1 = parseInt(m);
    const n1 = parseInt(n);
    return Math.floor(Math.random() * (n1 - m1 + 1)) + m1;
  };

  const CreateBubbles = function () {
    const bubbleCount = 20;
    let dom = [];
    for (var i = 0; i <= bubbleCount; i++) {
      const size = rnd('2', '8');
      const top = rnd('20', '80') + '%';
      const left = rnd('0', '95') + '%';
      const width = size + 'px';
      const height = size + 'px';
      const animation = rnd('0', '30') / 10 + 's';
      const style = {
        top: top,
        left: left,
        width: width,
        height: height,
        animationDelay: animation,
      };
      dom.push(<span className="particle" style={style} key={i}></span>);
    }
    return <>{dom}</>;
  };

  const go = function () {
    path ? (window.location.href = path) : '';
  };

  return (
    <>
      <TextWrap onClick={go}>
        <Bubble>
          <CreateBubbles />
          <Text>
            <span>{title}</span>
            <span>{subTitle}</span>
          </Text>
        </Bubble>
      </TextWrap>
    </>
  );
};
