import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '../Icon';

interface Props {
  title?: string;
  titleStyle?: any;
  style?: any;
  url?: string;
}

const GoBack: FC<Props> = props => {
  const { title, style, titleStyle, url } = props;
  const navigate = useNavigate();
  const handleGoBack = function () {
    url ? (window.location.href = url) : navigate(-1);
  };

  return (
    <span
      style={{
        paddingRight: '20px',
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
