import moment from "moment";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

function FrmXacNhanHoaDonMOMO({
  setShowConfirmBill_MOMO,
  hoaDonSelected,
  totalPrice,
  totalHour,
  totalDate,
  totalRoomServicePrice,
  totalRoomPrice,
  totalServicePrice,
  isPrint,
  onHandleCheckInMOMO,
  setIsPrint,
  setHoaDonSelected,
  onHandleCancelPrint,
  formatDate,
  formatOnlyDate,
}) {
  // console.log(hoaDonSelected);
  const [nhanVien, setNhanVien] = useState();
  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef();
  useEffect(() => {
    const nhanVienTemp = JSON.parse(localStorage.getItem("nhanVien"));
    setNhanVien(nhanVienTemp);
  }, []);
  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="booking-detail">
          <div className="content-detail">
            <div
              className="bill-title"
              style={{
                display: "flex",
                gap: "0.1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="img-container">
                <img
                  className="logo-img"
                  src="/logo1.png"
                  alt="logo"
                  style={{
                    width: "100px",
                    backgroundColor: "white",
                    borderRadius: "150px",
                  }}
                />
              </div>
              <p
                className="title"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: 0,
                }}
              >
                Khách Sạn Sama
              </p>
            </div>
            <div className="bill-header">
              <h3>Hóa đơn</h3>
            </div>
            <div className="bill-info">
              - Mà hóa đơn: {hoaDonSelected && hoaDonSelected.maHoaDon}
              <br></br>- Ngày đặt phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date(hoaDonSelected.phieuDatPhong.ngayDatPhong))}
              <br></br>- Ngày nhận phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatOnlyDate(new Date(hoaDonSelected.ngayNhanPhong))}
              <br></br>- Ngày trả phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date())}
              <br></br> - Thu ngân:{" "}
              {nhanVien && `${nhanVien.hoTen} - ${nhanVien.maNhanVien}`}
              <br></br>
            </div>
            <div className="guest-info">
              <h4>Thông tin khách hàng</h4>
              <div className="info-content">
                - Họ tên:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.hoTen}
                <br></br>- CCCD:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.cccdKhachHang}
                <br></br>- Số điện thoại:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.soDienThoaiKH}
                <br></br>- Email:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.emailKH}
                <br></br>- Địa chỉ:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.diaChiKH}
                <br></br>
              </div>
            </div>
            <div className="room-info">
              <div className="info-content">
                <h4>Chi tiết hóa đơn</h4>
                <div className="phong-container">
                  <Table bordered={true}>
                    <thead>
                      <tr>
                        <th>Phòng</th>
                        <th>Loại</th>
                        <th>Giá (1 ngày)</th>
                        <th>Số ngày</th>
                        <th>T tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoaDonSelected &&
                      hoaDonSelected.dsPhong &&
                      hoaDonSelected.dsPhong.length > 0 ? (
                        hoaDonSelected.dsPhong.map((room, index) => {
                          // console.log(isSelected(room));
                          return (
                            <tr key={index}>
                              <td>{room.maPhong}</td>
                              <td>{room.tenLoaiPhong}</td>
                              <td>{room.giaPhong.toLocaleString()}</td>
                              <td>{totalDate}</td>
                              <td>
                                {(totalDate * room.giaPhong).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={4}
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Tổng thành tiền
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {totalRoomPrice.toLocaleString()} VND
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <i>
                    Ghi chú: Thời gian trả phòng: <b>trước 11h59</b>
                    <br></br>- Khách trả phòng từ 12h00 đến 15h59: Tính mức phụ
                    thu bằng 30% giá phòng 1 ngày.
                    <br></br>- Khách trả phòng từ 16h00 đến 18h59: Tính mức phụ
                    thu bằng 50% giá phòng 1 ngày.
                    <br></br>- Khách trả phòng sau 19h00: Tính mức phụ thu bằng
                    100% giá phòng 1 ngày.
                    <br></br>- Khách nhận và trả phòng trong cùng ngày sẽ tính
                    là 1 ngày bất kể giờ trả
                  </i>
                </div>
                <h4>Chi tiết dịch vụ</h4>
                <div className="phong-container">
                  <Table bordered={true}>
                    <thead>
                      <tr>
                        <th>Phòng</th>
                        <th>Tên</th>
                        <th>Đơn vị</th>
                        <th>Giá</th>
                        <th>SL</th>
                        <th>T tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoaDonSelected &&
                      hoaDonSelected.dsChiTietDichVuDto &&
                      hoaDonSelected.dsChiTietDichVuDto.length > 0 ? (
                        hoaDonSelected.dsChiTietDichVuDto.map(
                          (dichVu, index) => {
                            // console.log(isSelected(room));
                            if (
                              index === 0 ||
                              (index !== 0 &&
                                dichVu.maPhong ===
                                  hoaDonSelected.dsChiTietDichVuDto[index - 1]
                                    .maPhong)
                            ) {
                              if (
                                index ===
                                hoaDonSelected.dsChiTietDichVuDto.length - 1
                              ) {
                                return (
                                  <>
                                    <tr key={index}>
                                      <td>{dichVu.maPhong}</td>
                                      <td>{dichVu.tenDichVu}</td>
                                      <td>{dichVu.tenLoaiDichVu}</td>
                                      <td>
                                        {dichVu.giaDichVu.toLocaleString()}
                                      </td>
                                      <td>{dichVu.soLuong}</td>
                                      <td>
                                        {(
                                          dichVu.giaDichVu * dichVu.soLuong
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                    {totalRoomServicePrice.map((roomPrice) => {
                                      if (roomPrice.maPhong === dichVu.maPhong)
                                        return (
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                              }}
                                            >
                                              Tổng tiền phòng{" "}
                                              {roomPrice.maPhong}
                                            </td>
                                            <td>
                                              {roomPrice.tongTien.toLocaleString()}
                                            </td>
                                          </tr>
                                        );
                                    })}
                                  </>
                                );
                              }
                              return (
                                <tr key={index}>
                                  <td>{dichVu.maPhong}</td>
                                  <td>{dichVu.tenDichVu}</td>
                                  <td>{dichVu.tenLoaiDichVu}</td>
                                  <td>{dichVu.giaDichVu.toLocaleString()}</td>
                                  <td>{dichVu.soLuong}</td>
                                  <td>
                                    {(
                                      dichVu.giaDichVu * dichVu.soLuong
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            } else {
                              if (
                                index ===
                                hoaDonSelected.dsChiTietDichVuDto.length - 1
                              ) {
                                return (
                                  <>
                                    {totalRoomServicePrice.map((roomPrice) => {
                                      if (
                                        roomPrice.maPhong ===
                                        hoaDonSelected.dsChiTietDichVuDto[
                                          index - 1
                                        ].maPhong
                                      )
                                        return (
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                              }}
                                            >
                                              Tổng tiền phòng{" "}
                                              {roomPrice.maPhong}
                                            </td>
                                            <td>
                                              {roomPrice.tongTien.toLocaleString()}
                                            </td>
                                          </tr>
                                        );
                                    })}
                                    <tr key={index}>
                                      <td>{dichVu.maPhong}</td>
                                      <td>{dichVu.tenDichVu}</td>
                                      <td>{dichVu.tenLoaiDichVu}</td>
                                      <td>
                                        {dichVu.giaDichVu.toLocaleString()}
                                      </td>
                                      <td>{dichVu.soLuong}</td>
                                      <td>
                                        {(
                                          dichVu.giaDichVu * dichVu.soLuong
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                    {totalRoomServicePrice.map(
                                      (roomPrice, index) => {
                                        if (
                                          roomPrice.maPhong === dichVu.maPhong
                                        )
                                          return (
                                            <tr>
                                              <td
                                                colSpan={5}
                                                style={{
                                                  fontWeight: "bold",
                                                  textAlign: "center",
                                                }}
                                              >
                                                Tổng tiền phòng{" "}
                                                {roomPrice.maPhong}
                                              </td>
                                              <td>
                                                {roomPrice.tongTien.toLocaleString()}
                                              </td>
                                            </tr>
                                          );
                                      }
                                    )}
                                  </>
                                );
                              }
                              return (
                                <>
                                  {totalRoomServicePrice.map((roomPrice) => {
                                    if (
                                      roomPrice.maPhong ===
                                      hoaDonSelected.dsChiTietDichVuDto[
                                        index - 1
                                      ].maPhong
                                    )
                                      return (
                                        <tr>
                                          <td
                                            colSpan={5}
                                            style={{
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                          >
                                            Tổng tiền phòng {roomPrice.maPhong}
                                          </td>
                                          <td>
                                            {roomPrice.tongTien.toLocaleString()}
                                          </td>
                                        </tr>
                                      );
                                  })}
                                  <tr key={index}>
                                    <td>{dichVu.maPhong}</td>
                                    <td>{dichVu.tenDichVu}</td>
                                    <td>{dichVu.tenLoaiDichVu}</td>
                                    <td>{dichVu.giaDichVu.toLocaleString()}</td>
                                    <td>{dichVu.soLuong}</td>
                                    <td>
                                      {(
                                        dichVu.giaDichVu * dichVu.soLuong
                                      ).toLocaleString()}
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          }
                        )
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center" }}>
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={5}
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Tổng thành tiền
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {totalServicePrice.toLocaleString()} VND
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tổng tiền</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {totalPrice && totalPrice.toLocaleString()} VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tiền nhận</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {totalPrice && totalPrice.toLocaleString()}
                    VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tiền thừa</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {totalPrice && (totalPrice - totalPrice).toLocaleString()}
                    {/* {hoaDonSelected.tienNhan - totalPrice < 0
                        ? 0
                        : (
                            hoaDonSelected.tienNhan - totalPrice
                          ).toLocaleString()}{" "} */}{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isPrint ? (
          <div className="btn-container">
            <Button
              variant="success"
              type="submit"
              onClick={onHandleCheckInMOMO}
            >
              Xác nhận
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={() => {
                setShowConfirmBill_MOMO(false);
                setIsPrint(false);
              }}
            >
              Hủy
            </Button>
          </div>
        ) : (
          <div className="btn-container">
            <ReactToPrint
              trigger={() => (
                <Button variant="primary" onClick={() => handlePrint()}>
                  In hóa đơn
                </Button>
              )}
              content={() => componentRef.current}
            />
            <Button
              variant="danger"
              type="submit"
              onClick={onHandleCancelPrint}
            >
              Hủy
            </Button>
          </div>
        )}
      </div>
      <div
        className="dis-non"
        style={{
          width: "100vw",
          padding: "0.5rem",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          backgroundColor: "#fff",
          position: "relative",
          zIndex: 1,
          top: 0,
          right: 0,
        }}
      >
        <div
          ref={componentRef}
          style={{ display: "flex", flexDirection: "column", height: "95%" }}
        >
          <div
            style={{
              overflowY: "visible",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.1rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <img
                  className="logo-img"
                  src="/logo1.png"
                  alt="logo"
                  style={{
                    width: "200px",
                    backgroundColor: "white",
                    borderRadius: "150px",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  marginBottom: 0,
                }}
              >
                Khách Sạn Sama
              </p>
            </div>
            <div>
              <h2>Hóa đơn</h2>
            </div>
            <div style={{ fontSize: "1.5rem" }}>
              - Mà hóa đơn: {hoaDonSelected && hoaDonSelected.maHoaDon}
              <br></br>- Ngày đặt phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date(hoaDonSelected.phieuDatPhong.ngayDatPhong))}
              <br></br>- Ngày nhận phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatOnlyDate(new Date(hoaDonSelected.ngayNhanPhong))}
              <br></br>- Ngày trả phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date())}
              <br></br> - Thu ngân:{" "}
              {nhanVien && `${nhanVien.hoTen} - ${nhanVien.maNhanVien}`}
              <br></br>
            </div>
            <div>
              <h3>Thông tin khách hàng</h3>
              <div style={{ fontSize: "1.5rem" }}>
                - Họ tên:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.hoTen}
                <br></br>- CCCD:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.cccdKhachHang}
                <br></br>- Số điện thoại:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.soDienThoaiKH}
                <br></br>- Email:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.emailKH}
                <br></br>- Địa chỉ:{" "}
                {hoaDonSelected &&
                  hoaDonSelected.khachHang &&
                  hoaDonSelected.khachHang.diaChiKH}
                <br></br>
              </div>
            </div>
            <div>
              <div>
                <h2>Chi tiết hóa đơn</h2>
                <div style={{ overflowY: "auto" }}>
                  <Table bordered={true}>
                    <thead>
                      <tr>
                        <th style={{ fontSize: "1.5rem" }}>Phòng</th>
                        <th style={{ fontSize: "1.5rem" }}>Loại</th>
                        <th style={{ fontSize: "1.5rem" }}>Giá (1 ngày)</th>
                        <th style={{ fontSize: "1.5rem" }}>Số ngày</th>
                        <th style={{ fontSize: "1.5rem" }}>T tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoaDonSelected &&
                      hoaDonSelected.dsPhong &&
                      hoaDonSelected.dsPhong.length > 0 ? (
                        hoaDonSelected.dsPhong.map((room, index) => {
                          // console.log(isSelected(room));
                          return (
                            <tr key={index}>
                              <td style={{ fontSize: "1.5rem" }}>
                                {room.maPhong}
                              </td>
                              <td style={{ fontSize: "1.5rem" }}>
                                {room.tenLoaiPhong}
                              </td>
                              <td style={{ fontSize: "1.5rem" }}>
                                {room.giaPhong.toLocaleString()}
                              </td>
                              <td style={{ fontSize: "1.5rem" }}>
                                {totalDate}
                              </td>
                              <td style={{ fontSize: "1.5rem" }}>
                                {(totalDate * room.giaPhong).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "1.5rem",
                          }}
                        >
                          Tổng thành tiền
                        </td>
                        <td style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                          {totalRoomPrice.toLocaleString()} VND
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <i style={{ fontSize: "1.5rem" }}>
                    Ghi chú: Thời gian trả phòng: <b>trước 11h59</b>
                    <br></br>- Khách trả phòng từ 12h00 đến 15h59: Tính mức phụ
                    thu bằng 30% giá phòng 1 ngày.
                    <br></br>- Khách trả phòng từ 16h00 đến 18h59: Tính mức phụ
                    thu bằng 50% giá phòng 1 ngày.
                    <br></br>- Khách trả phòng sau 19h00: Tính mức phụ thu bằng
                    100% giá phòng 1 ngày.
                    <br></br>- Khách nhận và trả phòng trong cùng ngày sẽ tính
                    là 1 ngày bất kể giờ trả
                  </i>
                </div>
                <h2>Chi tiết dịch vụ</h2>
                <div style={{ overflowY: "visible" }}>
                  <Table bordered={true}>
                    <thead>
                      <tr>
                        <th style={{ fontSize: "1.5rem" }}>Phòng</th>
                        <th style={{ fontSize: "1.5rem" }}>Tên</th>
                        <th style={{ fontSize: "1.5rem" }}>Đơn vị</th>
                        <th style={{ fontSize: "1.5rem" }}>Giá</th>
                        <th style={{ fontSize: "1.5rem" }}>SL</th>
                        <th style={{ fontSize: "1.5rem" }}>T tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoaDonSelected &&
                      hoaDonSelected.dsChiTietDichVuDto &&
                      hoaDonSelected.dsChiTietDichVuDto.length > 0 ? (
                        hoaDonSelected.dsChiTietDichVuDto.map(
                          (dichVu, index) => {
                            // console.log(isSelected(room));
                            if (
                              index === 0 ||
                              (index !== 0 &&
                                dichVu.maPhong ===
                                  hoaDonSelected.dsChiTietDichVuDto[index - 1]
                                    .maPhong)
                            ) {
                              if (
                                index ===
                                hoaDonSelected.dsChiTietDichVuDto.length - 1
                              ) {
                                return (
                                  <>
                                    <tr key={index}>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.maPhong}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.tenDichVu}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.tenLoaiDichVu}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.giaDichVu.toLocaleString()}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.soLuong}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {(
                                          dichVu.giaDichVu * dichVu.soLuong
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                    {totalRoomServicePrice.map((roomPrice) => {
                                      if (roomPrice.maPhong === dichVu.maPhong)
                                        return (
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: "1.5rem",
                                              }}
                                            >
                                              Tổng tiền phòng{" "}
                                              {roomPrice.maPhong}
                                            </td>
                                            <td style={{ fontSize: "1.5rem" }}>
                                              {roomPrice.tongTien.toLocaleString()}
                                            </td>
                                          </tr>
                                        );
                                    })}
                                  </>
                                );
                              }
                              return (
                                <tr key={index}>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {dichVu.maPhong}
                                  </td>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {dichVu.tenDichVu}
                                  </td>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {dichVu.tenLoaiDichVu}
                                  </td>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {dichVu.giaDichVu.toLocaleString()}
                                  </td>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {dichVu.soLuong}
                                  </td>
                                  <td style={{ fontSize: "1.5rem" }}>
                                    {(
                                      dichVu.giaDichVu * dichVu.soLuong
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            } else {
                              if (
                                index ===
                                hoaDonSelected.dsChiTietDichVuDto.length - 1
                              ) {
                                return (
                                  <>
                                    {totalRoomServicePrice.map((roomPrice) => {
                                      if (
                                        roomPrice.maPhong ===
                                        hoaDonSelected.dsChiTietDichVuDto[
                                          index - 1
                                        ].maPhong
                                      )
                                        return (
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: "1.5rem",
                                              }}
                                            >
                                              Tổng tiền phòng{" "}
                                              {roomPrice.maPhong}
                                            </td>
                                            <td style={{ fontSize: "1.5rem" }}>
                                              {roomPrice.tongTien.toLocaleString()}
                                            </td>
                                          </tr>
                                        );
                                    })}
                                    <tr key={index}>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.maPhong}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.tenDichVu}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.tenLoaiDichVu}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.giaDichVu.toLocaleString()}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {dichVu.soLuong}
                                      </td>
                                      <td style={{ fontSize: "1.5rem" }}>
                                        {(
                                          dichVu.giaDichVu * dichVu.soLuong
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                    {totalRoomServicePrice.map((roomPrice) => {
                                      if (roomPrice.maPhong === dichVu.maPhong)
                                        return (
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: "1.5rem",
                                              }}
                                            >
                                              Tổng tiền phòng{" "}
                                              {roomPrice.maPhong}
                                            </td>
                                            <td style={{ fontSize: "1.5rem" }}>
                                              {roomPrice.tongTien.toLocaleString()}
                                            </td>
                                          </tr>
                                        );
                                    })}
                                  </>
                                );
                              }
                              return (
                                <>
                                  {totalRoomServicePrice.map((roomPrice) => {
                                    if (
                                      roomPrice.maPhong ===
                                      hoaDonSelected.dsChiTietDichVuDto[
                                        index - 1
                                      ].maPhong
                                    )
                                      return (
                                        <tr>
                                          <td
                                            colSpan={5}
                                            style={{
                                              fontWeight: "bold",
                                              textAlign: "center",
                                              fontSize: "1.5rem",
                                            }}
                                          >
                                            Tổng tiền phòng {roomPrice.maPhong}
                                          </td>
                                          <td style={{ fontSize: "1.5rem" }}>
                                            {roomPrice.tongTien.toLocaleString()}
                                          </td>
                                        </tr>
                                      );
                                  })}
                                  <tr key={index}>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {dichVu.maPhong}
                                    </td>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {dichVu.tenDichVu}
                                    </td>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {dichVu.tenLoaiDichVu}
                                    </td>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {dichVu.giaDichVu.toLocaleString()}
                                    </td>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {dichVu.soLuong}
                                    </td>
                                    <td style={{ fontSize: "1.5rem" }}>
                                      {(
                                        dichVu.giaDichVu * dichVu.soLuong
                                      ).toLocaleString()}
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          }
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", fontSize: "1.5rem" }}
                          >
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "1.5rem",
                          }}
                        >
                          Tổng thành tiền
                        </td>
                        <td style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                          {totalServicePrice.toLocaleString()} VND
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Tổng tiền
                  </p>
                  <div
                    className="total-price"
                    style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  >
                    {totalPrice && totalPrice.toLocaleString()} VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Tiền nhận
                  </p>
                  <div
                    className="total-price"
                    style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  >
                    {totalPrice && totalPrice.toLocaleString()}
                    VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Tiền thừa
                  </p>
                  <div
                    className="total-price"
                    style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  >
                    {totalPrice && (totalPrice - totalPrice).toLocaleString()}
                    {/* {hoaDonSelected.tienNhan - totalPrice < 0
                        ? 0
                        : (
                            hoaDonSelected.tienNhan - totalPrice
                          ).toLocaleString()}{" "} */}{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    width: 54%;
    padding: 0.5rem;
    height: 93%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .booking-detail {
      display: flex;
      flex-direction: column;
      height: 95%;
      /* height: 615px; */
      h3 {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        height: 10%;
        padding: 0.5rem;
        border-bottom: 1px solid #ccc;
      }
      .content-detail {
        height: 585px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .bill-title {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .guest-info {
        }
        .room-info {
          .info-content {
            .phong-container {
              overflow-y: auto;
              &::-webkit-scrollbar {
                width: 0.2rem;
                &-thumb {
                  background-image: linear-gradient(#373b44, #1095c1);
                  width: 0.1rem;
                  border-radius: 1rem;
                }
              }
            }
            .price-container {
              display: flex;
              justify-content: space-between;
              p {
                font-weight: bold;
                font-size: 1.1rem;
              }
              .total-price {
                font-weight: bold;
                font-size: 1.1rem;
              }
            }
          }
        }
      }
    }
    .btn-container {
      display: flex;
      height: 7%;
      justify-content: flex-end;
      gap: 1rem;
    }
    /* .print-container {
      background-color: white;
      width: 77vw;
      height: 100vh;
      position: absolute;
      z-index: 99;
      top: -25px;
      left: -260px;
    } */
  }
  .dis-non {
    display: none !important;
  }
`;
export default FrmXacNhanHoaDonMOMO;
