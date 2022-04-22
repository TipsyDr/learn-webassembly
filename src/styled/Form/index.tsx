import styled from 'styled-components';
import { Form, Button } from 'antd';

export const FormWrapper = styled(Form)`
  margin-top: -10px;
`;
export const FormItem = styled(Form.Item)`
  margin-top: 10px;
`;
export const FormButton = styled(Button)`
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;

  span {
    vertical-align: middle;
    line-height: 1;
  }
`;
