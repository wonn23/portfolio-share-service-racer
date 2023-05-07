// import { useState, useCallback } from 'react';

// export default (initialValue = null) => {
//   const [value, setValue] = useState(initialValue);
//   const handler = useCallback((e) => {
//     setValue(e.target.value);
//   }, []);
//   return [value, handler];
// };

import { useState } from 'react';

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, handler];
};
