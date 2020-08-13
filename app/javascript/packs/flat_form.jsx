import React from 'react';
import { connect } from "react-redux";

class FlatForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      address: '',
      payer_lastname: '',
      payer_firstname: '',
      payer_middlename: '',
      total_area: 0.0,
      heated_area: 0.0,
      residents_number: 0
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.postFlat(this.state);
    this.setState({address: '',
      payer_firstname: '',
      payer_lastname: '',
      payer_middlename: '',
      total_area: 0,
      heated_area: 0,
      residents_number: 0
    })
  }
  handleFieldChange(e){
    switch (e.target.id) {
      case 'address':
        this.setState({address: e.target.value});
        break;
      case 'last-name':
        this.setState({payer_lastname: e.target.value});
        break;
      case 'first-name':
        this.setState({payer_firstname: e.target.value});
        break;
      case 'middle-name':
        this.setState({payer_middlename: e.target.value});
        break;
      case 'total-area':
        this.setState({total_area: e.target.value});
        break;
      case 'heated-area':
        this.setState({heated_area: e.target.value});
        break;
      case 'residents-number':
        this.setState({residents_number: e.target.value});
        break;
    }
  }  
  render(){
    return(
      <div className='row row-content'>
        <div className='col-12 col-md-9'>
          <h3>Новое жилье</h3>
          <form className="utilityForm" onSubmit={(event) => this.handleSubmit(event)}>
            <div className='form-group row'>
              <label htmlFor='address' className='col-md-3 col-form-label'>Адрес</label>
              <div className='col-md-9'>
                <input className="form-control" id='address' type="text" value={this.state.address} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='last-name' className='col-md-3 col-form-label'>Фамилия</label>
              <div className='col-md-9'>
                <input className="form-control" id='last-name' type="text" value={this.state.payer_lastname} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='first-name' className='col-md-3 col-form-label'>Имя</label>
              <div className='col-md-9'>
                <input className="form-control" id='first-name' type="text" value={this.state.payer_firstname} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='middle-name' className='col-md-3 col-form-label'>Отчество</label>
              <div className='col-md-9'>
                <input className="form-control" id='middle-name' type="text" value={this.state.payer_middlename} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='total-area' className='col-md-3 col-form-label'>Общая площадь</label>
              <div className='col-md-9'>
                <input id='total-area' type='number' step='0.01' min='0' value={this.state.total_area} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='heated-area' className='col-md-3 col-form-label'>Отапливаемая площадь</label>
              <div className='col-md-9'>
                <input id='heated-area' type='number' step='0.01' min='0' value={this.state.heated_area} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='residents-number' className='col-md-3 col-form-label'>Количество зарегистрированных</label>
              <div className='col-md-9'>
                <input id='residents-number' type='number' min='0' value={this.state.residents_number} onChange={(event) => this.handleFieldChange(event)}/>
              </div>
            </div>
            <div className='form-group row'>
              <div className='offset-md-3 col-md-9'>
                <button type='submit' className='btn btn-primary'>
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default connect(null)(FlatForm);