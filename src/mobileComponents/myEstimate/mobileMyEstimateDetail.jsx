import { Alert, AlertTitle, Button, Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

const Cell = (props) => {
  if (props.type === 'label')
    return <TableCell align='center' sx={{maxWidth: 80, wordBreak:'keep-all', backgroundColor: '#FAFAD2'}} colSpan={props.colSpan} rowSpan={props.rowSpan}>{props.element}</TableCell>
  else 
    return <TableCell align='left' colSpan={4} rowSpan={props.rowSpan}>{props.element}</TableCell>
}

export default function MobileMyEstimateDetail({ ektour }) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [fail, setFail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickDelete = () => { setOpenDelete(true); }
  const handleCloseDeleteDialog = () => { setOpenDelete(false); }

  const handleCloseSnackBar = () => { setSuccess(false); setFail(false); setSuccessDelete(false); }

  const [data, setData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    visibility: true,
    createdDate: '',
    ip: ''
  });

  const [info, setInfo] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    travelType: '',
    vehicleType: '',
    vehicleNumber: '',
    memberCount: '',
    departDate: '',
    arrivalDate: '',
    departPlace: '',
    arrivalPlace: '',
    memo: '',
    stopPlace: '',
    wayType: '',
    payment: '',
    taxBill: '',
    visibility: true,
    createdDate: '',
    ip: ''
  });

  const [modify, setModify] = useState(false);
  const handleCancleModify = () => {
    setInfo(data);
    setModify(false);
  }
  const handleModifyState = () => { setModify(!modify); }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name] : value });
  }

  useEffect(() => {
    ektour.getEstimateDetailByIdAndForm(state.form, estimateId)
    .then(response => {
      setData(response);
      setInfo(response);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const handleModifyEstimate = () => {
    if(info === data) {
      setModify(false); return;
    }
    setLoading(true);
    axios.put(`/estimate/${info.id}`, info)
    .then(response => {
      setSuccess(true);
      setData(...info);
    })
    .catch(error => { console.log(error); })
    .finally(() => {
      setModify(false);
      setLoading(false);
    });
  }

  const handleClickDeleteEstimate = () => {
    setLoading(true);
    axios.delete(`/estimate/${info.id}`)
    .then(response => {
      setOpenDelete(false);
      setSuccessDelete(true);
      window.history.back();
    })
    .catch(error => {
      console.log(error);
      setFail(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <>
      <TableContainer sx={{maxHeight: '55vh'}}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow sx={{ '& th': {bgcolor: '#FFD0AF', pt: 1, borderBottom: '2px solid #AE905E'} }}>
            <TableCell colSpan={5}><strong>스크롤하여 확인하세요.</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Cell type='label' element='요청일' />
            <Cell element={data.createdDate.slice(0, -3)} />
          </TableRow>
          <TableRow>
            <Cell type='label' element='등록자' />
            <Cell element={
              <TextField name='name' size='small' value={info.name} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='이메일' />
            <Cell element={
              <TextField name='email' size='small' value={info.email} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='핸드폰' />
            <Cell element={
              <TextField name='phone' size='small' value={info.phone} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='비밀번호' />
            <Cell element={
              <TextField name='password' size='small' value={info.password} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='여행 구분' />
            <Cell element={
              <TextField name='travelType' size='small' value={info.travelType} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 구분' />
            <Cell element={
              <TextField name='vehicleType' size='small' value={info.vehicleType} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='차량 대수' />
            <Cell element={
              <TextField name='vehicleNumber' size='small' value={info.vehicleNumber} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='인원 수' />
            <Cell element={
              <TextField name='memberCount' size='small' value={info.memberCount} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 장소' />
            <Cell element={
              <TextField name='departPlace' size='small' value={info.departPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='출발 일자' />
            <Cell element={
              <TextField name='departDate' size='small' value={info.departDate} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='귀행 장소' />
            <Cell element={
              <TextField name='arrivalPlace' size='small' value={info.arrivalPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='귀행 일자' />
            <Cell element={
              <TextField name='arrivalDate' size='small' value={info.arrivalDate} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='경유지' />
            <Cell element={
              <TextField name='stopPlace' size='small' value={info.stopPlace} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='왕복 구분' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.wayType}>
                <FormControlLabel name='wayType' value="왕복" control={<Radio size='small' />} label="왕복" disabled={!modify} />
                <FormControlLabel name='wayType' value="편도" control={<Radio size='small' />} label="편도" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='결제 방식' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.payment}>
                <FormControlLabel name='payment' value="현금" control={<Radio size='small' />} label="현금" disabled={!modify} />
                <FormControlLabel name='payment' value="카드" control={<Radio size='small' />} label="카드" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='세금 계산서' />
            <Cell element={
              <RadioGroup row onChange={handleValueChange} value={info.taxBill}>
                <FormControlLabel name='taxBill' value="발급" control={<Radio size='small' />} label="발급" disabled={!modify} />
                <FormControlLabel name='taxBill' value="발급안함" control={<Radio size='small' />} label="발급안함" disabled={!modify} />
              </RadioGroup>
            } />
          </TableRow>
          <TableRow>
            <Cell type='label' element='기타 요청 사항' />
            <Cell element={
              <TextField name='memo' size='small' value={info.memo} onChange={handleValueChange} inputProps={{ readOnly: !modify }} />
            } />
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      <Stack direction='row' sx={{display: 'flex', justifyContent: 'center'}} mt={1} spacing={1}>
        <Button onClick={handleClickDelete} color='error'>삭제</Button>
        {
          modify
          ? <>
              <Button onClick={handleModifyEstimate} color='success'>수정완료</Button>
              <Button onClick={handleCancleModify}>수정취소</Button>
            </>
          : <Button onClick={handleModifyState}>수정</Button>
        }
        <Button href='javascript:history.back()'>뒤로</Button>
      </Stack>

      <Loading open={loading} />

      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          견적 요청 내용을 수정했습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={successDelete} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          견적 요청 내용을 삭제했습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Alert>
      </Snackbar>

      {/* 삭제 여부 묻는 다이얼로그 */}
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>
              <strong style={{ fontSize: 18 }}>견적 요청 삭제</strong>
            </AlertTitle>
            정말로 해당 견적 요청을 삭제하시겠습니까?
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClickDeleteEstimate}>예</Button>
            <Button onClick={handleCloseDeleteDialog}>아니오</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}