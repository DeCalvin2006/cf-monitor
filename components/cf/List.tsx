import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react"
import ListItem, { ItemInfo } from "./ListItem"
export default function List (props: { items: ItemInfo[] }) {
  const items = props.items;
  const [tableStr, setTable] = useState(Array<JSX.Element>);
  useEffect(() => { setTable(items.map((element, index) => { return (<ListItem key={index} item={element} />); })) }, [items]);
  return (<Table striped bordered hover>
    <thead>
      <tr>
        <th>User Name</th>
        <th>Problem ID</th>
        <th>Problem Name</th>
        <th>Rating</th>
        <th>Tags</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {tableStr}
    </tbody>
  </Table>);
}