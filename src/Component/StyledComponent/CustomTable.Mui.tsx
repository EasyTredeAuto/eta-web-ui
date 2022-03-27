import styled from "styled-components"
import _TableContainer from "@mui/material/TableContainer"
import { isMobileOnly } from "mobile-device-detect"

let widthByDevice = "100%"

if (isMobileOnly) {
  widthByDevice = "86.5vw"
}

export const TableContainer = styled(_TableContainer)`
  min-height: 460;
  max-height: calc(100vh - 250px);
  overflow-x: auto;
  width: ${widthByDevice};
`
