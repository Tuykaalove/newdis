import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useUser } from "lib/hooks";
import prisma from "lib/prisma";

const Design = (props) => {
  const { zagvar, design } = props;
  const user = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const [_date, setDate] = useState(today.today);
  const ognoo = new Date(_date).toISOString();

  const [husnegtData, setHusnegtData] = useState([]);
  const lbg = {};

  for (const _e of husnegtData) {
    if (lbg[_e.murId] === undefined) {
      lbg[_e.murId] = {};
    }
    if (lbg[_e.murId][_e.baganaId] === undefined) {
      lbg[_e.murId][_e.baganaId] = _e.valueText;
    }
  }

  const router = useRouter();
  useEffect(() => {
    (async function fetchMyAPI() {
      const response = await fetch("/api/getTableData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ognoo, zagvar }),
      });
      const data = await response.json();
      setHusnegtData(data);
    })();
    return () => {
      for (var member in lbg) delete lbg[member];
      setHusnegtData([]);
    };
  }, [_date, design]);

  const saveToServer = async (data) => {
    await fetch("/api/tableData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const save = () => {
    router.reload();
  };

  return (
    <div className="containerSize">
      <Row>
        <Col>
          <TextField
            id="date"
            type="date"
            defaultValue={today.today}
            onChange={(e) => setDate(e.target.value)}
          />
          <h5 style={{ textAlign: "center" }}>{zagvar?.name}</h5>
          <table className="tableSize">
            <thead
              style={{
                border: "1px black solid",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <tr>
                <td>№</td>
                {zagvar?.bagana.map((bagana, index) => (
                  <td
                    align="center"
                    key={index}
                    style={{
                      width: `${bagana.hemjee}px`,
                    }}
                  >
                    {bagana.name}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody style={{ border: "1px black solid" }}>
              {zagvar?.mur.map((mur, index) => (
                <tr key={index}>
                  <td scope="row" style={{ textAlign: "center" }}>
                    {mur.name}
                  </td>
                  {zagvar?.bagana.map((bagana, index1) => (
                    <td key={index1} align="right">
                      <TextField
                        multiline={true}
                        type="text"
                        fullWidth
                        inputProps={{
                          min: 0,
                          style: { textAlign: "center" },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        onBlur={(e) => {
                          saveToServer({
                            value: e.target.value,
                            baganaId: bagana.id,
                            murId: mur.id,
                            zagvarId: zagvar.id,
                            ognoo: ognoo,
                            userId: user.id,
                            design: design,
                          });
                        }}
                        defaultValue={
                          lbg[mur.id] === undefined
                            ? ""
                            : lbg[mur.id][bagana.id] === undefined
                            ? ""
                            : lbg[mur.id][bagana.id]
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            onClick={save}
            variant="info"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
          >
            Хадгалах
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default Design;

export const getServerSideProps = async (context) => {
  const { design } = context.params;
  const zagvar = await prisma.zagvar.findUnique({
    where: {
      design,
    },
    select: {
      id: true,
      name: true,
      bagana: {
        select: {
          id: true,
          name: true,
          hemjee: true,
        },
      },
      mur: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    props: { zagvar, design },
  };
};
