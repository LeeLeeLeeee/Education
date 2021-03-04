import React from "react";
import { connect } from "react-redux";
import { increase, decrease, update } from "../action/number/create";
import { toggle } from "../action/page/create";

import CountComponent from "../Component/Count";
import ToggleComponent from "../Component/Toggle";

function CounterApp(props) {
  const couterProps = {
    state: { ...props["counter"] },
    handler: { ...props["listen_counter"] },
  };
  const toggleProps = {
    state: { ...props["toggle"] },
    handler: { ...props["listen_toggle"] },
  };

  return (
    <>
      <ToggleComponent {...toggleProps} />
      <CountComponent {...couterProps} />
    </>
  );
}

const mapStateToProps = (state) => ({
  counter: state.number,
  toggle: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  listen_counter: {
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
    update: (num) => dispatch(update(num)),
  },
  listen_toggle: {
    toggle: () => dispatch(toggle()),
  },
});
/* 
    -- bindActionCreators를 사용할 경우
    const mapDispatchToProps = dispatch => (
        bindActionCreators(
            {
                increase,
                decrease,
                update
            },
            dispatch
        );
    );

    -- 굳이 두 방법을 사용하지 않으려면 connect를 아래와 같이 설정. * 제일 간단함.
    connect(mapStateToProps,{increase, decrease, update})(CounterApp)
*/

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);
