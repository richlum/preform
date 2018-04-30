import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import page1fields from './page1fields';


class IdrField extends React.Component{
  constructor(props){
    super(props);
    this.state = {value:''};  // how does this relate to flux single source?
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this is where we can inject retrieved db information
    // fetch('')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       this.setState({
    //         fn:fv,
    //       })
    //     });
    //   });
  }
  handleSubmit(event){
    // we can insert submit logic here
    // todo : flux single source of truth and validation logic there?
    event.preventDefault(); // otherwise whole page refreshes
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  render(){
    return(
      <appr title={this.props.title}>
        <input type={this.props.type}
          tabindex={this.props.tabindex}
          id={this.props.id}
          name={this.props.name}
          pdfFieldName={this.props.pdffieldname}
          value={this.state.value}
          imageName={this.props.imagename}
          images={this.props.images}
          onChange={this.handleChange} />
      </appr>
    );
  }
}


class InformPage extends React.Component{
  constructor(props){
    super(props);
    // this.idrfldprops = [];
    // this.idrfldprops.push({title:"Registration Type", type:"radio",tabindex: "10",id:"ibentitynaaf-a01-RT0",name:"01-RT",pdfFieldName:"01-RT",value:"Trust",imageName:"../ibentitynaaf/1/form/1305 0 R",images:"110100"});
    // this.idrfldprops.push({title:"Registration Type", type:"radio",tabindex: "11",id:"ibentitynaaf-a01-RT1",name:"01-RT",pdfFieldName:"01-RT",value:"Partnership",imageName:"../ibentitynaaf/1/form/1306 0 R",images:"110100"}); 
    // this.idrfldprops.push({title:"Mailing Address", type:"checkbox",tabindex: "37",id:"ibentitynaaf-a02-MD_Address3",name:"02-MD Address",pdfFieldName:"02-MD Address",imageName:"../ibentitynaaf/1/form/1332 0 R",images:"110100"});
    // this.idrfldprops.push({title:"City", type:"text",  tabindex:"63",  id:"ibentitynaaf-a02-TPA_7", value:"", name:"02-TPA 7",  pdfFieldName:"02-TPA 7"});
    // this.idrfldprops.push({title:"Business Phone",  type:"text",  tabindex:"16", maxlength:"10",  id:"ibentitynaaf-a02-BPhone", value:"", name:"02-BPhone",  pdfFieldName:"02-BPhone" });
    this.idrfldprops = page1fields();
    
  }

  /* we have to either use uncontrolled components - refs where dom is single source of truth
    or controlled components where each element inherits Component class and we have to 
      assign state and event handlers to update state and value  */
  render(){
    let idrEls = [];
    for (let i=0;i<this.idrfldprops.length;i++){
      let fl = this.idrfldprops[i];
      idrEls.push(<IdrField  {...fl}
      />);
    }
    return idrEls;
  }
}

ReactDOM.render(<InformPage />, document.getElementsByClassName('broadridge')[0]);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
