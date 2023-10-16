import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Chat({ user }) {
  const [state, setState] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Chat {user}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Chat);
