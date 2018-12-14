'use strict';

var api = require('./api');


function Reports(beanstream) {
  if (!(this instanceof Reports)) {
    return new Reports();
  }
  
  this._api = new api(beanstream);
}

var fields = {
  TransactionId: 1,                  // >=,<=,=,<>,>,<
  Amount: 2,                        // >=,<=,=,<>,>,<
  MaskedCardNumber: 3,              // =
  CardOwner: 4,                     // =,START WITH
  OrderNumber: 5,                   // >=,<=,=,<>,>,<
  IPAddress: 6,                     // =,START WITH
  AuthorizationCode: 7,             // =,START WITH
  TransType: 8,                     // =
  CardType: 9,                      // =
  Response: 10,                     // =
  BillingName: 11,                  // =,START WITH
  BillingEmail: 12,                 // =,START WITH
  BillingPhone: 13,                 // =,START WITH
  ProcessedBy: 14,                  // =
  Ref1: 15,                         // =,START WITH
  Ref2: 16,                         // =,START WITH
  Ref3: 17,                         // =,START WITH
  Ref4: 18,                         // =,START WITH
  Ref5: 19,                         // =,START WITH
  ProductName: 20,                  // =,START WITH
  ProductID: 21,                    // =,START WITH
  CustCode: 22,                     // =,START WITH
  IDAdjustmentTo: 23,               // =
  IDAdjustedBy: 24,                 // =
};
Reports.FIELDS = fields;

var operators = {
  Equals: "%3D",
  LessThan: "%3C",
  GreaterThan: "%3E",
  LessThanEqual: "%3C%3D",
  GreaterThanEqual: "%3E%3D",
  StartsWith: "START%20WITH"
};
Reports.OPERATORS = operators;

Reports.prototype = {

  _formatDateTime: function(datetime) {
    return datetime.replace(/\..+/, '');     // delete the dot and everything after
  },

  /*
  Search/Query for transactions.
  Transactions must be bounded by a date range. Start time and end time should be supplied 
  in ISO 8601 format.
  You must also supply a startRow and an endRow to page the results as there is a limit 
  of 1000 results returned per query.
  Finally you can supply zero or more search Criteria. These Criteria are ANDed together.

  Criteria have 3 parameters: field, operator, and value. For details on these refer to the
  Criteria struct's documentation.

  For paging just one row, use the values: 1, 2.
  Paging index starts inclusively at the first number and non-inclusively at the 2nd number:
  [start,end).
  The lowest paging index number is 1.
  */
  query: function(startDate, endDate, startRow, endRow, criteria) {
    // build url
    var url = this._api._beanstream.getRequestUrl() + "reports";
    
    startDate = this._formatDateTime(startDate);
    endDate = this._formatDateTime(endDate);
    var q = {
      name: "Search",
      start_date: startDate,
      end_date: endDate,
      start_row: startRow,
      end_row: endRow
    };
    if (criteria) {
      q.criteria = criteria;
    }
    
    return this._api._POST(url, this._api._beanstream.getConfigField("merchantId"), this._api._beanstream.getConfigField("reportsApiKey"), q);
  }
};

module.exports = Reports;
module.exports.Reports = Reports;
