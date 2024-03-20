import React from 'react';


const AuditSummary = ({ audits }) => {
  const calculateTotals = (key) => {
    const uniqueValues = new Set(audits.map((todo) => todo[key]));
    const totals = {};
    uniqueValues.forEach((value) => {
      totals[value] = audits.filter((todo) => todo[key] === value).length;
    });
    return totals;
  };

  const calculateSortAndPackForAFE = (afe) => {
    return audits
      .filter((todo) => todo.afe === afe)
      .reduce((acc, todo) => {
        if (todo.processPath === 'Induct' || todo.processPath === 'Rebin') {
          acc.Sort = (acc.Sort || 0) + 1;
        } else if (
          todo.processPath === 'Pack' ||
          todo.processPath === 'Pack-other' ||
          todo.processPath === 'Smartpac'
        ) {
          acc.Pack = (acc.Pack || 0) + 1;
        }
        return acc;
      }, {});
  };

  const renderAFEWithSortAndPackTable = (data) => {
    const sortAndPackAFE1 = calculateSortAndPackForAFE('AFE1');
    const sortAndPackAFE2 = calculateSortAndPackForAFE('AFE2');

    const totalSortAFE1 = sortAndPackAFE1.Sort || 0;
    const totalPackAFE1 = sortAndPackAFE1.Pack || 0;
    const totalSortAFE2 = sortAndPackAFE2.Sort || 0;
    const totalPackAFE2 = sortAndPackAFE2.Pack || 0;

    return (
      <div>
        <table className="audit-summary-table">
          <thead>
            <tr>
              <th>AFE</th>
              <th>Sub total</th>
              <th>Sort</th>
              <th>Pack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AFE1</td>
              <td>{data['AFE1'] || 0}</td>
              <td>{totalSortAFE1}</td>
              <td>{totalPackAFE1}</td>
            </tr>
            <tr>
              <td>AFE2</td>
              <td>{data['AFE2'] || 0}</td>
              <td>{totalSortAFE2}</td>
              <td>{totalPackAFE2}</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{data['AFE1'] + data['AFE2'] || 0}</strong>
              </td>
              <td>
                <strong>{totalSortAFE1 + totalSortAFE2}</strong>
              </td>
              <td>
                <strong>{totalPackAFE1 + totalPackAFE2}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderTable = (data, title) => {
    const totalCounts = Object.values(data).reduce((acc, currentValue) => acc + currentValue, 0);

    return (
      <div>
        <table className="audit-summary-table">
          <thead>
            <tr>
              <th>{title}</th>
              <th>Audits</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalCounts}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const afeTotals = calculateTotals('afe');
  const processPathTotals = calculateTotals('processPath');
  const errorTotals = calculateTotals('error');

  return (
    <div className="audit-summary-container">
      {renderAFEWithSortAndPackTable(afeTotals)}
      {renderTable(processPathTotals, 'Process')}
      {renderTable(errorTotals, 'Error')}
    </div>
  );
};

export default AuditSummary;
