import { useRouter } from "next/router"
import Link from "next/link"
import { Container } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import List from "../../components/cf/List";
import { ItemInfo } from "../../components/cf/ListItem";
import { get } from "https";
let cnt: number = 0;
let userlist: string[] = [];

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
          const val: ItemInfo[] = [];
          infos.forEach((ele) => { if (ele.verdict == "OK") val.push(ele) });
          val.map((ele, ind) => { return ele.userName = user; });
          updater(val);
        }
      });

    }
  });

}

function Monitor (props: { user: string | string[] }) {
  let user = props.user;
  const [listItemInfo, setListItemInfo] = useState(Array<ItemInfo>);
  if (typeof (user) == "string") {
    userlist = [user];
  }
  else userlist = user;


  fetchData(setListItemInfo);

  useEffect(() => {
    setInterval(() => {
      fetchData(setListItemInfo);
    }, 10000);
  }, [])

  return (

    <Container>

      Codeforces Monitor of {user}

      <List items={listItemInfo}></List>
    </Container >
  )
}
export default function Home () {

  const router = useRouter();
  let user = router.query["user"];
  if (user) {
    return (
      <Monitor user={user} ></Monitor>
    )
  } else {
    return (
      <Container>
        <h2>
          这里是使用说明的喵
        </h2>
        <hr />
        <p>
          在URL后附加要监视的喵
        </p>
        <p>
          例如：linyihdfj的监视器URL为：
          <Link href={`/cf?user=linyihdfj`}>linyihdfj</Link>
        </p>
        <p>
          切换用户的时候可能会卡成上一个人，这时候刷新喵就好
        </p>
      </Container >
    )
  }

}