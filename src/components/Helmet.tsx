import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

const Helmet: React.FC = () => {
  return (
    <ReactHelmet>
      <title>DropShop - One Stop Shop</title>
      <meta name="description" content="Default description for my app." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </ReactHelmet>
  );
};

export default Helmet;
