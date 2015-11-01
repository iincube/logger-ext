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

var logger = {};

/**
 * Should use this to plant dynamic logwriter.
 * @param  {LogWriter} writer to be used as transaction layer for log messages
 */
logger.plant = function(writer) {
  if (this.writers === undefined) {
    this.writers = [];
  }
  this.writers.push(writer);
  writer.onPlant();
};

/**
 * log level info
 * @param  {string} tag     type to filter messages in mongo (char limit 20)
 * @param  {string} message actual log message in form of string.
 */
logger.i = function(tag, message) {
  this.write(loglevel.info, tag, message);
};

/**
 * log level warn
 * @param  {string} tag     type to filter messages in mongo (char limit 20)
 * @param  {string} message actual log message in form of string.
 */
logger.w = function(tag, message) {
  this.write(loglevel.warn, tag, message);
};

/**
 * log level error
 * @param  {string} tag     type to filter messages in mongo (char limit 20)
 * @param  {string} message actual log message in form of string.
 */
logger.e = function(tag, message) {
  this.write(loglevel.error, tag, message);
};

/**
 * log level trace
 * @param  {string} tag     type to filter messages in mongo (char limit 20)
 * @param  {string} message actual log message in form of string.
 */
logger.t = function(tag, message) {
  this.write(loglevel.trace, tag, message);
};

logger.write = function(level, tag, message) {
  this.writers.forEach(function(writer) {
    try {
      writer.write(level, tag, message);
    } catch (err) {
      // fail silently incase of writer exception. should use common available console printing
    }
  });
};

module.exports = logger;
