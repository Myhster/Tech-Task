import React from 'react';
const heading = ['Gender', 'Name', 'Email', 'Country', 'Map Location'];

export default function Datatable({ data }) {
  return (
    /* return with styling provided by bootstrap */
    <div className='container'>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            {heading.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr>
              <td>{d.gender}</td>
              <td>{`${d.name.first} ${d.name.last}`}</td>
              <td>{d.email}</td>
              <td>{d.location.country}</td>
              <td>
                {/* creating the link to openstreetmap */}
                <a
                  href={`https://www.openstreetmap.org/?mlat=${d.location.coordinates.latitude}&mlon=${d.location.coordinates.longitude}#map=10/${d.location.coordinates.latitude}/${d.location.coordinates.longitude}`}
                  target='_blank'
                >
                  {`${d.location.coordinates.latitude}, ${d.location.coordinates.longitude}`}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Data used from randomuser.me: gender, name, nat, location, email and 10
        results
        <br></br>
        randomuser.me/api/?inc=gender,name,nat,location,email&results=10
      </div>
    </div>
  );
}
