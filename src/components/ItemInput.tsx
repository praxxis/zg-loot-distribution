import * as React from 'react';
import { useState } from 'react';

interface Props {
  name: string;
  onBlur: (count: number) => void;
}

const ItemInput: React.FC<Props> = ({name, onBlur}) => {
  const [count, setCount] = useState(0);
  return <>
    {name}: <input type="text" onChange={(e) => setCount(Number(e.target.value))} onBlur={(e) => onBlur(Number(e.target.value))} value={count} />
  </>;
};

export default ItemInput;
