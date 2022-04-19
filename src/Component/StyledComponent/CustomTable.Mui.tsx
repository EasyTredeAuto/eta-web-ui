import styled from "styled-components"
import _TableContainer from "@mui/material/TableContainer"
import { isMobileOnly } from "mobile-device-detect"

let widthByDevice = "100%"
let minHeight = isMobileOnly ? "calc(100vh - 260px)" : "calc(100vh - 240px)"
let maxHeight = isMobileOnly ? "calc(100vh - 150px)" : "calc(100vh - 340px)"
if (isMobileOnly) {
  widthByDevice = "86.5vw"
}

export const TableContainer = styled(_TableContainer)`
  min-height: ${minHeight};
  max-height: ${maxHeight};
  overflow-x: auto;
  width: ${widthByDevice};
`
