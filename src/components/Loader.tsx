import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
interface ILoadingSpinnderProps {
  color: string;
};
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div<ILoadingSpinnderProps>`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::after {
    content: '';
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid ${({ color }) => color};
    width: 50px;
    height: 50px;
    animation: ${spin} 0.5s linear infinite;
  }
`;
const Loader: FC<ILoadingSpinnderProps> = ({ color }) => (<LoadingSpinner color={color} />);
export default Loader;