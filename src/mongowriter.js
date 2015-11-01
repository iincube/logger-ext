/*
 * Copyright 2015 MTap Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var util = require('util');
var LogWriter = require('./logwriter');

// MongoDB Lib Requirement
var mongodb = require('mongoskin');
// MongoDB Params
var _mongourl = 'mongodb://localhost:27017/loggerdb';
var _collectionname = 'mongoLogger';
var _connection;

/**
* Logs to mongodb
*/
var MongoWriter = function() {};

// Inherit the mongowriter from logwriter
util.inherits(MongoWriter, LogWriter);

/**
 * Opens mongo connection and keep it active until close() is called.
 */
MongoWriter.prototype.open = function() {
  // should be called before setting logger#plant
  _connection = mongodb.db(_mongourl, { 'native_parser': true });
  console.log('Connection created successfully');
};

/**
 * Verifies the mongo connection is available
 */
MongoWriter.prototype.onPlant = function() {
  if (!_connection) {
    // check if mongo is connected or throw error.
    throw new Error('Mongo connection should be established before planting the mongo log writer');
  }
};

/**
 * Inserts data to the mongo db
 */
MongoWriter.prototype.write = function(level, tag, message) {
  LogWriter.prototype.write.call(this, level, tag, message);
  // here do the mongo save.
  var logMsg = { 'level': level, 'tag': tag, 'message': message, 'time': new Date() };
  _connection.collection(_collectionname).insert(logMsg, function(err, result) {
    if (err) console.log('Unable to insert record into collection. Error:', err);
  });
};

/**
 * Closes the established database connection
 */
MongoWriter.prototype.close = function() {
  // Check for undefined/null values before closing the connection
  if (_connection) {
    // Wait for a couple of seconds before closing connection.
    // This was introduced to avoid the connection closed error during insert.
    // Since, insert takes a few milliseconds before which the close is called.
    setTimeout(function() {
      _connection.close();
      console.log('Connection closed successfully');
    }, 2000);
  }
};

module.exports = MongoWriter;
