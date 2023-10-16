import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function Protected(props) {
  //   const { Component, user } = props;
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (user === null) {
  //       navigate("/login");
  //     }
  //   }, [user, navigate]);
  //   if (user === null) {
  //     return null;
  //   }
  //   return (
  //     <div>
  //       <Component />
  //     </div>
  //   );
  return <>{props.user ? <Outlet /> : <Navigate to="/login" />}</>;
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Protected);
