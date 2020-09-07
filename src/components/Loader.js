import React from "react"
import { CircularProgress } from "@material-ui/core";

import "../styles/modules/loader.scss";

function Loader(props) {

  return (
    <>
      {props.loading ?
        <>
          <div className="loader">
            <CircularProgress
              color="primary"
            />
            {props.children}
          </div>
        </>
        : props.children
      }
    </>
  )
}

export default Loader