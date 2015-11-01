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

var loglevel = require('./loglevel');

/**
 * Just uses console for logging.
 */
var LogWriter = function() {

};

/**
 * Console write method
 */
LogWriter.prototype.write = function(level, tag, message) {
  switch (level) {
    case loglevel.info:
      console.info('INFO::Tag:[' + tag + '] Message:[' + tag + ']');
      break;
    case loglevel.warn:
      console.warn('WARN::Tag:[' + tag + '] Message:[' + tag + ']');
      break;
    case loglevel.error:
      console.error('ERROR::Tag:[' + tag + '] Message:[' + tag + ']');
      break;
    case loglevel.trace:
      console.trace('TRACE::Tag:[' + tag + '] Message:[' + tag + ']');
      break;
    default:
      console.log('LOG::Tag:[' + tag + '] Message:[' + tag + ']');
      break;
  }
};

LogWriter.prototype.onPlant = function() {
  console.info('LogWriter planted');
};

module.exports = LogWriter;
