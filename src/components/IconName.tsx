import {Flex, Heading, Image} from '@chakra-ui/core';
import * as React from 'react';
import {ItemNames} from '../types';

interface Props {
  name: ItemNames;
  className?: string;
}

const icons = {
  bijou: 'https://wow.zamimg.com/images/wow/icons/large/inv_bijou_green.jpg',
  zulian: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_armorkit_11.jpg',
  razzashi: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_10.jpg',
  hakkari: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_09.jpg',
  sandfury: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_15.jpg',
  skullsplitter: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_12.jpg',
  bloodscalp: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_11.jpg',
  gurubashi: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_07.jpg',
  vilebranch: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_13.jpg',
  witherbark: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_14.jpg',
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
