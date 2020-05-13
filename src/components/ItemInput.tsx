import {Input} from '@chakra-ui/core';
import styled from '@emotion/styled';
import * as React from 'react';
import {useState} from 'react';
import {ItemNames} from '../types';
import IconName from './IconName';

interface Props {
  name: ItemNames;
  value: number;
  onCountChange: (count: number) => void;
}

const Item = styled(IconName)`
  text-transform: uppercase;
`;

const ItemInput: React.FC<Props> = ({name, value, onCountChange}) => {
  const [count, setCount] = useState(value);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue !== value) {
      onCountChange(newValue);
    }
  };

  return (
    <>
      <Item name={name} />
      <Input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
        onBlur={onBlur}
        value={count}
      />
    </>
  );
};

export default ItemInput;
