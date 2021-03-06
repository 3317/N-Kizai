import React, { useState, useEffect } from 'react';

import EquipCard from './EquipCard';

const searchedProducts = [
  {
    id: '5f41ff42f12d5a5ec0f783a7',
    name: 'U2C-BF30BK',
    maker: 'エレコム',
    genre: 'pa',
    devices: [
      { code: 'NP-0014', serialNumber: '', status: 'ready', remarks: '' },
    ],
  },
  {
    id: '5f464ee25410e3231058e73a',
    name: 'T-T02-3650WH/RS',
    maker: 'エレコム',
    genre: 'oa',
    devices: [
      { code: 'NP-0044', serialNumber: '', status: 'ready', remarks: '' },
      { code: 'NP-0048', serialNumber: '', status: 'ready', remarks: '' },
    ],
  },
];

const AddProduct = (props) => {
  const [searchText, setSearchText] = useState('');
  const [devicesList, setDevicesList] = useState([]);

  const [selectedDevices, setSelectedDevice] = useState([]);

  const [selectDeviceCode, setSelectDeviceCode] = useState('');
  const [remarksText, setRemarksText] = useState('');

  useEffect(
    () =>
      setDevicesList(
        searchedProducts
          .map((product) =>
            product.devices.map((device) => ({
              code: device.code,
              name: product.name,
            }))
          )
          .reduce((previous, current) => previous.slice().concat(current))
          .map((device) => ({ code: device.code, name: device.name }))
      ),
    []
  );

  const SearchedDevices = (props) =>
    devicesList.map((device) => (
      <option key={device.code} value={device.code}>
        {device.code} : {device.name}
      </option>
    ));

  const addDevice = (code, remarks) => {
    const device = devicesList.filter((device) => device.code === code)[0];
    if (!device) return;

    const existList = selectedDevices.filter((device) => device.code === code);
    if (existList.length !== 0) {
      alert(`${device.name}(${device.code}) は既に追加済みです。`);
      return;
    }

    setSelectedDevice([
      ...selectedDevices,
      {
        code: device.code,
        name: device.name,
        remarks: remarks,
      },
    ]);
    // setDevicesList(devicesList.filter((device) => device.code !== code));
    setSelectDeviceCode('');
    setRemarksText('');
  };

  const removeDevice = (code) => {
    setSelectedDevice(selectedDevices.filter((device) => device.code !== code));
  };

  const SelectedDevices = (props) =>
    selectedDevices.map((device) => (
      <EquipCard
        key={device.code}
        name={device.name}
        code={device.code}
        remarks={device.remarks}
        removeItem={() => removeDevice(device.code)}
      />
    ));

  return (
    <div>
      <p>
        機材の使用予約を行います
        <br />
        選択中のイベント : マイフェス2020
      </p>
      <div className="container">
        <form>
          <input
            type="text"
            className="nk nk_input"
            placeholder="横断検索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="nk nk_select"
            value={selectDeviceCode}
            onChange={(e) => setSelectDeviceCode(e.target.value)}
          >
            <option value="">機材を選択してください</option>
            <SearchedDevices />
          </select>
          <input
            type="text"
            className="nk nk_input"
            placeholder="特記事項"
            value={remarksText}
            onChange={(e) => setRemarksText(e.target.value)}
          />
          <button
            type="button"
            className="nk nk_button nk_button-info"
            onClick={() => addDevice(selectDeviceCode, remarksText)}
          >
            予約登録
          </button>
        </form>
      </div>
      <div className="container nk_cardContainer">
        <h2>予約済み機材({selectedDevices.length}件)</h2>
        <SelectedDevices />
      </div>
      <button
        type="button"
        className="nk nk_button nk_button-success"
        onClick={() => addDevice(selectDeviceCode, remarksText)}
      >
        予約情報送信
      </button>
    </div>
  );
};

export default AddProduct;
