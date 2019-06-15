import React, { Component } from 'react'
import auth from './../../common/auth';
import './css/ftp.css';

class Ftp extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/ftp/listFiles','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        this.fetch();
    };

    fileList(item) {
        if (item.directory) {
            return (
                <div>
                    <div className="dir-img dir-img" />
                    <div className="monitor-file">{item.filename}</div>
                </div>

            )
        } else {
            return (
                <div>
                    <div className="dir-img txt-img" />
                    <div className="monitor-file">{item.filename}</div>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="monitor-frame">
                {this.state.data.length > 0?
                    this.state.data.map(item => {
                        return (<div key={item.filename + item.updateTime}>{this.fileList(item)}</div>)
                    })
                    : null}
                </div>
        )
    }
}

export default Ftp;