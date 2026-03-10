import * as React from 'react';
import {cn} from '../lib/utils';
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
    <div className={cn("flex items-center", className)}>
      <img src={icons[name]} alt={name} className="w-5 h-5 mr-1" />
      <span className="text-xs font-semibold">{name}</span>
    </div>
  );
};

export default IconName;
