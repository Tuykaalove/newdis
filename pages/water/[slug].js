import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useUser } from "lib/hooks";
import prisma from "lib/prisma";

const Slug = (props) => {
  const user = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const { template, entityData, slug } = props;

  const router = useRouter();

  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const [_date, setDate] = useState(today.today);
  const ognoo = new Date(_date).toISOString();
  const [tsag, setTsag] = useState(9);

  useEffect(() => {
    if (slug === "wwtp") {
      setTsag("9");
    }
    router.push(`/water/${slug}?ognoo=${ognoo}&tsag=${tsag}`);
  }, [_date, tsag, slug]);

  const lbg = {};

  for (const _e of entityData) {
    if (lbg[_e.stantsId] === undefined) {
      lbg[_e.stantsId] = {};
    }
    if (lbg[_e.stantsId][_e.colId] === undefined) {
      lbg[_e.stantsId][_e.colId] =
        typeof _e.valueNumber === "number" ? _e.valueNumber : _e.valueText;
    }
  }

  const defaultLbg = (stantsId, colId) => {
    return lbg[stantsId] === undefined
      ? ""
      : lbg[stantsId][colId] === undefined
      ? ""
      : lbg[stantsId][colId];
  };

  const saveToServer = async (data) => {
    await fetch("/api/wwtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data, slug: slug }),
    });
  };

  const save = () => {
    router.reload();
  };

  return (
    <div className="containerSize">
      <TextField
        id="date"
        type="date"
        defaultValue={today.today}
        onChange={(e) => setDate(e.target.value)}
      />

      {slug === "water" ? (
        <Form.Select
          onChange={(e) => setTsag(e.target.value)}
          style={{ width: "100px", marginTop: "10px" }}
        >
          <option value="9">9 цаг</option>
          <option value="16">16 цаг</option>
          <option value="23">23 цаг</option>
          <option value="7">7 цаг</option>
        </Form.Select>
      ) : null}

      <table className="tableSize desk" id="table-to-xls">
        <thead>
          <tr>
            <td
              colSpan={template?.tsevstantscols.length + 3}
              align={"center"}
              style={{ fontSize: 18 }}
            >
              {template?.name}
            </td>
          </tr>
          <tr>
            <td rowSpan={2}>№</td>
            <td rowSpan={2}>Ангилал</td>

            {template?.tsevstantscolsgroup.map((colGroup) => (
              <td key={colGroup.id} colSpan={colGroup.colSpan}>
                {colGroup.name}
              </td>
            ))}
          </tr>
          <tr>
            <td>Нийт тоо</td>
            {template?.tsevstantscols.map((col) => (
              <td key={col.id} style={{ width: `${col.hemjee}px` }}>
                {col.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {template?.tseverlekh.map((tsev) => (
            <React.Fragment key={tsev.id}>
              <tr>
                <td
                  colSpan={template?.tsevstantscols.length + 3}
                  align={"center"}
                >
                  {tsev.name}
                </td>
              </tr>
              {tsev.tsevstants.map((stants, index1) => (
                <tr key={index1}>
                  <td>{index1 + 1}</td>
                  <td>{stants.name}</td>
                  <td>{stants.niit_too === 0 ? "" : stants.niit_too}</td>
                  {template?.tsevstantscols.map((col, index) => (
                    <td key={`input-${index}`}>
                      {col.name === "Нийт тоо" ? (
                        <input
                          style={{ border: "none", width: `100%` }}
                          defaultValue={
                            stants.niit_too1 === 0 ? "" : stants.niit_too1
                          }
                          readOnly
                        />
                      ) : (
                        <input
                          style={{ border: "none", width: `100%` }}
                          defaultValue={
                            defaultLbg(stants.id, col.id) === 0
                              ? ""
                              : defaultLbg(stants.id, col.id)
                          }
                          type={col.type}
                          onBlur={(e) => {
                            saveToServer({
                              type: col.type,
                              value: e.target.value,
                              colId: col.id,
                              tsevId: tsev.id,
                              stantsId: stants.id,
                              tempId: template.id,
                              ognoo: ognoo,
                              tsag: Number(tsag),
                              userId: user.id,
                            });
                          }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
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
    </div>
  );
};
export default Slug;

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const _date = new Date(today.today).toISOString();
  const ognoo = context.query.ognoo || _date;
  const tsag = context.query.tsag;
  const template = await prisma.template.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      tsevstantscolsgroup: {
        select: {
          id: true,
          name: true,
          rowSpan: true,
          colSpan: true,
        },
      },
      tsevstantscols: {
        select: {
          id: true,
          name: true,
          type: true,
          hemjee: true,
        },
      },
      tseverlekh: {
        select: {
          id: true,
          name: true,
          tsevstants: {
            select: {
              id: true,
              name: true,
              niit_too: true,
              niit_too1: true,
            },
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      },
    },
  });

  const entityData = await prisma.entitydata.findMany({
    where: {
      tempId: Number(template?.id) || -1,
      ognoo: ognoo,
      tsag: Number(tsag) || -1,
    },
    select: {
      stantsId: true,
      colId: true,
      valueNumber: true,
      valueText: true,
    },
  });

  return {
    props: { template, entityData, slug },
  };
};
