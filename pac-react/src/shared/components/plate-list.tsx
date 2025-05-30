import React from 'react';
import { List } from '@mui/material';
import { PlateListItem } from './plate-list-item';

import { useGetPlatesQuery } from '@/redux/plate';

export const PlateList: React.FC = () => {
  const { data: items } = useGetPlatesQuery();

  return (
    <List>
      {items &&
        items.length > 0 &&
        items.map((item) => <PlateListItem key={item.id} {...item} />)}
    </List>
  );
};
