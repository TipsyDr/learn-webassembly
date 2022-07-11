import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  FC,
  useContext,
} from 'react';
// import { useGetUserInfo } from '@/api';
import { UserInfo } from '@/types';
// import { Loading, notice } from '@/components';

const LoginContext = createContext<{ userInfo: UserInfo | null }>({
  userInfo: null,
});

interface Props {
  children: ReactNode;
}

export const LoginContextProvider: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const { isLoading, isError, data, error } = useGetUserInfo();

  useEffect(() => {
    setUserInfo({
      userName: 'admin',
    });
  }, []);

  return (
    <LoginContext.Provider value={{ userInfo: userInfo }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
