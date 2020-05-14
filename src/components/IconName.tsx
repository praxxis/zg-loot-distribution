import {Flex, Heading, Image} from '@chakra-ui/core';
import * as React from 'react';
import bijou from '../images/icons/bijou.webp';
import bloodscalp from '../images/icons/bloodscalp.webp';
import gurubashi from '../images/icons/gurubashi.webp';
import hakkari from '../images/icons/hakkari.webp';
import razzashi from '../images/icons/razzashi.webp';
import sandfury from '../images/icons/sandfury.webp';
import skullsplitter from '../images/icons/skullsplitter.webp';
import vilebranch from '../images/icons/vilebranch.webp';
import witherbark from '../images/icons/witherbark.webp';
import zulian from '../images/icons/zulian.webp';
import {ItemNames} from '../types';

interface Props {
  name: ItemNames;
  className?: string;
}

const icons = {
  bijou,
  zulian,
  razzashi,
  hakkari,
  sandfury,
  skullsplitter,
  bloodscalp,
  gurubashi,
  vilebranch,
  witherbark,
};

const IconName: React.FC<Props> = ({name, className}) => {
  return (
    <Flex className={className} alignItems="center">
      <Image size="20px" src={icons[name]} mr="1" />
      <Heading size="xs">{name}</Heading>
    </Flex>
  );
};

export default IconName;
