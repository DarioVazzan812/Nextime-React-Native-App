import { createRef } from 'react';

export const navigationRef = createRef(null);

export const navigate = (name, params=null) => {
  navigationRef.current?.navigate(name, params);
}