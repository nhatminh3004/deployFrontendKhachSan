import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import styled from "styled-components";
import { GrRadial, GrRadialSelected } from "react-icons/gr";
import { getRoomsOrderRoute } from "../../../utils/APIRoutes";
import RoomDetail from "./RoomDetail";

function Rooms({
  setRoomChoosen,
  roomChoosen,
  setShowRooms,
  showDetail,
  setShowDetail,
  bookingInfo,
}) {
  const [rooms, setRooms] = useState([]);
  const [roomsSelected, setRoomsSelected] = useState([]);
  const [dsTang, setDsTang] = useState([]);
  const [tangSearch, setTangSearch] = useState(undefined);
  const [dsLoaiPhong, setDsLoaiPhong] = useState([]);
  const [loaiPhongSearch, setLoaiPhongSearch] = useState(undefined);

  useEffect(() => {
    loadRoomData();
  }, []);
  useEffect(() => {
    setRoomsSelected([...roomsSelected, ...roomChoosen]);
  }, [roomChoosen]);
  const loadRoomData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    let ngayNhanPhong =
      (bookingInfo.ngayNhanPhong && bookingInfo.ngayNhanPhong.toDate()) ||
      new Date();
    let ngayTraPhong =
      (bookingInfo.ngayTraPhong && bookingInfo.ngayTraPhong.toDate()) ||
      new Date();
    ngayNhanPhong.setHours(0);
    ngayNhanPhong.setMinutes(0);
    ngayNhanPhong.setSeconds(0);
    ngayNhanPhong.setMilliseconds(0);

    ngayTraPhong.setHours(0);
    ngayTraPhong.setMinutes(0);
    ngayTraPhong.setSeconds(0);
    ngayTraPhong.setMilliseconds(0);

    const { data } = await axios.post(
      `${getRoomsOrderRoute}`,
      {
        ngayNhanPhong: ngayNhanPhong,
        ngayTraPhong: ngayTraPhong,
      },
      config
    );
    // console.log(data);
    if (data && data.length && data.length > 0) {
      let dsTangTemp = [];
      let dsLoaiPhongTemp = [];

      for (let i = 0; i < data.length; i++) {
        if (dsLoaiPhongTemp && dsLoaiPhongTemp.length === 0) {
          dsLoaiPhongTemp = [data[i].tenLoaiPhong];
        } else {
          if (!dsLoaiPhongTemp.includes(data[i].tenLoaiPhong)) {
            dsLoaiPhongTemp = [...dsLoaiPhongTemp, data[i].tenLoaiPhong];
          }
        }

        if (dsTangTemp && dsTangTemp.length === 0) {
          dsTangTemp = [data[i].tenTang];
        } else {
          if (!dsTangTemp.includes(data[i].tenTang)) {
            dsTangTemp = [...dsTangTemp, data[i].tenTang];
          }
        }
      }
      setDsTang(dsTangTemp);
      setDsLoaiPhong(dsLoaiPhongTemp);
    }
    setRooms(data);
  };
  const isSelected = (room) => {
    let result = false;
    roomsSelected.map((selected) => {
      if (selected.maPhong === room.maPhong) {
        result = true;
        return true;
      }
    });
    return result;
  };
  const onHandleSelected = (room) => {
    const temp = [...roomsSelected];

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].maPhong === room.maPhong) {
        temp.splice(i, 1);
        setRoomsSelected(temp);
        return;
      }
    }
    setRoomsSelected([...temp, room]);
  };
  const onHandleSelectSearch = (type, e) => {
    if (type === "loaiPhong") {
      if (e.target.value !== "Không chọn") setLoaiPhongSearch(e.target.value);
      else {
        setLoaiPhongSearch(undefined);
      }
    } else {
      if (e.target.value !== "Không chọn") setTangSearch(e.target.value);
      else {
        setTangSearch(undefined);
      }
    }
  };
  // console.log("roomChoosen", roomChoosen);
  // console.log(roomsSelected);
  // console.log(dsTang);
  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="header">
          <h2 className="header-title">Chọn phòng</h2>
          <CloseButton onClick={() => setShowRooms(undefined)} />
        </div>
        <div className="filter-btn">
          <Container fluid>
            <Row>
              {/* <Col>Tìm kiếm: </Col> */}
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tầng"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => onHandleSelectSearch("tang", e)}
                  >
                    <option
                      value={undefined}
                      // key={index}
                      // selected={
                      //   phongMoi.maTang && phongMoi.maTang == tang.maTang
                      // }
                    >
                      Không chọn
                    </option>
                    {dsTang &&
                      dsTang.length !== 0 &&
                      dsTang.map((tang, index) => {
                        return (
                          <option
                            value={`${tang}`}
                            key={index}
                            // selected={
                            //   phongMoi.maTang && phongMoi.maTang == tang.maTang
                            // }
                          >
                            {tang}
                          </option>
                        );
                      })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Loại phòng"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => onHandleSelectSearch("loaiPhong", e)}
                  >
                    <option
                      value={undefined}
                      // key={index}
                      // selected={
                      //   phongMoi.maTang && phongMoi.maTang == tang.maTang
                      // }
                    >
                      Không chọn
                    </option>
                    {dsLoaiPhong &&
                      dsLoaiPhong.length !== 0 &&
                      dsLoaiPhong.map((loaiPhong, index) => {
                        return (
                          <option
                            value={`${loaiPhong}`}
                            key={index}
                            // selected={
                            //   phongMoi.maTang && phongMoi.maTang == tang.maTang
                            // }
                          >
                            {loaiPhong}
                          </option>
                        );
                      })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                {/* <Button
                  variant="success"
                  type="submit"
                  // onClick={() => {
                  //   setRoomChoosen([...roomsSelected]);
                  //   setShowRooms(undefined);
                  // }}
                >
                  Tìm
                </Button> */}
              </Col>
            </Row>
          </Container>
        </div>
        <div className="table-container">
          <Table striped hover>
            <thead>
              <tr>
                <th></th>
                <th>Phòng</th>
                {/* <th>Trạng thái</th> */}
                <th>Loại phòng</th>
                <th>Số giường</th>
                <th>Sức chứa</th>
                <th>Tầng</th>
                <th>Giá (1 ngày)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms !== [] &&
                rooms.map((room, index) => {
                  // console.log(isSelected(room));
                  let booleanTang = true;
                  let booleanLP = true;
                  if (tangSearch && tangSearch !== room.tenTang) {
                    booleanTang = false;
                  }
                  if (
                    loaiPhongSearch &&
                    loaiPhongSearch !== room.tenLoaiPhong
                  ) {
                    booleanLP = false;
                  }

                  if (booleanTang && booleanLP)
                    return (
                      <tr
                        key={index}
                        className={`${isSelected(room) ? "row-selected" : ""}`}
                        s
                        onClick={() => onHandleSelected(room)}
                      >
                        <td>
                          {isSelected(room) ? (
                            <GrRadialSelected />
                          ) : (
                            <GrRadial />
                          )}
                        </td>
                        <td>{room.maPhong}</td>
                        {/* <td
                        className={`${
                          room.trangThaiPhong ? "text-green" : "text-red"
                        }`}
                      >
                        {room.trangThaiPhong ? "Sẵn sàng" : "Không sẵn sàng"}
                      </td> */}
                        <td>{room.tenLoaiPhong}</td>
                        <td>{room.soGiuong}</td>
                        <td>{room.sucChua}</td>
                        <td>{room.tenTang}</td>
                        <td>{room.giaPhong.toLocaleString()}</td>
                        <td
                          style={{ cursor: "pointer", position: "relative" }}
                          onClick={() => setShowDetail(room)}
                        >
                          Xem chi tiết
                        </td>
                      </tr>
                    );
                })}
            </tbody>
          </Table>
        </div>
        <div className="btn-container">
          {roomsSelected.length > 0 ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setRoomChoosen([...roomsSelected]);
                setShowRooms(undefined);
              }}
            >
              Chọn ({roomsSelected.length})
            </Button>
          ) : (
            <Button variant="secondary" type="submit">
              Chọn ({roomsSelected.length})
            </Button>
          )}
        </div>
        {showDetail && (
          <RoomDetail room={showDetail} setShowDetail={setShowDetail} />
        )}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .container-styled {
    width: 75%;
    padding: 0.5rem;
    height: 95%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .header {
      display: flex;
      height: 7%;
      justify-content: space-between;
      .header-title {
      }
    }
    .table-container {
      width: 100%;
      height: 86%;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 1px;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 1px;
          border-radius: 1rem;
        }
      }
      tbody {
        .row-selected {
          td {
            background-color: #9fbce7d1 !important;
          }
        }
      }
    }
    .btn-container {
      display: flex;
      height: 7%;
      justify-content: flex-end;
    }
  }
  .text-red {
    font-weight: bold;
    color: red !important;
  }
  .text-green {
    font-weight: bold;
    color: green !important;
  }
`;
export default Rooms;
