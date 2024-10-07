import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Email from './components/Email';
import NotFound from './components/NotFound';
import TestDB, { ClearDB, GetAll } from '../clients/PouchDBClient';
import RecordItem from './components/DocsShow';
import { NavLink } from 'react-router-dom';
import { Table, TableColumnProps } from 'antd';

export default function App() {
  const [data, setData] = useState<string>("");
  const [showData, setShowData] = useState<any[]>([]);
  async function put(data: any) {
    if (data !== "") {
      await TestDB.post<any>({ data });
      setData("");
    }
  }
  async function getAllData() {
    const all_data = await GetAll();
    setShowData(all_data.rows);
  }
  async function delOne(doc: any) {
    await TestDB.remove(doc);
    const all_data = await GetAll();
    setShowData(all_data.rows);
  }
  const colums: TableColumnProps<any>[] = [
    {
      key: 'ops',
      title: "OPS",
      width: '15%',
      render: (a:any,b:any,c:any) => {
        return <button onClick={()=>{
          console.log(a, b, c);
          delOne(a.doc);
          getAllData();
        }}>delete</button>
      }
    },
    {
      key: 'id',
      dataIndex: [
        "doc",
        "_id"
      ],
      width: '20%',
      title: "ID",
      ellipsis: true,
    },
    {
      key: 'rev',
      dataIndex: [
        "doc",
        "_rev"
      ],
      title: "version",
      width: '20%',
      ellipsis: true,
    },
    {
      key: 'data',
      dataIndex: [
        "doc",
        "data"
      ],
      title: "DATA",
      ellipsis: true,
    },
  ];
  useEffect(()=>{
    getAllData();
  }, []);
  return (
    <>
      <ul>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/email">Email</NavLink></li>
      </ul>
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/email' element={<Email/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <input type='text' value={data} onChange={(e) => {
        setData(e.target.value);
      }}></input>
      <button onClick={() => { put(data) }}>Insert</button>
      <button onClick={() => { getAllData() }}>GetAll</button>
      <button onClick={() => { ClearDB() }}>Clear</button>
      <Table size='small' dataSource={showData} columns={colums}></Table>
      <RecordItem data={showData} delOne={delOne}></RecordItem>
    </>
  )
}
