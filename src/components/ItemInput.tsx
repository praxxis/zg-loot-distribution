import {Input} from '@chakra-ui/core';
import * as React from 'react';
import {useState} from 'react';

interface Props {
  name: string;
  value: number;
  onBlur: (count: number) => void;
}

const ItemInput: React.FC<Props> = ({name, value, onBlur}) => {
  const [count, setCount] = useState(value);
  return (
    <>
      {name}:
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
