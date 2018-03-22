import React from 'react';
export default class TariffTable extends React.Component {
  render() {
    var that = this;
    return(
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Значение</th>
              <th>Действует с</th>
            </tr>
          </thead>
          <tbody>
            {
              that.props.tariffs.map((t) => {
                if(t.category_id == that.props.category_id)
                  return <tr key={t.id}><td>{t.name}</td><td>{t.value}</td><td>{t.start_date}</td></tr>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}