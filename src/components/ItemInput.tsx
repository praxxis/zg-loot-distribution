import {Input} from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import {useState} from 'react';
import {ItemNames} from '../types';
import IconName from './IconName';

interface Props {
  name: ItemNames;
  value: number;
  onBlur: (count: number) => void;
}

const Item = styled(IconName)`
  text-transform: uppercase;
`;

const ItemInput: React.FC<Props> = ({name, value, onBlur}) => {
  const [count, setCount] = useState(value);
  return (
    <>
      <Item name={name} />
      <Input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => onBlur(Number(e.target.value))}
        value={count}
      />
    </>
  );
};

export default ItemInput;
