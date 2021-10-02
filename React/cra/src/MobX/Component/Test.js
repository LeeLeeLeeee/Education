import { action, computed, observable, when } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'

@observer
class TestComponent extends React.Component {
    
    constructor(props) {
        super(props)
        when(
            () => this.personList.length > 2,
            () => console.log('정원 초과!! 서비스를 종료합니다.')
        )
    }

    personList = observable([])
    
    addPersonList = action((name)=>{
        this.personList.push(name)
    })


    render(){
        return(
            <>
                <button onClick={()=>this.addPersonList('a')}>+person</button>
                <p>{this.personList}</p>
            </>
            
        )
    }
}

export default TestComponent
