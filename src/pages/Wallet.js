import React, { useState } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

function Wallet() {
  const [desc, setDesc] = useState('');
  return (
    <div>
      <Header />
      <WalletForm
        desc={ desc }
      />
      <Table
        setDesc={ setDesc }
      />
    </div>
  );
}

export default Wallet;
