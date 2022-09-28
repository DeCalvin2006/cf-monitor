import React, { useEffect, useState } from "react"
import Head from 'next/head'
import List from "../../components/cf/List";
import ListItem, { ItemInfo } from "../../components/cf/ListItem";
import { get } from "https";
import { useRouter } from 'next/router'
import { info } from "console";
import { Container } from "react-bootstrap"
let cnt: number = 0;
let userlist: string[] = [];
let lst: number[] = Array<number>(100);

function fetchData (updater: React.Dispatch<React.SetStateAction<ItemInfo[]>>) {
  cnt = (cnt + 1) % userlist.length;
  var user = userlist[cnt];
  get(`https://codeforces.com/api/user.status?handle=${user}&from=1&count=100`, (res) => {
    let buf: string = "";
    if (res.statusCode == 200) {
      res.on("data", (chk: Buffer) => { buf += chk.toString(); });
      res.on("end", () => {
        let data = JSON.parse(buf) as { status: string, result: ItemInfo[] };
        if (data.status == "OK") {
          let infos = data.result;
          // infos.reverse();
          const val: ItemInfo[] = [];
          infos.forEach((ele) => { if (ele.verdict == "OK") val.push(ele) });
          val.map((ele, ind) => { return ele.userName = user; });
          updater(val);
        }
      });

    }
  });

}

export default function Monitor () {

  const router = useRouter();
  const user = router.query["user"] == undefined ? "W_RB" : router.query["user"];


  const [listItemInfo, setListItemInfo] = useState(Array<ItemInfo>);

  if (typeof (user) == "string") {
    userlist = [user];
  }
  else {
    userlist = user;
  }

  fetchData(setListItemInfo);

  useEffect(() => {
    setInterval(() => {
      fetchData(setListItemInfo);
    }, 10000);
  }, [])

  return (

    <Container>

      <Head>
        <title>
          Codeforces Monitor
        </title>
      </Head>

      <List items={listItemInfo}></List>
    </Container >
  )
}