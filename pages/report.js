import { TextField, Typography } from "@mui/material";
import { useUser } from "lib/hooks";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import prisma from "lib/prisma";
import { useRouter } from "next/router";

const Report = (props) => {
  useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const {
    ajilHudag,
    beltgelHudag,
    zasvarHudag,
    stantsData,
    waterData,
    wwtpData,
    jijigStantsWater,
    jijigStantsWwtp,
    test,
  } = props;

  const [medee, setMedee] = useState([]);

  const arr = ["", "", "", "", "", "", "", ""];

  let ajilHudagSum = 0;
  for (const _e of ajilHudag) {
    ajilHudagSum = _e.valueNumber + ajilHudagSum;
  }

  let beltgelHudagSum = 0;
  for (const _e of beltgelHudag) {
    beltgelHudagSum = _e.valueNumber + beltgelHudagSum;
  }

  let zasvarHudagSum = 0;
  for (const _e of zasvarHudag) {
    zasvarHudagSum = _e.valueNumber + zasvarHudagSum;
  }

  let stantsSum = 0;
  for (const _e of stantsData) {
    stantsSum = _e.valueNumber + stantsSum;
  }

  let sum = 0;
  for (const _e of wwtpData) {
    _e.id !== 6 && _e.id !== 12 ? (sum = sum + _e.Niilber) : (sum = sum + 0);
  }

  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const [_date, setDate] = useState(today.today);
  const ognoo = new Date(_date).toISOString();

  const router = useRouter();

  useEffect(() => {
    (async function fetchMyAPI() {
      const response = await fetch("/api/medee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ognoo }),
      });
      const data = await response.json();
      setMedee(data);
      router.push(`/report?ognoo=${ognoo}`);
    })();
    return () => {
      setMedee([]);
    };
  }, [_date]);

  return (
    <div className="containerSize">
      <TextField
        id="date"
        type="date"
        defaultValue={today.today}
        onChange={(e) => setDate(e.target.value)}
      />
      <hr className="hrStyle" />
      <h5
        style={{
          textAlign: "center",
        }}
      >
        <Badge bg="info">Ус хангамж</Badge>
      </h5>
      <table className="tableSize headerDesk">
        <thead>
          <tr>
            <td>Ангилал</td>
            <td style={{ width: 100 }}>Төв</td>
            <td style={{ width: 100 }}>Үйлдвэр</td>
            <td style={{ width: 100 }}>Мах</td>
            <td style={{ width: 100 }}>ДЭҮ</td>
            <td style={{ width: 100 }}>Гачуурт</td>
            <td style={{ width: 100 }}>Яармаг</td>
            <td style={{ width: 100 }}>Буянт-Ухаа</td>
            <td style={{ width: 100 }}>Нисэх-гэр хороолол</td>
            <td style={{ width: 100 }}>Нийт</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>Нийт худгийн тоо</td>
            <td>88</td>
            <td>16</td>
            <td>11</td>
            <td>55</td>
            <td>21</td>
            <td>2</td>
            <td>20</td>
            <td>5</td>
            <td style={{ fontWeight: "bold" }}>218</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Ажиллаж буй худгийн тоо</td>
            {arr?.map((e, index) => (
              <td key={index} style={{ color: "green" }}>
                {ajilHudag?.map((e) =>
                  e.id === index + 1 && e.valueNumber !== 0
                    ? e.valueNumber
                    : null
                )}
              </td>
            ))}
            <td style={{ color: "green", fontWeight: "bold" }}>
              {ajilHudagSum}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Бэлтгэлд худгийн тоо</td>
            {arr?.map((e, index) => (
              <td key={index} style={{ color: "blue" }}>
                {beltgelHudag?.map((e) =>
                  e.id === index + 1 && e.valueNumber !== 0
                    ? e.valueNumber
                    : null
                )}
              </td>
            ))}
            <td style={{ color: "blue", fontWeight: "bold" }}>
              {beltgelHudagSum}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Засварт худгийн тоо</td>
            {arr?.map((e, index) => (
              <td key={index} style={{ color: "red" }}>
                {zasvarHudag?.map((e) =>
                  e.id === index + 1 && e.valueNumber !== 0
                    ? e.valueNumber
                    : null
                )}
              </td>
            ))}
            <td style={{ color: "red", fontWeight: "bold" }}>
              {zasvarHudagSum}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Шахсан ус (м3/х)</td>
            {arr?.map((e, index) => (
              <td key={index}>
                {stantsData?.map((e) =>
                  e.id === index + 1 && e.valueNumber !== 0
                    ? e.valueNumber
                    : null
                )}
              </td>
            ))}
            <td style={{ fontWeight: "bold" }}>{stantsSum}</td>
          </tr>
        </tbody>
      </table>
      <h5
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <Badge bg="info">Нийт шахсан ус (м3/х)</Badge>
      </h5>
      <table className="tableSize headerDesk">
        <thead>
          <tr>
            {waterData?.map((e, index) => (
              <td key={index} style={{ width: 150 }}>
                {e.name}
              </td>
            ))}
            {jijigStantsWater?.map((e, index2) => (
              <td key={index2} style={{ width: 150 }}>
                {e.Stants}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {waterData?.map((e, index1) => (
              <td key={index1}>{e.Niilber}</td>
            ))}
            {jijigStantsWater?.map((e, index3) => (
              <td key={index3} style={{ width: 150 }}>
                {e.valueNumber}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h5
        style={{
          textAlign: "center",
        }}
      >
        <hr className="hrStyle" />

        <Badge bg="info">Цэвэрлэх байгууламж /нийт цэвэрлэсэн ус (м3)/</Badge>
      </h5>
      <table className="tableSize headerDesk">
        <thead>
          <tr>
            {wwtpData?.map((e, index) => (
              <td key={index} style={{ width: 150 }}>
                {e.name}
              </td>
            ))}
            {jijigStantsWwtp?.map((e, index2) => (
              <td key={index2} style={{ width: 150 }}>
                {e.Stants}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {wwtpData?.map((e, index1) => (
              <td key={index1}>{e.Niilber}</td>
            ))}
            {jijigStantsWwtp?.map((e, index3) => (
              <td key={index3}>{e.valueNumber}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* <Typography
        style={{ textAlign: "center", marginTop: 5, fontWeight: "bold" }}
        >
        Цэвэрлэх байгууламжийн албаны нийт цэвэрлэсэн ус: {sum}
      </Typography> */}
      <hr className="hrStyle" />
      <h5
        style={{
          textAlign: "center",
        }}
      >
        <Badge bg="info">Ажлын мэдээ</Badge>
      </h5>
      {medee?.map((news, index) => (
        <React.Fragment key={index}>
          <Typography
            variant="h6"
            component="h2"
            style={{ marginLeft: 50, textDecoration: "underline" }}
          >
            <Badge pill bg="info">
              {news.entityuser.nickName}
            </Badge>
          </Typography>
          <TextField
            multiline={true}
            fullWidth
            inputProps={{ readOnly: true }}
            variant="standard"
            defaultValue={news.news}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Report;

export async function getServerSideProps(context) {
  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const _date = new Date(today.today).toISOString();
  const ognoo = context.query.ognoo || _date;

  //Ажиллаж буй худгийн тоо
  const ajilHudag =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                        from template T 
                        inner join tseverlekh Ts ON T.id=Ts.tempId 
                        inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=1
                        inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=1
                        where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                        GROUP BY St.name,St.id,Ed.valueNumber
                        ORDER BY St.id asc
                        `;
  //Бэлтгэлд худгийн тоо
  const beltgelHudag =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                        from template T 
                        inner join tseverlekh Ts ON T.id=Ts.tempId 
                        inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=1
                        inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=2
                        where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                        GROUP BY St.name,St.id,Ed.valueNumber
                        ORDER BY St.id asc
                        `;
  //Засварт худгийн тоо
  const zasvarHudag =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                        from template T 
                        inner join tseverlekh Ts ON T.id=Ts.tempId 
                        inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=1
                        inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=3
                        where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                        GROUP BY St.name,St.id,Ed.valueNumber
                        ORDER BY St.id asc
                        `;
  //Эх үүсвэрүүдийн өгөгдөл
  const stantsData =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                            from template T 
                            inner join tseverlekh Ts ON T.id=Ts.tempId 
                            inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=1
                            inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=15
                            where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                            GROUP BY St.name,St.id,Ed.valueNumber
                            ORDER BY St.id asc
                            `;
  //Ус хангамжын тайлан
  const waterData =
    await prisma.$queryRaw` select Ed.tempId,Ts.id,Ts.name,SUM(Ed.valueNumber) Niilber 
                                      from template T 
                                      inner join tseverlekh Ts ON T.id=Ts.tempId 
                                      inner join entitydata Ed ON T.id=Ed.tempId AND Ed.tsevId=Ts.id AND Ed.colId=15 AND Ed.tsevId!=3
                                      where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                                      GROUP BY Ed.tempId,Ts.id,Ts.name
                                      ORDER BY Ts.id asc
                            `;
  //Цэвэрлэх тайлан
  const wwtpData =
    await prisma.$queryRaw` select Ed.tempId,Ts.id,Ts.name,SUM(Ed.valueNumber) Niilber 
                        from template T 
                        inner join tseverlekh Ts ON T.id=Ts.tempId 
                        inner join entitydata Ed ON T.id=Ed.tempId AND Ed.tsevId=Ts.id AND Ed.colId=23 AND Ed.tsevId!=12
                        where T.slug="wwtp" AND ognoo=${ognoo}
                        GROUP BY Ed.tempId,Ts.id,Ts.name
                        ORDER BY Ts.id asc
                        `;
  //TEST
  const test =
    await prisma.$queryRaw` select Ts.id,Ts.name,St.name as StantsName,Ed.valueNumber
                      from template T 
                      inner join tseverlekh Ts ON T.id=Ts.tempId 
                      inner join tsevstants St ON Ts.id=St.tsevID
                      inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=21 AND Ed.tsevId!=12
                      where T.slug="wwtp" AND ognoo=${ognoo}
  `;
  //Жижиг станц ус хангамж
  const jijigStantsWater =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                            from template T 
                            inner join tseverlekh Ts ON T.id=Ts.tempId 
                            inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=3
                            inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=15
                            where T.slug="water" AND ognoo=${ognoo} AND tsag=7
                            GROUP BY St.name,St.id,Ed.valueNumber
                            ORDER BY St.id asc
                            `;
  //Жижиг станц цэвэрлэх байгууламж
  const jijigStantsWwtp =
    await prisma.$queryRaw` select St.name as Stants,St.id,Ed.valueNumber
                            from template T 
                            inner join tseverlekh Ts ON T.id=Ts.tempId 
                            inner join tsevstants St ON Ts.id=St.tsevId AND St.tsevId=12
                            inner join entitydata Ed ON T.id=Ed.tempId AND Ed.stantsId=St.id AND Ed.colId=23
                            where T.slug="wwtp" AND ognoo=${ognoo}
                            GROUP BY St.name,St.id,Ed.valueNumber
                            ORDER BY St.id asc
                            `;
  return {
    props: {
      ajilHudag,
      beltgelHudag,
      zasvarHudag,
      stantsData,
      waterData,
      wwtpData,
      jijigStantsWater,
      jijigStantsWwtp,
      test,
    },
  };
}
