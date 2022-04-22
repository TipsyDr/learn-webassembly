import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '../Icon';

interface Props {
  title?: string;
  titleStyle?: {};
  style?: {};
}

const GoBack: FC<Props> = props => {
  const { title, style, titleStyle } = props;
  const navigate = useNavigate();
  const handleGoBack = function () {
    navigate(-1);
  };

  return (
    <span
      style={{
        padding: '10px 20px 20px 0',
        cursor: 'pointer',
        display: 'inline-block',
        ...style,
      }}
      onClick={handleGoBack}
    >
      <CustomIcon type="goback" />
      <span style={titleStyle}>{title}</span>
    </span>
  );
};

export default GoBack;
