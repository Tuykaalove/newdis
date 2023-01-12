import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import {
  Col,
  Badge,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "lib/hooks";

const DayNews = () => {
  const user = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);

  //Year and Month Search
  const [startDate, setStartDate] = useState(new Date());
  const year = startDate.getFullYear();
  const month = startDate.getMonth();

  let sMonth = month + 1;
  let eMonth;
  if (month < 11) {
    eMonth = month + 2;
  }

  let formatSMonth;
  let formatEMonth;

  if (sMonth < 10) {
    formatSMonth = "0" + sMonth;
  }

  if (eMonth < 10) {
    formatEMonth = "0" + eMonth;
  }

  const startD =
    "" +
    year +
    "-" +
    (sMonth < 10 ? formatSMonth : sMonth) +
    "-" +
    "01T00:00:00.00Z";

  let endD;
  if (month !== 11) {
    endD =
      "" +
      year +
      "-" +
      (eMonth < 10 ? formatEMonth : eMonth) +
      "-" +
      "01T00:00:00.00Z";
  } else {
    endD = "" + year + "-" + "12" + "-" + "31T00:00:00.00Z";
  }
  //Year and Month search End

  const [data, setData] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      (async function () {
        await fetch(`/api/news/${user?.id}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startD, endD, month }),
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
          });
      })();
    }
    return () => {
      setData([]);
    };
  }, [modalShow, updateModalShow, user, startDate]);

  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const ognoo = new Date(today.today).toISOString();

  const [update, setUpdate] = useState([]);

  return (
    <div className="containerSize">
      <Row>
        <Col>
          <DatePicker
            selected={startDate}
            onChange={(e) => setStartDate(e)}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            showFullMonthYearPicker
            showFourColumnMonthYearPicker
          />
        </Col>

        <Col md="auto">
          <Button variant="info" onClick={() => setModalShow(true)}>
            Мэдээ нэмэх
          </Button>
        </Col>
      </Row>

      <CreateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
      />

      <UpdateModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        user={user}
        news={update}
      />

      {data.map((news, index) => (
        <React.Fragment key={index}>
          <Typography
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            <Badge pill bg="info">
              {news.ognoo.substr(0, 10)}
            </Badge>
          </Typography>
          <TextField
            multiline={true}
            fullWidth
            inputProps={{ readOnly: true }}
            InputProps={{
              disableUnderline: true,
            }}
            variant="standard"
            defaultValue={news.news}
          />

          {news.ognoo === ognoo ||
          user.name === "hut" ||
          user.name === "tsba" ? (
            <Button
              onClick={() => (setUpdate(news), setUpdateModalShow(true))}
              variant="info"
              style={{ display: "flex", margin: "auto" }}
            >
              Засах
            </Button>
          ) : null}

          <hr className="hrStyle" />
        </React.Fragment>
      ))}
    </div>
  );
};
export default DayNews;

function CreateModal(props) {
  const today = {
    today: new Date().toISOString().substring(0, 10),
  };
  const [ognoo, setOgnoo] = useState(today.today);
  const _date = new Date(ognoo).toISOString();

  const [news, setNews] = useState("");
  const userId = props.user?.id;

  const saveToServer = async () => {
    await fetch("/api/news/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _date, news, userId }),
    });
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <TextField
            id="date"
            type="date"
            defaultValue={today.today}
            onChange={(e) => setOgnoo(e.target.value)}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Ажлын мэдээ">
          <Form.Control
            as="textarea"
            aria-multiline
            placeholder="Leave a comment here"
            style={{ height: "500px" }}
            onChange={(e) => setNews(e.target.value)}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Хаах</Button>
        <Button onClick={saveToServer}>Хадгалах</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UpdateModal(props) {
  const _date = props.news.ognoo;
  const medee = props.news.news;
  const ognoo = props.news.ognoo?.substr(0, 10);

  const [news, setNews] = useState("");
  const userId = props.user?.id;

  const saveToServer = async () => {
    await fetch("/api/news/news", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _date, news, userId }),
    }).then(() => props.onHide());
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <TextField id="date" type="date" defaultValue={ognoo} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Ажлын мэдээ">
          <Form.Control
            as="textarea"
            aria-multiline
            placeholder="Leave a comment here"
            style={{ height: "500px" }}
            defaultValue={medee}
            onChange={(e) => setNews(e.target.value)}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Хаах</Button>
        <Button onClick={saveToServer}>Хадгалах</Button>
      </Modal.Footer>
    </Modal>
  );
}
