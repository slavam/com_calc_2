import React from 'react';
import { connect } from "react-redux";

const TariffTable = (props) => (
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
        { props.tariffs && props.tariffs.length ?
          props.tariffs.map( t => {
            if(t.category_id == props.categoryId)
              return <tr key={t.id}><td>{t.name}</td><td>{t.value}</td><td>{t.start_date}</td></tr>;
          }) : null
        }
      </tbody>
    </table>
  </div>
);
const mapStateToProps = state => {
  return {categoryId: state.tariffs.categoryId, tariffs: state.tariffs.tariffs};
}
export default connect(mapStateToProps)(TariffTable);
