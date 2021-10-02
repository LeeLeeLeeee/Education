import React from 'react';
import { connect } from 'react-redux';
import { error, request, success }   from '../module/thunk/person'
import { fetchApi, axiosApi } from '../module/thunk/person'
import { increaseAsync, decreaseAsync, fetchAction, axiosAction  } from '../module/saga/personSaga'
import RequestBtn from '../Component/RequestBtn'
import MainView from '../Component/MainView'

const PostApp = (props) => {
    const boxStyle = {
        display:'grid',
        gridTemplateColumns: '1fr 2fr',
        gridTemplateRows: '1fr',
        gap: '0px 20px',
        justifyContent:'left',
        padding:'1rem'
    }
    const {
        increase,
        decrease
    } = props.countHandler
        
    const stateProps = {
        saga: props.sagaState,
        thunk: props.state
    }
    return (
        <>
            <p className={'text-center'}>Test a middleware API😉</p>
            <div>
                SAGA TEST [{props.count}]
                <div>
                    <button type={'button'} onClick={()=>{increase()}}>increase</button>
                    <button type={'button'} onClick={()=>{decrease()}}>decrease</button>
                </div>
            </div>
            <div style={boxStyle}>
              <RequestBtn {...props.handler}  />
              <MainView  {...stateProps} />
            </div>
        </>
    );
}


const mapStateToProps = (state) => ({
    state: state.person,
    sagaState:state.sagaPerson,
    count: state.sagaPerson.count
});

const mapDispatchToProps = (dispatch) => ({
    handler: {
        request: (id)=> dispatch( request(id) ),
        success:(id)=> dispatch( success(id) ),
        error:(id, time)=> dispatch( error(id, time) ),
        fetchApi:(prop) => dispatch(fetchApi(prop)),
        axiosApi:(prop) => dispatch(axiosApi(prop)),
        fetchSagaApi:(prop) => dispatch(fetchAction(prop)),
        axiosSagaApi:(prop) => dispatch(axiosAction(prop)),
    }, 
    countHandler: {
        increase:() => dispatch(increaseAsync()),
        decrease:() => dispatch(decreaseAsync())
    }
})
    

export default connect(mapStateToProps, mapDispatchToProps)(PostApp)


