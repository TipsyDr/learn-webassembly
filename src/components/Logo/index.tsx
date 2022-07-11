import { FC } from 'react';
import { TextWrap, Bubble, Text } from './styled';

interface Props {
  path?: string;
  title: string;
  subTitle?: string;
}

export const Logo: FC<Props> = props => {
  const { path, title, subTitle } = props;
  const rnd = function (m: string, n: string) {
    const m1 = parseInt(m);
    const n1 = parseInt(n);

    return Math.floor(Math.random() * (n1 - m1 + 1)) + m1;
  };

  const CreateBubbles = function () {
    const bubbleCount = 20;
    const dom = [];

    for (let i = 0; i <= bubbleCount; i++) {
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
            {title && <span>{title}</span>}
            {subTitle && <span>{subTitle}</span>}
          </Text>
        </Bubble>
      </TextWrap>
    </>
  );
};
